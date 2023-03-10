
import React from 'react';
import Home from "pages/Home";
import EmailVerification from "pages/auth/EmailVerification";
import ForgotPassword from "pages/auth/ForgotPassword";
import { Routes, Route } from 'react-router-dom';
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import ResetPassword from "pages/auth/ResetPassword";
import UpdatePassword from "pages/auth/UpdatePassword";
import UpdateProfile from "pages/auth/UpdateProfile";
import NotFound from "pages/NotFound";
import CartPage from "pages/CartPage";


const App = () => {

  return (
    <>
      {/* <MintToken mintNFT = {handleMintNFT} /> */}


        <Routes>

          <Route path="/reset-password/:resetToken" element={<ResetPassword />}
          />

          <Route path="/" element={<Home />} />
          <Route path="/register" element = {<Register />} />
          {/* <Route path = '/login' element = {<Login />} /> */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="*" element={<NotFound />} />

        </Routes>

      
    </>
  );
};

export default App;
