import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const userId =localStorage.getItem('userId');

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(`https://abhimanbackend.onrender.com/api/profile/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust token retrieval if needed
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data.user);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    getProfile();
  }, [userId]);

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>Available Coins:</strong> {profile.availCoins}</p>
      <p><strong>Role:</strong> {profile.role}</p>
    </div>
  );
};

export default Profile;
