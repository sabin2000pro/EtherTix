import NavBar from "components/Navbar";
import Home from "pages/Home";
import EmailVerification from "pages/auth/EmailVerification";
import ForgotPassword from "pages/auth/ForgotPassword";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import ResetPassword from "pages/auth/ResetPassword";
import UpdatePassword from "pages/auth/UpdatePassword";
import UpdateProfile from "pages/auth/UpdateProfile";
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NotFound from "pages/NotFound";
import CartPage from "pages/CartPage";
import { Container } from "react-bootstrap";
import EventsList from "pages/events/EventsList";
import SingleEvent from "pages/events/SingleEvent";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/store";
import UserProfile from "pages/auth/UserProfile";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

const App: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

<<<<<<< HEAD
   return (
=======
  const handleFetchTickets = (event: any): void => {
    try {
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  };
>>>>>>> a6599bd85d71de83af04d330104cad528284e27f

  return (
    <>
      <Provider store={store}>
        <NavBar
          onLoginClicked={() => setShowLoginModal(true)}
          onSignUpClicked={() => setShowSignUpModal(true)}
        />

        <Container style={{ padding: "32px 0", maxWidth: "1400px" }}>
          <Routes>
            <Route
              path="/reset-password/:resetToken/:userId"
              element={<ResetPassword onDismiss={() => navigate("/")} />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset-password"
              element={<ResetPassword onDismiss={() => navigate("/")} />}
            />

            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/my-cart" element={<CartPage />} />

            <Route path="/my-profile" element={<UserProfile />} />

            <Route path="/events" element={<EventsList />} />
            <Route path="/events/:id" element={<SingleEvent />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>

        {showSignUpModal && (
          <Register
            onDismiss={() => setShowSignUpModal(false)}
            onSignUpSuccessful={() => {
              setShowSignUpModal(false);
            }}
          />
        )}

        {showLoginModal && (
          <Login
            onDismiss={() => setShowLoginModal(false)}
            onLoginSuccessful={() => {
              setShowLoginModal(false);
            }}
          />
        )}
      </Provider>
    </>
  );
};

export default App;
