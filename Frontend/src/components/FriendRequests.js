import React, { useState } from 'react';
import { sendFriendRequest } from '../api/api';

const FriendRequests = () => {
  const [friendName, setFriendName] = useState('');

  const handleSendRequest = async () => {
    try {
      await sendFriendRequest({ friendName });
      alert('Friend request sent!');
    } catch (error) {
      alert('Failed to send friend request');
    }
  };

  return (
    <div>
      <h2>Send Friend Request</h2>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />
      <button onClick={handleSendRequest}>Send Request</button>
    </div>
  );
};

export default FriendRequests;
