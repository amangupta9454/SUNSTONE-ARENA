import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3">
      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white text-sm">🤖</div>
      <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
        {[0, 1, 2].map((i) => (
          <div key={i} className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
        ))}
      </div>
    </div>
  )
}

export default function ChatWindow({ messages, isTyping }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  )
}
