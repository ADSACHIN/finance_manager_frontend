// Header.js

import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import avatarList from './Avatar.json';
import './Header.css';

const Header = () => {
  const { user, setUser } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (user) {
      const randomAvatar = avatarList[Math.floor(Math.random() * avatarList.length)];
      setAvatar(randomAvatar);
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <Navbar className='navbar' expand="lg">
      
        <Navbar.Brand as={Link} to="/">Finance Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {user ? (
              <>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/budgets">Budgets</Nav.Link>
              <Nav.Link as={Link} to="/goals">Goals</Nav.Link>
              <Nav.Link as={Link} to="/transactions">Transactions</Nav.Link>
              <Nav.Link as={Link} to="/profile">profile</Nav.Link>
              {/* <Nav.Link as={Link} to="/spendingprediction">spendingprediction</Nav.Link> */}

                <div className="avatar-container" onClick={toggleProfile} onMouseEnter={toggleProfile} onMouseLeave={toggleProfile}>
                  <img src={avatar} alt="User Avatar" className="avatar" />
                  {showProfile && (
                    <div className="profile-options">
                      <Link to="/profile">Profile</Link>
                      <span onClick={handleLogout}>Logout</span>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
  );
};

export default Header;
