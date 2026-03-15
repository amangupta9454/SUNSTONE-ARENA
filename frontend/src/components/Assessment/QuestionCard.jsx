const OPTION_LABELS = ['A', 'B', 'C', 'D']
const OPTION_KEYS = ['a', 'b', 'c', 'd']

export default function QuestionCard({ question, selected, onSelect }) {
  return (
    <div className="card space-y-6">
      {/* Skill badge */}
      <div className="flex items-center gap-2">
        <span className="badge bg-secondary text-white">{question.subject}</span>
        <span className="badge bg-gray-100 text-gray-600">{question.skill_name}</span>
        <span className="badge bg-gray-100 text-gray-600">Difficulty {question.difficulty}/5</span>
      </div>

      {/* Question text */}
      <p className="text-lg font-semibold text-gray-900 leading-relaxed">{question.question_text}</p>

      {/* Options */}
      <div className="space-y-3">
        {OPTION_KEYS.map((key, i) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition ${
              selected === key
                ? 'border-primary bg-blue-50 text-primary'
                : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-bold mr-3 ${
              selected === key ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
            }`}>
              {OPTION_LABELS[i]}
            </span>
            {question.options[key]}
          </button>
        ))}
      </div>
    </div>
  )
}
