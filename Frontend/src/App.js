import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ChatRoom from './components/ChatRoom';
import FriendRequests from './components/FriendRequests';
import Profiles from './components/Profiles';
import Rooms from './components/Rooms';
import ChatPage from './components/ChatPage';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Profiles />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/chatrooms" element={<ChatRoom />} />
        <Route path="/friend-requests" element={<FriendRequests />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/chatpage/:roomId" element={<ChatPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
