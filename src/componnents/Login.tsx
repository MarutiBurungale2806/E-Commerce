import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { fetchAllUsers } from '../services/apiService';

const Login = ({ user }: any) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchLogindata = async () => {
    setLoading(true);
    try {
      const allUsers = await fetchAllUsers();
      const userMatch = allUsers.find(
        (user: any) =>
          user.username === formData.username && user.password === formData.password
      );
      if (userMatch) {
        const data = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'post',
          body: JSON.stringify(formData),
          headers: { 'Content-Type': 'application/json' },
        });
        const result = await data.json();
        if (result.token) {
          console.log(result);
          localStorage.setItem('user', JSON.stringify(userMatch));
          localStorage.setItem('token', JSON.stringify(result.token));

          navigate('/');
        } else {
          alert('Invalid user. Please enter correct details.');
        }
      } else {
        alert('Invalid user. Please enter correct details.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchLogindata();
    setFormData({
      username: '',
      password: '',
    });
    navigate('/');
  };

  return (
    <div className="main-login-container">
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <button className='login-button' type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
