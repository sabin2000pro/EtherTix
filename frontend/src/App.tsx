import ForgotPassword from 'pages/auth/ForgotPassword';
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import React from 'react';
import {Routes, Route} from 'react-router-dom';

const App = () => { // Main App Component

  return (

      <>
      <h1>Home</h1>

         <Routes>
            <Route path = '/register' element = {<Register />} />
            <Route path = '/login' element = {<Login />} />
           
            <Route path = 'forgot-password' element = {<ForgotPassword />} />

         </Routes>

      </>


  );
}

export default App;
