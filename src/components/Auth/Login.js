import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../axiosConfig';
import { AuthContext } from '../../context/AuthContext';
import './AuthForm.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    try {
      const res = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
      setUser(res.data);
      localStorage.setItem('authToken', res.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false when the request completes
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
                  disabled={loading} // Disable input while loading
                />
              </div>
              <div className="input__box">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading} // Disable input while loading
                />
              </div>
              <div className="input__box">
                <input type="submit" value="Login" disabled={loading} /> {/* Disable button while loading */}
              </div>
              {loading && <p>Loading...</p>} {/* Show loading indicator */}
              <div className="register">
                <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
