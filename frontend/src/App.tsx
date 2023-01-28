import EmailVerification from 'pages/auth/EmailVerification';
import ForgotPassword from 'pages/auth/ForgotPassword';
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import ResetPassword from 'pages/auth/ResetPassword';
import UpdatePassword from 'pages/auth/UpdatePassword';
import UpdateProfile from 'pages/auth/UpdateProfile';
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
              <Route path = '/update-password' element = {<UpdatePassword />} />
              <Route path = '/update-profile' element = {<UpdateProfile />} />
         </Routes>

      </>


  );
}

export default App;
