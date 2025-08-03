import { useState, useEffect } from 'react';
import API from '../api';
import { useAuth } from '../context/AuthContext';

export default function useUnread(room) {
    const [data, setData] = useState({ count: 0, messages: [] });
    const { user } = useAuth();

    useEffect(() => {
        if (!user || !room) return;

        const fetchUnread = async () => {
            try {
                const response = await API.get(`/chat/unread/${room}`);
                setData({
                    count: response.data.count,
                    messages: response.data.messages
                });
            } catch (error) {
                console.error('Error fetching unread messages:', error);
            }
        };

        fetchUnread();
        
        const interval = setInterval(fetchUnread, 30000);
        return () => clearInterval(interval);
    }, [room, user]);

    return data;
}