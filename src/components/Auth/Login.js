import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import { AuthContext } from '../../context/AuthContext';
import './AuthForm.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
      setUser(res.data);
      localStorage.setItem('authToken', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div className="colour"></div>
      <div className="colour"></div>
      <div className="colour"></div>
      <div className="box">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="container">
          <div className="form">
            <h2>Login</h2>
            <h3>Email: user14@example.com</h3>
            <br />
            <h3>Password: secure14</h3>
            <form onSubmit={handleSubmit}>
              <div className="input__box">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input__box">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input__box">
                <input type="submit" value="Login" />
              </div>
              <div className="register">
                <a href="/register">Register</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
