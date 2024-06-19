import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ChatRoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [joinRoomId, setJoinRoomId] = useState(null);
  const [joinPassword, setJoinPassword] = useState('');
  const [message, setMessage] = useState('');
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  let userId = localStorage.getItem('userId')

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('https://abhimanbackend.onrender.com/api/chatrooms/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (Array.isArray(response.data)) {
        setRooms(response.data);
      } else {
        console.error('Data is not in expected array format:', response.data);
        setRooms([]);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setRooms([]);
    }
  };

  const handleJoinRoom = async (roomId) => {
    try {
      const response = await axios.post('https://abhimanbackend.onrender.com/api/chatrooms/joinRoom', {
        userId,
        roomId,
        password: joinPassword,
      }, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setMessage(response.data.message);
      navigate(`/chatpage/${roomId}`, { state: { roomId, userId } });
      setJoinRoomId(null);
      setJoinPassword('');
    } catch (error) {
      console.error('Error joining room:', error);
      setMessage('Failed to join room. ' + (error.response ? error.response.data.error : ''));
    }
  };

  const handleLeaveRoom = async () => {
    try {
      const response = await axios.post('https://abhimanbackend.onrender.com/api/chatrooms/leave', {
        userId,
        roomId: currentRoomId,
      }, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setMessage(response.data.message);
      console.log(response.data); 
      setCurrentRoomId(null);
    } catch (error) {
      console.error('Error leaving room:', error);
      setMessage('Failed to leave room. ' + (error.response ? error.response.data.error : ''));
    }
  };

  return (
    <div>
      <h1>Available Chat Rooms</h1>
      {message && <p>{message}</p>}
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <Link to={`/chatpage/${room.id}`}>
              <span>{room.roomName}</span>
            </Link>
            {room.joined ? (
              <button onClick={handleLeaveRoom}>Leave</button>
            ) : (
              <button onClick={() => setJoinRoomId(room.id)}>Join</button>
            )}
          </li>
        ))}
      </ul>
      {joinRoomId && (
        <div>
          <h2>Join Room</h2>
          <label>
            Password:
            <input
              type="password"
              value={joinPassword}
              onChange={(e) => setJoinPassword(e.target.value)}
            />
          </label>
          <button onClick={() => handleJoinRoom(joinRoomId)}>Submit</button>
          <button onClick={() => setJoinRoomId(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ChatRoomsPage;
