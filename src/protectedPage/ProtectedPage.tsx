import React from 'react';
import  { Outlet, Navigate } from 'react-router-dom';

const useAuth = () => {
  const user = localStorage.getItem('user');
  return !!user; // Using !! to convert the value to a boolean
};

const ProtectedPage: React.FC = () => {
  const isAuthenticated = useAuth();

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedPage;
