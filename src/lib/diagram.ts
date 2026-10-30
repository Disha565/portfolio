import type { ArchEdge, ArchNode, Architecture, NodeKind } from '../types'

export const NODE_W = 164
export const NODE_H = 60

export const kindMeta: Record<NodeKind, { label: string; color: string }> = {
  client: { label: 'Client', color: 'var(--subtle)' },
  service: { label: 'Service', color: 'var(--accent)' },
  database: { label: 'Database', color: 'var(--metric)' },
  cache: { label: 'Cache', color: 'var(--metric)' },
  storage: { label: 'Storage', color: 'var(--metric)' },
  queue: { label: 'Queue', color: 'var(--accent-2)' },
  ai: { label: 'AI / LLM', color: 'var(--accent-2)' },
  external: { label: 'External', color: 'var(--subtle)' },
}

export interface EdgeGeometry {
  edge: ArchEdge
  d: string
  labelX: number
  labelY: number
}

/**
 * Connects two nodes with a cubic curve, leaving from whichever side faces the target.
 * The curve's midpoint is analytic because both control points share the midline.
 */
export function edgeGeometry(from: ArchNode, to: ArchNode, edge: ArchEdge): EdgeGeometry {
  const cx1 = from.x + NODE_W / 2
  const cy1 = from.y + NODE_H / 2
  const cx2 = to.x + NODE_W / 2
  const cy2 = to.y + NODE_H / 2
  const dx = cx2 - cx1
  const dy = cy2 - cy1
  const horizontal = Math.abs(dx) * NODE_H >= Math.abs(dy) * NODE_W

  if (horizontal) {
    const x1 = dx > 0 ? from.x + NODE_W : from.x
    const x2 = dx > 0 ? to.x : to.x + NODE_W
    const mx = (x1 + x2) / 2
    return { edge, d: `M${x1},${cy1} C${mx},${cy1} ${mx},${cy2} ${x2},${cy2}`, labelX: mx, labelY: (cy1 + cy2) / 2 }
  }

  const y1 = dy > 0 ? from.y + NODE_H : from.y
  const y2 = dy > 0 ? to.y : to.y + NODE_H
  const my = (y1 + y2) / 2
  return { edge, d: `M${cx1},${y1} C${cx1},${my} ${cx2},${my} ${cx2},${y2}`, labelX: (cx1 + cx2) / 2, labelY: my }
}

export function layoutEdges(arch: Architecture): EdgeGeometry[] {
  const byId = new Map(arch.nodes.map((n) => [n.id, n]))
  return arch.edges.flatMap((edge) => {
    const from = byId.get(edge.from)
    const to = byId.get(edge.to)
    return from && to ? [edgeGeometry(from, to, edge)] : []
  })
}
