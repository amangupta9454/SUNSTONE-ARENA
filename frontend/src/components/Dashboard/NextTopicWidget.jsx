import { useNavigate } from 'react-router-dom'
import useStore from '../../store/useStore'

const difficultyColors = ['', 'bg-green-100 text-green-700', 'bg-blue-100 text-blue-700',
  'bg-yellow-100 text-yellow-700', 'bg-orange-100 text-orange-700', 'bg-red-100 text-red-700']

export default function NextTopicWidget({ recommendation }) {
  const navigate = useNavigate()
  const setCurrentTopic = useStore((s) => s.setCurrentTopic)

  if (!recommendation) {
    return (
      <div className="card border-l-4 border-primary">
        <p className="text-gray-500 text-sm">No recommendations yet. Complete the assessment first!</p>
        <button onClick={() => navigate('/app/assessment')} className="btn-primary mt-3 text-sm py-2 px-4">
          Take Assessment
        </button>
      </div>
    )
  }

  const handleStart = () => {
    setCurrentTopic({ name: recommendation.name, skill_id: recommendation.skill_id, mastery_score: recommendation.score })
    navigate(`/app/learning/${recommendation.skill_id}`)
  }

  return (
    <div className="card border-l-4 border-primary bg-gradient-to-r from-blue-50 to-white">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">🎯 Recommended Next</p>
          <h3 className="text-lg font-bold text-gray-900">{recommendation.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{recommendation.reason}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className={`badge ${difficultyColors[recommendation.difficulty] || 'bg-gray-100 text-gray-600'}`}>
              Difficulty {recommendation.difficulty}/5
            </span>
            <span className="badge bg-blue-100 text-blue-700">
              Score {Math.round(recommendation.score * 100)}%
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button onClick={handleStart} className="btn-primary text-sm py-2 px-5">
          Start Learning →
        </button>
        <button
          onClick={() => { setCurrentTopic({ name: recommendation.name, skill_id: recommendation.skill_id }); navigate('/app/tutor') }}
          className="btn-outline text-sm py-2 px-5"
        >
          Ask AI Tutor
        </button>
      </div>
    </div>
  )
}
