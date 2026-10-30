import { useId, useMemo, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { MousePointerClick, MoveHorizontal } from 'lucide-react'
import { NODE_H, NODE_W, kindMeta, layoutEdges } from '../../lib/diagram'
import type { Architecture } from '../../types'

export function ArchitectureDiagram({ architecture }: { architecture: Architecture }) {
  const [selected, setSelected] = useState<string | null>(null)
  const markerId = useId()
  const edges = useMemo(() => layoutEdges(architecture), [architecture])
  const { width, height, nodes, groups = [] } = architecture

  const connected = useMemo(() => {
    if (!selected) return null
    const ids = new Set([selected])
    architecture.edges.forEach((e) => {
      if (e.from === selected) ids.add(e.to)
      if (e.to === selected) ids.add(e.from)
    })
    return ids
  }, [selected, architecture.edges])

  const active = nodes.find((n) => n.id === selected)
  const toggle = (id: string) => setSelected((cur) => (cur === id ? null : id))
  const onKey = (e: KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle(id)
    }
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-line bg-bg/60 [scrollbar-width:thin]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ minWidth: `${Math.round(width * 0.78)}px` }}
          className="block w-full bg-grid [background-size:24px_24px]"
          role="group"
          aria-label="Interactive architecture diagram. Select a component to see what it does."
        >
          <defs>
            {(['idle', 'on'] as const).map((state) => (
              <marker
                key={state}
                id={`${markerId}-${state}`}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M0,1 L9,5 L0,9 z" style={{ fill: state === 'on' ? 'var(--accent)' : 'var(--subtle)' }} />
              </marker>
            ))}
          </defs>

          {groups.map((g) => (
            <g key={g.label}>
              <rect
                x={g.x}
                y={g.y}
                width={g.w}
                height={g.h}
                rx={14}
                style={{ fill: 'var(--surface)', stroke: 'var(--line-strong)' }}
                strokeDasharray="5 5"
              />
              <text x={g.x + 12} y={g.y + 18} className="font-mono" style={{ fill: 'var(--subtle)', fontSize: 10, letterSpacing: '0.08em' }}>
                {g.label.toUpperCase()}
              </text>
            </g>
          ))}

          {edges.map(({ edge, d, labelX, labelY }) => {
            const on = selected !== null && (edge.from === selected || edge.to === selected)
            const dim = connected !== null && !on
            return (
              <g key={`${edge.from}-${edge.to}`} style={{ opacity: dim ? 0.22 : 1, transition: 'opacity .25s' }}>
                <path
                  d={d}
                  fill="none"
                  style={{ stroke: on ? 'var(--accent)' : 'var(--line-strong)' }}
                  strokeWidth={on ? 1.8 : 1.3}
                  markerEnd={`url(#${markerId}-${on ? 'on' : 'idle'})`}
                />
                <path d={d} fill="none" style={{ stroke: 'var(--accent)' }} strokeOpacity={on ? 0.9 : 0.45} strokeWidth={1.4} className="edge-flow" />
                {edge.label && (
                  <g transform={`translate(${labelX}, ${labelY})`}>
                    <rect
                      x={-(edge.label.length * 3.1 + 7)}
                      y={-9}
                      width={edge.label.length * 6.2 + 14}
                      height={18}
                      rx={9}
                      style={{ fill: 'var(--bg-elev)', stroke: 'var(--line)' }}
                    />
                    <text textAnchor="middle" y={3.5} className="font-mono" style={{ fill: on ? 'var(--accent)' : 'var(--muted)', fontSize: 10 }}>
                      {edge.label}
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {nodes.map((n) => {
            const meta = kindMeta[n.kind]
            const isSel = selected === n.id
            const dim = connected !== null && !connected.has(n.id)
            return (
              <g
                key={n.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSel}
                aria-label={`${n.label}${n.sub ? `, ${n.sub}` : ''}`}
                onClick={() => toggle(n.id)}
                onKeyDown={(e) => onKey(e, n.id)}
                className="cursor-pointer outline-none [&:focus-visible>rect:first-of-type]:stroke-[var(--accent)] [&:focus-visible>rect:first-of-type]:[stroke-width:2]"
                style={{ opacity: dim ? 0.4 : 1, transition: 'opacity .25s' }}
              >
                <rect
                  x={n.x}
                  y={n.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={12}
                  style={{
                    fill: isSel ? 'var(--surface-2)' : 'var(--bg-elev)',
                    stroke: isSel ? meta.color : 'var(--line-strong)',
                    transition: 'stroke .2s, fill .2s',
                  }}
                  strokeWidth={isSel ? 1.8 : 1}
                />
                <rect x={n.x} y={n.y + 14} width={3} height={NODE_H - 28} rx={1.5} style={{ fill: meta.color }} />
                <text x={n.x + 16} y={n.y + 26} style={{ fill: 'var(--fg)', fontSize: 12.5, fontWeight: 600 }}>
                  {n.label}
                </text>
                {n.sub && (
                  <text x={n.x + 16} y={n.y + 44} className="font-mono" style={{ fill: 'var(--subtle)', fontSize: 10 }}>
                    {n.sub}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3 text-xs text-subtle">
        <span className="flex items-center gap-1.5">
          <MousePointerClick className="size-3.5" aria-hidden /> Select a component to trace its connections
        </span>
        <span className="flex items-center gap-1.5 sm:hidden">
          <MoveHorizontal className="size-3.5" aria-hidden /> Scroll
        </span>
      </div>

      <div className="mt-3 min-h-[92px] rounded-xl border border-line bg-surface p-4" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <m.div key={active?.id ?? 'caption'} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18 }}>
            {active ? (
              <>
                <p className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{active.label}</span>
                  <span
                    className="rounded-full border px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase"
                    style={{ color: kindMeta[active.kind].color, borderColor: 'var(--line-strong)' }}
                  >
                    {kindMeta[active.kind].label}
                  </span>
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{active.detail}</p>
              </>
            ) : (
              <p className="text-sm leading-relaxed text-muted">{architecture.caption}</p>
            )}
          </m.div>
        </AnimatePresence>
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5" aria-label="Legend">
        {Array.from(new Set(nodes.map((n) => n.kind))).map((kind) => (
          <li key={kind} className="flex items-center gap-1.5 font-mono text-[11px] text-subtle">
            <span className="size-2 rounded-full" style={{ background: kindMeta[kind].color }} aria-hidden />
            {kindMeta[kind].label}
          </li>
        ))}
      </ul>
    </div>
  )
}
