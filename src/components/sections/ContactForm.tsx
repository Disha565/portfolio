import { useId, useState, type ChangeEvent, type FormEvent } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from 'lucide-react'
import { profile } from '../../data/profile'

type Field = 'name' | 'email' | 'subject' | 'message'
type Values = Record<Field, string>
type Status = 'idle' | 'sending' | 'sent' | 'error'

const EMPTY: Values = { name: '', email: '', subject: '', message: '' }
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(v: Values): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {}
  if (!v.name.trim()) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(v.email.trim())) errors.email = 'Please enter a valid email address.'
  if (!v.subject.trim()) errors.subject = 'Please add a subject.'
  if (v.message.trim().length < 10) errors.message = 'Please write at least 10 characters.'
  return errors
}

function mailtoHref(v: Values) {
  const body = `${v.message.trim()}\n\n— ${v.name.trim()}${v.email.trim() ? ` (${v.email.trim()})` : ''}`
  return `mailto:${profile.email}?subject=${encodeURIComponent(v.subject.trim())}&body=${encodeURIComponent(body)}`
}

const inputClass =
  'w-full rounded-xl border bg-bg/60 px-4 py-3 text-[15px] text-fg placeholder:text-subtle transition-colors outline-none focus:border-accent focus:ring-2 focus:ring-accent/25'

export function ContactForm() {
  const id = useId()
  const [values, setValues] = useState<Values>(EMPTY)
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})
  const [honey, setHoney] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const errors = validate(values)

  const onChange = (field: Field) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    if (status === 'error' || status === 'sent') setStatus('idle')
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTouched({ name: true, email: true, subject: true, message: true })
    if (Object.keys(errors).length > 0) {
      const first = (['name', 'email', 'subject', 'message'] as Field[]).find((f) => errors[f])
      document.getElementById(`${id}-${first}`)?.focus()
      return
    }
    // Bots fill the hidden field; pretend success and drop the message.
    if (honey) {
      setStatus('sent')
      return
    }
    if (!profile.contactFormEndpoint) {
      window.location.href = mailtoHref(values)
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(profile.contactFormEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          _replyto: values.email.trim(),
          _subject: `[Portfolio] ${values.subject.trim()}`,
          subject: values.subject.trim(),
          message: values.message.trim(),
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const data = (await res.json().catch(() => ({}))) as { success?: boolean | string }
      if (!res.ok || String(data.success) !== 'true') throw new Error('Send failed')
      setStatus('sent')
      setValues(EMPTY)
      setTouched({})
    } catch {
      setStatus('error')
    }
  }

  const fieldProps = (field: Field) => {
    const invalid = Boolean(touched[field] && errors[field])
    return {
      id: `${id}-${field}`,
      name: field,
      value: values[field],
      onChange: onChange(field),
      onBlur: () => setTouched((t) => ({ ...t, [field]: true })),
      'aria-invalid': invalid,
      'aria-describedby': invalid ? `${id}-${field}-error` : undefined,
      className: `${inputClass} ${invalid ? 'border-red-400/70' : 'border-line-strong'}`,
    }
  }

  const label = (field: Field, text: string) => (
    <label htmlFor={`${id}-${field}`} className="mb-1.5 block text-sm font-medium text-fg">
      {text}
    </label>
  )

  const error = (field: Field) =>
    touched[field] && errors[field] ? (
      <p id={`${id}-${field}-error`} className="mt-1.5 text-xs text-red-400">
        {errors[field]}
      </p>
    ) : null

  const sending = status === 'sending'

  return (
    <form onSubmit={onSubmit} noValidate className="card relative p-5 sm:p-7" aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`} className="mb-6 text-lg font-semibold tracking-tight">
        Send a message
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          {label('name', 'Name')}
          <input type="text" autoComplete="name" placeholder="Your name" maxLength={100} {...fieldProps('name')} />
          {error('name')}
        </div>
        <div>
          {label('email', 'Email')}
          <input type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" maxLength={200} {...fieldProps('email')} />
          {error('email')}
        </div>
        <div className="sm:col-span-2">
          {label('subject', 'Subject')}
          <input type="text" placeholder="Backend engineering role at …" maxLength={150} {...fieldProps('subject')} />
          {error('subject')}
        </div>
        <div className="sm:col-span-2">
          {label('message', 'Message')}
          <textarea rows={6} placeholder="Tell me a little about the role or what you'd like to discuss." maxLength={5000} {...fieldProps('message')} className={`${fieldProps('message').className} resize-y`} />
          {error('message')}
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
        </label>
      </div>

      <div className="mt-6 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-h-6 text-sm" role="status" aria-live="polite">
          <AnimatePresence mode="wait">
            {status === 'sent' && (
              <m.p key="sent" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-accent">
                <CheckCircle2 className="size-4 shrink-0" aria-hidden />
                Thanks! Your message has been sent.
              </m.p>
            )}
            {status === 'error' && (
              <m.p key="error" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-wrap items-center gap-x-2 gap-y-1 text-red-400">
                <AlertCircle className="size-4 shrink-0" aria-hidden />
                Couldn&apos;t send right now.
                <a href={mailtoHref(values)} className="inline-flex items-center gap-1 font-medium text-fg underline underline-offset-4">
                  <Mail className="size-3.5" aria-hidden />
                  Send from your email app instead
                </a>
              </m.p>
            )}
          </AnimatePresence>
        </div>
        <button type="submit" disabled={sending} className="btn-primary shrink-0 !px-6 !py-3 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0">
          {sending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Send className="size-4" aria-hidden />}
          {sending ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  )
}
