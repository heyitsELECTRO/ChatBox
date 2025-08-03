import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import './EmojiPicker.css';

export default function EmojiPicker({ onSelect }) {
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emojiData , event) => {
    onSelect(emojiData.emoji);
    setOpen(false);
  };

  return (
    <div className="emoji-picker-wrapper">
      <button onClick={() => setOpen(o => !o)}>😊</button>
      {open && <Picker onEmojiClick={handleEmojiClick} />}
    </div>
  );
}
