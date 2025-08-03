import { useState, useEffect } from 'react';
import API from '../api';
import useSocket from './useSocket';
import { useParams } from 'react-router-dom';

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const socket = useSocket();
  const { room } = useParams();

  useEffect(() => {
    if (!socket) return;
    socket.emit('joinRoom', room);

    socket.on('newMessage', message => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [socket, room]);

  useEffect(() => {
    const fetchHistory = async () => {
      const { data } = await API.get(`/chat/history/${room}`);
      setMessages(data);
    };
    fetchHistory();
  }, [room]);

  return { messages };
}
