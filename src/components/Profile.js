import React, { useEffect, useState } from 'react';
import './Profile.css';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    mobile: '',
    email: '',
    orders: []
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Assuming the user ID is stored in localStorage after login/registration
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:5000/api/users/profile/${userId}`);
        setProfileData({
          name: response.data.user.name,
          mobile: response.data.user.mobile,
          email: response.data.user.email,
          orders: response.data.orders
        });
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-pic-container">
        <img src='https://via.placeholder.com/150' alt="Profile" className="profile-pic" />
      </div>
      <div className="profile-details">
        <h1>{profileData.name}</h1>
        <p>Phone: {profileData.mobile}</p>
        <p>Email: {profileData.email}</p>
        <h2>My Orders</h2>
        <ul>
          {profileData.orders.map((order, index) => (
            <li key={index}>{order.orderDetails}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
