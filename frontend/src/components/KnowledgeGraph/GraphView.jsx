import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactFlow, {
  Background, Controls, MiniMap,
  useNodesState, useEdgesState,
} from 'reactflow'
import toast from 'react-hot-toast'
import { getKnowledgeGraph } from '../../services/api'

const masteryColor = (mastery) => {
  if (!mastery || mastery === 0) return '#9CA3AF'
  if (mastery >= 0.7) return '#10B981'
  if (mastery >= 0.4) return '#F59E0B'
  return '#EF4444'
}

// Custom node component
function SkillNode({ data }) {
  const pct = Math.round((data.mastery || 0) * 100)
  const color = masteryColor(data.mastery)
  return (
    <div
      className="px-4 py-3 rounded-xl border-2 bg-white shadow-sm min-w-[140px] text-center"
      style={{ borderColor: color }}
    >
      <p className="font-bold text-gray-900 text-sm">{data.label}</p>
      <p className="text-xs text-gray-500 mt-0.5">{data.subject}</p>
      <div className="mt-2 flex items-center justify-center gap-1">
        <div className="w-16 bg-gray-200 rounded-full h-1.5">
          <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
        </div>
        <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
      </div>
      <span className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${
        data.status === 'mastered' ? 'bg-green-100 text-green-700' :
        data.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
        data.status === 'unlocked' ? 'bg-blue-100 text-blue-700' :
        'bg-gray-100 text-gray-500'
      }`}>
        {data.status}
      </span>
    </div>
  )
}

const nodeTypes = { default: SkillNode }

export default function GraphView() {
  const navigate = useNavigate()
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getKnowledgeGraph()
        const graph = data.graph || data
        // Map API nodes to React Flow format
        const rfNodes = (graph.nodes || []).map((n) => ({
          id: n.id,
          type: 'default',
          position: n.position || { x: 0, y: 0 },
          data: {
            label: n.data?.label || n.label,
            mastery: n.data?.mastery ?? 0,
            subject: n.data?.subject || '',
            status: n.data?.status || 'locked',
          },
        }))
        const rfEdges = (graph.edges || []).map((e) => ({
          id: e.id,
          source: e.source,
          target: e.target,
          animated: e.animated || false,
          style: { stroke: '#6366f1', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed', color: '#6366f1' },
        }))
        setNodes(rfNodes)
        setEdges(rfEdges)
      } catch {
        toast.error('Failed to load knowledge graph')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const onNodeClick = useCallback((_, node) => setSelected(node), [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <svg className="animate-spin h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Background color="#e5e7eb" gap={20} />
        <Controls />
        <MiniMap
          nodeColor={(n) => masteryColor(n.data?.mastery)}
          style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}
        />
      </ReactFlow>

      {/* Side panel on node click */}
      {selected && (
        <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-5 w-56 z-10">
          <button onClick={() => setSelected(null)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">✕</button>
          <h3 className="font-bold text-gray-900">{selected.data.label}</h3>
          <p className="text-sm text-gray-500 mt-1">{selected.data.subject}</p>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Mastery</span>
              <span className="font-bold">{Math.round((selected.data.mastery || 0) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full"
                style={{ width: `${Math.round((selected.data.mastery || 0) * 100)}%`, backgroundColor: masteryColor(selected.data.mastery) }}
              />
            </div>
          </div>
          <span className={`badge mt-3 ${
            selected.data.status === 'mastered' ? 'bg-green-100 text-green-700' :
            selected.data.status === 'in_progress' ? 'bg-yellow-100 text-yellow-700' :
            selected.data.status === 'unlocked' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-500'
          }`}>
            {selected.data.status}
          </span>
          <button
            onClick={() => navigate(`/app/learning/${selected.id}`)}
            className="btn-primary w-full mt-4 text-sm py-2"
          >
            Go to Learning →
          </button>
        </div>
      )}
    </div>
  )
}
