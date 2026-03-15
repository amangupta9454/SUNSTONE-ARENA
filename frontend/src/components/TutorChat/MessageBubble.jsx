export default function MessageBubble({ message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
          🤖
        </div>
      )}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-primary text-white rounded-br-sm'
            : 'bg-gray-100 text-gray-900 rounded-bl-sm'
        }`}
      >
        {message.content}
        {message.streaming && (
          <span className="inline-block w-1 h-4 bg-current ml-1 animate-pulse rounded" />
        )}
      </div>
    </div>
  )
}
