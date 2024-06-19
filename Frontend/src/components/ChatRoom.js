// components/CreateChatRoom.js

import React, { useState } from 'react';
import './ChatRoom.css';
import { createChatRoom } from '../api/api'

const CreateChatRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateRoom = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      console.log(createChatRoom)
      console.log(userId) // Adjust as per your authentication mechanism
      const response = await fetch('https://abhimanbackend.onrender.com/api/chatrooms/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, roomName, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to create chat room');
      }

      const data = await response.json();
      setMessage({ type: 'success', text: data.message });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Failed to create chat room' });
    }
  };

  return (
    <div className="container">
      <h2>Create Chat Room</h2>
      {message && <p className={`message ${message.type}`}>{message.text}</p>}
      <div className="form-group">
        <label htmlFor="roomName">Room Name:</label>
        <input
          type="text"
          id="roomName"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleCreateRoom}>Create Room</button>
    </div>
  );
};

export default CreateChatRoom;
