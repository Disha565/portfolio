// Sanity checks on the production build. Run after `npm run build`; exits non-zero on failure.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const DIST = 'dist'
const BASE = process.env.BASE_PATH ?? '/portfolio/'
const REQUIRED = ['index.html', '404.html', 'Disha_Jain_Resume.pdf', 'og-image.png', 'favicon.svg', 'robots.txt', 'sitemap.xml']
// Never publish these (phone number from the original resume).
const FORBIDDEN = [/6268352357/, /\+91[\s-]?\d/]

const failures = []
const check = (ok, message) => {
  console.log(`${ok ? '✓' : '✗'} ${message}`)
  if (!ok) failures.push(message)
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

check(existsSync(DIST), `${DIST}/ exists`)
if (failures.length === 0) {
  for (const file of REQUIRED) check(existsSync(join(DIST, file)), `${file} is published`)

  const resume = join(DIST, 'Disha_Jain_Resume.pdf')
  if (existsSync(resume)) check(readFileSync(resume).subarray(0, 4).toString() === '%PDF', 'resume is a valid PDF')

  const html = readFileSync(join(DIST, 'index.html'), 'utf8')
  const assetRefs = [...html.matchAll(/(?:src|href)="(\/[^"]+)"/g)].map((m) => m[1])
  const outsideBase = assetRefs.filter((ref) => !ref.startsWith(BASE))
  check(assetRefs.length > 0 && outsideBase.length === 0, `asset paths use base ${BASE}${outsideBase.length ? ` (bad: ${outsideBase.join(', ')})` : ''}`)

  const textFiles = walk(DIST).filter((f) => /\.(html|js|css|txt|xml|svg|json)$/.test(f))
  const leaks = textFiles.filter((f) => FORBIDDEN.some((re) => re.test(readFileSync(f, 'utf8'))))
  check(leaks.length === 0, `no phone number in published files${leaks.length ? ` (found in ${leaks.join(', ')})` : ''}`)
}

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed.`)
  process.exit(1)
}
console.log('\nBuild verified.')
