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
import UserProfile from "pages/auth/UserProfile";
import Footer from "components/Footer";

const App: React.FC = () => {
  const navigate = useNavigate();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>

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

            <Route path = "/" element={

                <Home onSignUpClicked={() => setShowSignUpModal(true)} />
              }
            />

            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route
              path="/reset-password"
              element={<ResetPassword onDismiss={() => navigate("/")} />}
            />

            <Route path = "/verify-email" element = {<EmailVerification />} />
            <Route path = "/update-password" element = {<UpdatePassword />} />
            <Route path = "/update-profile" element = {<UpdateProfile />} />
            <Route path = "/my-cart" element = {<CartPage />} />

            <Route path = "/my-profile" element={<UserProfile />} />

            <Route path = "/events" element = {<EventsList />} />
            <Route path = "/event-details/:id" element = {<SingleEvent />} />

            <Route path = "*" element = {<NotFound />} />

          </Routes>

          {<Footer />}


        </Container>

        {showSignUpModal && (

          <Register

            onDismiss = {() => setShowSignUpModal(false)}
            onSignUpSuccessful={() => {
              setShowSignUpModal(false);
            }}


          />
        )}

        {showLoginModal && (

          <Login onDismiss={() => setShowLoginModal(false)}
            onLoginSuccessful={() => {
              setShowLoginModal(false);
            }}


          />
        )}

    </>
  );
};

export default App;
