import ForgotPassword from 'pages/auth/ForgotPassword';
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import React, { useState } from 'react';
import {Routes, Route} from 'react-router-dom';

const App = () => { // Main App Component
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (

      <>
         <Routes>
            <Route path = '/register' element = {<Register />} />
            <Route path = '/login' element = {<Login email = {email} password = {password} />} />
            <Route path = 'forgot-password' element = {<ForgotPassword />} />
         </Routes>
      </>


  );
}

export default App;
