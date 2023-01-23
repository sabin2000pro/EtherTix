import EmailVerification from 'pages/auth/EmailVerification';
import ForgotPassword from 'pages/auth/ForgotPassword';
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import React from 'react';
import {Routes, Route} from 'react-router-dom';

const App = () => { // Main App Component

  return (

      <>

          <Routes>

            <Route path = '/register' element = {<Register />} />
            <Route path = '/login' element = {<Login />} />
            <Route path = '/verify-email' element = {<EmailVerification />} />
           
            <Route path = 'forgot-password' element = {<ForgotPassword />} />

         </Routes>

      </>


  );
}

export default App;
