import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../Common/Header.css';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <h1>ChatBox</h1>
      <nav>
        {user ? (
          <>
            <Link to="/chat/general">General</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
