import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Header = () => (
  <nav>
    <ul>
      <li><Link to="/">Login</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/users">Users</Link></li>
      <li><Link to="/chatrooms">Chat Rooms</Link></li>
      <li><Link to="/profile/:userId">Profile</Link></li>
      <li><Link to="/friend-requests">Friend Requests</Link></li>
      <li><Link to="/rooms">All Rooms</Link></li>
      <li><Link to="/chatpage/:roomId">Chat</Link></li>



    </ul>
  </nav>
);

export default Header;
