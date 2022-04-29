import React, { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HomeScreen } from '../segunda-mano/HomeScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

export const AppRouter = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const auth = getAuth();
  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <>
      <Routes>
        <Route path='/auth/*' element={
          <PublicRoute isAuthenticated={isLoggedIn} >
            <AuthRouter />
          </PublicRoute>
        } />
        <Route path='/' element={
          <PrivateRoute isAuthenticated={isLoggedIn} >
            <HomeScreen />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate replace to="/auth/" />} />
      </Routes>
    </>
  )
}
