import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import EmailVerification from 'pages/auth/EmailVerification';
import ForgotPassword from 'pages/auth/ForgotPassword';
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import ResetPassword from 'pages/auth/ResetPassword';
import UpdatePassword from 'pages/auth/UpdatePassword';
import UpdateProfile from 'pages/auth/UpdateProfile';
import EventsList from 'pages/events/EventsList';
import CreateEvent from 'pages/events/CreateEvent';
import EditEvent from 'pages/events/EditEvent';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import NotFound from 'pages/NotFound';
import CartPage from 'pages/CartPage';

const App = () => {

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
            <Route path = '/cart' element = {<CartPage />} />

            <Route path = '/CreateEvent' element = {<CreateEvent />} />
            <Route path = '/EditEvent' element = {<EditEvent />} />
            <Route path = '/EventsList' element = {<EventsList />} />

            <Route path = '*' element = {<NotFound />} />
         </Routes>

      </>
  );
}

export default App;
