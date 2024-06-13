import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './UserProfile.css'; // Ensure you have this CSS file for styling

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const { data } = await axios.get('https://finance-manager-backend-gm5t.onrender.com/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      await axios.put('https://finance-manager-backend-gm5t.onrender.com/api/users/profile', profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile updated successfully');
    } catch (error) {
      setError(error.response?.data?.message || 'Error updating profile');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-info">
        <div className="profile-section">
          <h3>Profile Details</h3>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          {/* <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p> */}
           <p><strong>owner:</strong> Sachin A D</p>

        </div>
        <div className="profile-avatar">
          {profile.avatarUrl && <img src={profile.avatarUrl} alt="Avatar" />}
        </div>
      </div>

      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={profile.username || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
          <small>Leave blank to keep the same password</small>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UserProfile;
