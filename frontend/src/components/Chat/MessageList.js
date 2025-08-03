import React from 'react';
import './Chat.css';

export default function MessageList({ messages, currentUser }) {
  return (
    <div className="message-list">
      {messages.map(msg => {
       
        const senderId = msg.sender._id ? String(msg.sender._id) : String(msg.sender);
        const senderName = msg.sender.username || msg.username || 'Unknown';

        const isSent = senderId === currentUser.id;

        return (
          <div
            key={msg._id || msg.id}
            className={`message ${isSent ? 'sent' : 'received'}`}
          >
            <div className="username">
              {isSent ? currentUser.username : senderName}
            </div>
            <div className="bubble">{msg.content}</div>
            <div className="time">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
