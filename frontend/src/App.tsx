import NavBar from "components/NavBar";
import Home from "pages/Home";
import EmailVerification from "pages/auth/EmailVerification";
import ForgotPassword from "pages/auth/ForgotPassword";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";
import ResetPassword from "pages/auth/ResetPassword";
import UpdatePassword from "pages/auth/UpdatePassword";
import UpdateProfile from "pages/auth/UpdateProfile";
import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotFound from "pages/NotFound";
import CartPage from "pages/CartPage";
import { Web3Context } from "context/Web3Context";
import MintToken from "pages/nfts/MintToken";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTickets } from "./actions/ticket-actions";
import { User } from "./models/user";
import { getUser } from "./api/auth/auth-api";
import { Container } from "react-bootstrap";

interface TicketState {
  tickets: any;
}

const App = () => {
  // Push to github recent changes
  const { connectMetaMaskWallet, initialiseNftContract } =
    useContext(Web3Context);
  const dispatch = useDispatch();
  const { tickets } = useSelector((state: TicketState) => state.tickets);

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await getUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    //fetchLoggedInUser();
  }, []);

  //_tokenName: string, _tokenClass: string,  _tokenPrice: number, _tokenCapacity: number

  const handleMintNFT = async () => {
    const currentAccount = await connectMetaMaskWallet();
    const currentContract = await initialiseNftContract();

    const mintedToken = await currentContract.methods
      .mintToken("test", "test", 1, 1)
      .send({ from: currentAccount.currentAccount[0] as unknown as any });

    console.log(`The token you minted : `, mintedToken);
    return mintedToken;
  };

  return (
    <>
      {/* <MintToken mintNFT = {handleMintNFT} /> */}

      <button onClick={handleMintNFT}>Mint Test NFT</button>

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
            element={<ResetPassword />}
          />
          <Route path="/" element={<Home />} />
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path = '/login' element = {<Login />} /> */}
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/reset-password" element={<ResetPassword />} />
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
