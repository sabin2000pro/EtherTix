import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import Footer from 'components/Footer';
import EmailVerification from 'pages/auth/EmailVerification';
import ForgotPassword from 'pages/auth/ForgotPassword';
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import ResetPassword from 'pages/auth/ResetPassword';
import UpdatePassword from 'pages/auth/UpdatePassword';
import UpdateProfile from 'pages/auth/UpdateProfile';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import NotFound from 'pages/NotFound';

const App = () => { // Main App Component

  return (
      <>
         <Navbar />
          <Routes>
            <Route path ='/' element = {<Home />} />
            <Route path = '/register' element = {<Register />} /> 
            <Route path = '/login' element = {<Login />} />
            <Route path = '/forgot-password' element = {<ForgotPassword />} />

            <Route path = '/reset-password/:token' element = {<ResetPassword />} />
            <Route path = '/verify-email' element = {<EmailVerification />} />
            <Route path = '/update-password' element = {<UpdatePassword />} />
            <Route path = '/update-profile' element = {<UpdateProfile />} />
            <Route path = '*' element = {<NotFound />} />
         </Routes>

         <Footer />
      </>
  );
}

export default App;
