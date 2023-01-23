import EmailVerification from 'pages/auth/EmailVerification';
import ForgotPassword from 'pages/auth/ForgotPassword';
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import ResetPassword from 'pages/auth/ResetPassword';
import React from 'react';
import {Routes, Route} from 'react-router-dom';

const App = () => { // Main App Component

  return (

      <>

          <Routes>

            <Route path = '/register' element = {<Register />} />
            <Route path = '/login' element = {<Login />} />
            <Route path = '/forgot-password' element = {<ForgotPassword />} />
            <Route path = '/reset-password/:token' element = {<ResetPassword />} />
            <Route path = '/verify-email' element = {<EmailVerification />} />

         </Routes>

      </>


  );
}

export default App;
