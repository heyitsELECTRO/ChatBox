import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../Auth/Auth.css';

export default function SignUp() {
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '', honeypot: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signup(form.username, form.password, form.confirmPassword, form.honeypot);
      navigate('/chat/general');
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <>
      <div className="auth-nav">
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Join ChatBox</h2>
        {error && <div className="error">{error}</div>}
        <input
          name="username"
          placeholder="Choose Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Create Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        {}
        <input
          name="honeypot"
          style={{ display: 'none' }}
          value={form.honeypot}
          onChange={handleChange}
        />
        <button type="submit">Create ChatBox Account</button>
      </form>
    </>
  );
}



