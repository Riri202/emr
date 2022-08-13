/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
// import { useCurrentUser } from '../utils/hooks';

function ProtectedRoutes({ allowedRole }) {
  // const { user } = useCurrentUser();
  const location = useLocation();
  const loggedInUser = JSON.parse(localStorage.getItem('user'));

  return loggedInUser && loggedInUser.user.role === allowedRole ? (
    <Outlet />
  ) : loggedInUser && loggedInUser.user.role !== allowedRole ? (
    <Navigate to={'/unauthorized'} state={{ from: location }} replace />
  ) : (
    <Navigate to={'/'} state={{ from: location }} replace />
  );
}

export default ProtectedRoutes;