import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getContent, completeContent } from '../services/api'
import useStore from '../store/useStore'
import QuestionCard from '../components/Assessment/QuestionCard'

const TYPE_COLORS = { video: 'bg-red-100 text-red-700', article: 'bg-blue-100 text-blue-700', quiz: 'bg-purple-100 text-purple-700' }
const TYPE_ICONS = { video: '🎬', article: '📄', quiz: '🧩' }

function YouTubeEmbed({ url }) {
  const id = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1]
  if (!id) return <a href={url} target="_blank" rel="noreferrer" className="text-primary underline">{url}</a>
  return (
    <div className="aspect-video rounded-xl overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        className="w-full h-full"
        allowFullScreen
        title="Learning video"
      />
    </div>
  )
}

export default function Learning() {
  const { skillId } = useParams()
  const navigate = useNavigate()
  const { setCurrentTopic, mastery } = useStore()
  const [content, setContent] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [completing, setCompleting] = useState(false)
  const [quizAnswer, setQuizAnswer] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getContent(skillId)
        setContent(data.content)
        if (data.content.length > 0) setSelected(data.content[0])
      } catch {
        toast.error('Failed to load content')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [skillId])

  const handleComplete = async (isCorrect = true) => {
    setCompleting(true)
    try {
      const prev = mastery[skillId] || 0.3
      const { data } = await completeContent({
        skill_id: skillId,
        content_id: selected?._id,
        is_correct: isCorrect,
        response_time_ms: 3000,
      })
      const updated = data.mastery_updates?.[0]
      if (updated) {
        const delta = Math.round((updated.score - prev) * 100)
        toast.success(`${delta > 0 ? `+${delta}%` : 'No change'} mastery!`)
      } else {
        toast.success('Progress recorded!')
      }
    } catch {
      toast.error('Failed to record progress')
    } finally {
      setCompleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <svg className="animate-spin h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      </div>
    )
  }

  const skillName = content[0]?.skill_id?.name || selected?.skill_id?.name || 'Skill'

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/app/dashboard" className="hover:text-primary">Dashboard</Link>
        <span>›</span>
        <span className="text-gray-900 font-medium">{skillName}</span>
        {selected && <><span>›</span><span className="text-gray-900">{selected.title}</span></>}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content list */}
        <div className="space-y-3">
          <h2 className="font-bold text-gray-900">Content</h2>
          {content.map((item) => (
            <button
              key={item._id}
              onClick={() => { setSelected(item); setQuizAnswer(null) }}
              className={`w-full text-left p-4 rounded-xl border-2 transition ${
                selected?._id === item._id ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{TYPE_ICONS[item.type]}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`badge text-xs ${TYPE_COLORS[item.type]}`}>{item.type}</span>
                    <span className="text-xs text-gray-400">Diff {item.difficulty}/5</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Content viewer */}
        <div className="lg:col-span-2 space-y-4">
          {selected ? (
            <>
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 text-lg">{selected.title}</h3>
                  <span className={`badge ${TYPE_COLORS[selected.type]}`}>{TYPE_ICONS[selected.type]} {selected.type}</span>
                </div>

                {selected.type === 'video' && <YouTubeEmbed url={selected.url} />}

                {selected.type === 'article' && (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">{selected.description}</p>
                    <a href={selected.url} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-primary font-medium hover:underline">
                      Read full article →
                    </a>
                  </div>
                )}

                {selected.type === 'quiz' && (
                  <div className="space-y-4">
                    <p className="text-gray-700">{selected.description}</p>
                    <a href={selected.url} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                      Open quiz →
                    </a>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => handleComplete(true)}
                  disabled={completing}
                  className="btn-primary text-sm py-2 px-5 flex items-center gap-2"
                >
                  {completing ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                  ) : '✓'} Mark as Complete
                </button>
                <button
                  onClick={() => {
                    setCurrentTopic({ name: skillName, skill_id: skillId, mastery_score: mastery[skillId] || 0.3 })
                    navigate('/app/tutor')
                  }}
                  className="btn-outline text-sm py-2 px-5"
                >
                  🤖 Ask AI Tutor
                </button>
              </div>
            </>
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-400">Select content from the list</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
