import React, { useState } from 'react';
import EmojiPicker from './EmojiPicker';
import './Chat.css';

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSend();
    }
    
  };

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <div className="message-input">
      <EmojiPicker onSelect={emoji => setText(text + emoji)} />
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        rows={1}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
