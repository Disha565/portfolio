import { useMemo } from 'react'
import { NODE_H, NODE_W, kindMeta, layoutEdges } from '../../lib/diagram'
import type { Architecture } from '../../types'

/** Small, non-interactive version used as the visual on project cards. */
export function MiniDiagram({ architecture }: { architecture: Architecture }) {
  const edges = useMemo(() => layoutEdges(architecture), [architecture])
  return (
    <svg viewBox={`-10 -10 ${architecture.width + 20} ${architecture.height + 20}`} className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMid meet">
      {edges.map(({ edge, d }) => (
        <g key={`${edge.from}-${edge.to}`}>
          <path d={d} fill="none" style={{ stroke: 'var(--line-strong)' }} strokeWidth={3} />
          <path d={d} fill="none" style={{ stroke: 'var(--accent)' }} strokeOpacity={0.6} strokeWidth={3} className="edge-flow" />
        </g>
      ))}
      {architecture.nodes.map((n) => (
        <g key={n.id}>
          <rect x={n.x} y={n.y} width={NODE_W} height={NODE_H} rx={14} style={{ fill: 'var(--bg-elev)', stroke: 'var(--line-strong)' }} strokeWidth={2} />
          <rect x={n.x + 18} y={n.y + 18} width={10} height={NODE_H - 36} rx={5} style={{ fill: kindMeta[n.kind].color }} />
          <rect x={n.x + 40} y={n.y + 20} width={NODE_W * 0.5} height={8} rx={4} style={{ fill: 'var(--line-strong)' }} />
          <rect x={n.x + 40} y={n.y + 34} width={NODE_W * 0.32} height={6} rx={3} style={{ fill: 'var(--line)' }} />
        </g>
      ))}
    </svg>
  )
}
