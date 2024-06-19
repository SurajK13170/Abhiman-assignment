import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ENDPOINT = 'https://abhimanbackend.onrender.com';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const { roomId } = useParams();
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const socket = io(ENDPOINT);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://abhimanbackend.onrender.com/api/messages/${roomId}`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
        
        if (response.data && Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          console.error('Expected array, received:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();

    socket.emit('joinRoom', { userId, roomId });

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, userId, token]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('sendMessage', { userId, text: message }, roomId, () => setMessage(''));
    }
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div className="chat-box">
{console.log(messages)}
        {Array.isArray(messages) && messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}: </strong> {msg.message}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
