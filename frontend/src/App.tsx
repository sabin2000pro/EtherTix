import NavBar from "components/Navbar";
import Home from "pages/Home";
import EmailVerification from "pages/auth/EmailVerification";
import ForgotPassword from "pages/auth/ForgotPassword";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import ResetPassword from "pages/auth/ResetPassword";
import UpdatePassword from "pages/auth/UpdatePassword";
import UpdateProfile from "pages/auth/UpdateProfile";
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NotFound from "pages/NotFound";
import CartPage from "pages/CartPage";
import { User } from "./models/user";
import { getUser } from "./api/auth/auth-api";
import { Container } from "react-bootstrap";


const App = () => {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const response = await getUser();
        setLoggedInUser(response.user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <>

      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />

      <Container>
        <Routes>
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPassword onDismiss={() => navigate('/')} />}
          />
          <Route path="/" element={<Home />} />
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path = '/login' element = {<Login />} /> */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/reset-password" element={<ResetPassword onDismiss={() => navigate('/')} />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      {showSignUpModal && (
        <Register
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}
      {showLoginModal && (
        <Login
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </>
  );
};

export default App;