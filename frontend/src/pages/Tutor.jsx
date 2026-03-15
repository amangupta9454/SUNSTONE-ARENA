import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { queryTutor, submitTutorFeedback } from '../services/api'
import useStore from '../store/useStore'

const SUGGESTED = [
  'Explain this concept with a simple analogy',
  'What are the most common mistakes beginners make?',
  'Give me a real-world example of this',
]

const masteryLabel = (score) => {
  if (score >= 0.7) return { label: 'Advanced', color: 'badge-success' }
  if (score >= 0.4) return { label: 'Intermediate', color: 'badge-warning' }
  return { label: 'Beginner', color: 'badge-danger' }
}

function MessageBubble({ msg, onFeedback }) {
  const [rated, setRated] = useState(null)

  const handleRate = async (rating) => {
    if (rated) return
    setRated(rating)
    try {
      await onFeedback(rating, msg.content)
      toast.success(rating === 'up' ? '👍 Thanks for the feedback!' : '👎 We\'ll improve!')
    } catch {}
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            msg.role === 'user'
              ? 'bg-primary text-white rounded-br-sm'
              : 'bg-dark-700 border border-white/10 text-gray-200 rounded-bl-sm'
          }`}
        >
          {msg.content}
          {msg.streaming && (
            <span className="inline-flex gap-1 ml-2">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </span>
          )}
        </div>
        {/* Feedback buttons for AI messages */}
        {msg.role === 'ai' && !msg.streaming && msg.content && (
          <div className="flex items-center gap-2 mt-1 ml-1">
            <button
              onClick={() => handleRate('up')}
              className={`text-sm transition-all ${rated === 'up' ? 'text-success scale-110' : 'text-gray-600 hover:text-success'}`}
            >
              👍
            </button>
            <button
              onClick={() => handleRate('down')}
              className={`text-sm transition-all ${rated === 'down' ? 'text-danger scale-110' : 'text-gray-600 hover:text-danger'}`}
            >
              👎
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Tutor() {
  const { currentTopic } = useStore()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [lastQuestion, setLastQuestion] = useState('')
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  const topic = currentTopic?.name || 'General Learning'
  const masteryScore = currentTopic?.mastery_score || 0.3
  const { label, color } = masteryLabel(masteryScore)

  const scrollToBottom = () => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  const sendMessage = async (text) => {
    const question = text.trim()
    if (!question || isTyping) return

    setLastQuestion(question)
    const userMsg = { id: Date.now(), role: 'user', content: question }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    scrollToBottom()

    const aiMsgId = Date.now() + 1
    setMessages((prev) => [...prev, { id: aiMsgId, role: 'ai', content: '', streaming: true }])

    try {
      const stream = await queryTutor(question, topic, masteryScore)
      const reader = stream.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        fullText += chunk
        setMessages((prev) =>
          prev.map((m) => m.id === aiMsgId ? { ...m, content: fullText, streaming: true } : m)
        )
        scrollToBottom()
      }
      setMessages((prev) =>
        prev.map((m) => m.id === aiMsgId ? { ...m, streaming: false } : m)
      )
    } catch (err) {
      toast.error('Tutor unavailable. Please try again.')
      setMessages((prev) => prev.filter((m) => m.id !== aiMsgId))
    } finally {
      setIsTyping(false)
      inputRef.current?.focus()
    }
  }

  const handleFeedback = async (rating, responseContent) => {
    await submitTutorFeedback({
      topic,
      question: lastQuestion,
      response_snippet: responseContent?.slice(0, 200),
      rating,
      mastery_score: masteryScore,
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-4 flex items-center justify-between py-4"
      >
        <div>
          <h1 className="font-bold text-white">🤖 AI Tutor</h1>
          <p className="text-sm text-gray-400">Topic: <span className="font-medium text-primary">{topic}</span></p>
        </div>
        <span className={`badge ${color} text-sm px-3 py-1`}>{label}</span>
      </motion.div>

      {/* Chat area */}
      <div className="flex-1 bg-dark-800 border border-white/5 rounded-2xl flex flex-col overflow-hidden shadow-card-dark">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-5xl mb-4"
            >
              🤖
            </motion.div>
            <h3 className="font-bold text-white text-lg">Ask me anything about {topic}</h3>
            <p className="text-gray-500 text-sm mt-2 mb-6">I'll adapt my explanation to your level</p>
            <div className="flex flex-col gap-2 w-full max-w-sm">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left px-4 py-3 rounded-xl border border-white/10 text-sm text-gray-300 hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} onFeedback={handleFeedback} />
            ))}
            <div ref={bottomRef} />
          </div>
        )}

        {/* Input bar */}
        <div className="border-t border-white/5 p-4 flex gap-3">
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask about ${topic}...`}
            className="input flex-1 resize-none"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="btn-primary px-5 py-3 text-sm disabled:opacity-50 flex-shrink-0"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
