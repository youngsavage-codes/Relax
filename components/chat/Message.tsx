import React from 'react'

const Message = ({messages}: any) => {
  return (
    <div className="px-10 py-7 flex-grow overflow-y-auto" style={{ height: 'calc(83vh - 250px)' }}>
    <div className="flex flex-col space-y-4">
      {messages.map((msg: any, index: any) => (
        <div key={index} className={`flex ${msg.id === 0 ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.id === 0 ? 'bg-blue-500 text-white' : 'bg-gray-800 text-white'}`}>
            <span className="block text-xs font-semibold">{msg.senderName}</span>
            <span className="block mt-1 text-xs py-3">{msg.message}</span>
            <span className="block mt-1 text-xs">{msg.timeAgo}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Message