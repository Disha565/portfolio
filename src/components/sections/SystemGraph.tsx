import { useEffect, useState } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'

interface GraphNode {
  id: string
  label: string
  x: number
  y: number
  tone: 'accent' | 'accent-2' | 'metric' | 'muted'
}

const W = 440
const H = 300
const NODE_H = 28
const nodeWidth = (label: string) => label.length * 7.2 + 30

const nodes: GraphNode[] = [
  { id: 'client', label: 'clients', x: 14, y: 136, tone: 'muted' },
  { id: 'cron', label: 'cron jobs', x: 132, y: 40, tone: 'muted' },
  { id: 'api', label: 'nestjs api', x: 132, y: 136, tone: 'accent' },
  { id: 'agent', label: 'langgraph', x: 132, y: 232, tone: 'accent-2' },
  { id: 'redis', label: 'redis', x: 300, y: 20, tone: 'metric' },
  { id: 'ch', label: 'clickhouse', x: 300, y: 88, tone: 'metric' },
  { id: 'mongo', label: 'mongodb', x: 300, y: 156, tone: 'metric' },
  { id: 'llm', label: 'llm', x: 300, y: 232, tone: 'accent-2' },
]

const edges: [string, string][] = [
  ['client', 'api'],
  ['cron', 'api'],
  ['api', 'redis'],
  ['api', 'ch'],
  ['api', 'mongo'],
  ['api', 'agent'],
  ['agent', 'llm'],
]

const toneColor = {
  accent: 'var(--accent)',
  'accent-2': 'var(--accent-2)',
  metric: 'var(--metric)',
  muted: 'var(--subtle)',
}

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))

function anchor(from: GraphNode, to: GraphNode) {
  // Vertical edges leave from the bottom; everything else from the side facing the target.
  if (Math.abs(from.x - to.x) < 4) {
    return { x1: from.x + 40, y1: from.y + NODE_H, x2: to.x + 40, y2: to.y }
  }
  return { x1: from.x + nodeWidth(from.label), y1: from.y + NODE_H / 2, x2: to.x, y2: to.y + NODE_H / 2 }
}

const logs = [
  { cmd: 'GET /dashboard/teacher', out: 'materialized view hit · 58% faster' },
  { cmd: 'cron progress-report', out: 'reports for 90K+ students' },
  { cmd: 'pipeline.validate(question)', out: 'correct · complete · aligned' },
  { cmd: 'session.resume(test)', out: '1 active session · new device' },
  { cmd: 'report.save(history)', out: 'mongodb · cached in redis' },
]

export function SystemGraph() {
  const reduce = useReducedMotion()
  const [line, setLine] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setLine((i) => (i + 1) % logs.length), 3200)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="card relative overflow-hidden bg-bg-elev/70 shadow-[0_30px_80px_-40px_var(--accent-2)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        <span className="font-mono text-[11px] text-subtle">~/systems/overview</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-accent">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
          live
        </span>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full"
        role="img"
        aria-label="Illustration of the systems I work on: clients and cron jobs call a NestJS API backed by Redis, ClickHouse and MongoDB, with a LangGraph agent calling an LLM."
      >
        {edges.map(([a, b]) => {
          const { x1, y1, x2, y2 } = anchor(byId[a], byId[b])
          const d = `M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`
          const vertical = Math.abs(x1 - x2) < 4
          const path = vertical ? `M${x1},${y1} L${x2},${y2}` : d
          return (
            <g key={`${a}-${b}`}>
              <path d={path} fill="none" style={{ stroke: 'var(--line-strong)' }} strokeWidth={1} />
              <path d={path} fill="none" style={{ stroke: toneColor[byId[b].tone] }} strokeOpacity={0.7} strokeWidth={1.2} className="edge-flow" />
              {!reduce && (
                <circle r={2.4} style={{ fill: toneColor[byId[b].tone] }}>
                  <animateMotion dur={`${2.2 + (x2 % 7) / 5}s`} repeatCount="indefinite" path={path} />
                </circle>
              )}
            </g>
          )
        })}
        {nodes.map((n) => {
          const w = nodeWidth(n.label)
          return (
            <g key={n.id}>
              <rect x={n.x} y={n.y} width={w} height={NODE_H} rx={8} style={{ fill: 'var(--bg-elev)', stroke: 'var(--line-strong)' }} />
              <circle cx={n.x + 13} cy={n.y + NODE_H / 2} r={3} style={{ fill: toneColor[n.tone] }} />
              {n.id === 'api' && !reduce && (
                <circle cx={n.x + 13} cy={n.y + NODE_H / 2} r={3} fill="none" style={{ stroke: toneColor[n.tone] }} className="pulse-ring" />
              )}
              <text
                x={n.x + 22}
                y={n.y + NODE_H / 2 + 4}
                className="font-mono" style={{ fill: 'var(--fg)', fontSize: 11.5, opacity: 0.88 }}
              >
                {n.label}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="border-t border-line bg-surface px-4 py-3 font-mono text-[11.5px] sm:text-xs" aria-live="off">
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={line}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="flex min-w-0 flex-wrap items-center gap-x-2"
          >
            <span className="text-accent">$</span>
            <span className="text-fg">{logs[line].cmd}</span>
            <span className="text-subtle">→</span>
            <span className="text-metric">{logs[line].out}</span>
            <span className="caret inline-block h-3.5 w-1.5 bg-accent/80" aria-hidden />
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
