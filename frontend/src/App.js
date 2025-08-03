import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import ChatRoom from './components/Chat/ChatRoom';
import Header from './components/Common/Header';
import './styles/components.css';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <AuthProvider>
      <SocketProvider>
        {}
        {!isAuthPage && <Header />}

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/chat/:room"
            element={
              <ProtectedRoute>
                <ChatRoom />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </SocketProvider>
    </AuthProvider>
  );
}
