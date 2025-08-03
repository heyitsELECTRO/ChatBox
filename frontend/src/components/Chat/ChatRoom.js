import React from 'react';
import { useParams } from 'react-router-dom';
import useChat from '../../hooks/useChat';
import useSocket from '../../hooks/useSocket';
import { useAuth } from '../../context/AuthContext';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './Chat.css';

export default function ChatRoom() {
  const { room } = useParams();
  const { messages } = useChat();
  const socket = useSocket();
  const { user } = useAuth(); // user = { id, username }

  const sendMessage = content => {
    if (socket && content.trim()) {
      socket.emit('sendMessage', {
        room,
        content,
        userId: user.id,
        username: user.username
      });
    }
  };

  return (
    <div className="chat-room">
      <h2 className="room-title">Room: {room}</h2>
      <MessageList messages={messages} currentUser={user} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}
