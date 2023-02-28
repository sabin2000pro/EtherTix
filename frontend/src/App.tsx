import Navbar from 'components/Navbar';
import { useEffect } from 'react';
import Home from 'pages/Home';
import EmailVerification from 'pages/auth/EmailVerification';
import ForgotPassword from 'pages/auth/ForgotPassword';
import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import ResetPassword from 'pages/auth/ResetPassword';
import UpdatePassword from 'pages/auth/UpdatePassword';
import UpdateProfile from 'pages/auth/UpdateProfile';
import React, { useContext} from 'react';
import {Routes, Route} from 'react-router-dom';
import NotFound from 'pages/NotFound';
import CartPage from 'pages/CartPage';
import { Web3Context } from 'constants/context/Web3Context';
import MintToken from 'pages/nfts/MintToken';
import { useDispatch, useSelector} from 'react-redux';
import { fetchAllTickets } from './actions/ticket-actions';

interface TicketState {
   tickets: any
}

const App = () => { // Push to github recent changes
   const {connectMetaMaskWallet, initialiseNftContract} = useContext(Web3Context);
   const dispatch = useDispatch();
   const {tickets} = useSelector((state: TicketState) => state.tickets);

   useEffect(() => {

      const fetchTicketData = async () => {
          dispatch(fetchAllTickets() as any);
      }

      fetchTicketData();

   }, [dispatch])

   const handleMintNFT = async () => {

      const currentAccount = await connectMetaMaskWallet();
      const currentContract = await initialiseNftContract();

      const mintedToken = await currentContract.methods.mintToken("test", "test", 1, 1).send({from: currentAccount.currentAccount[0] as unknown as any});
      return mintedToken;
   }


  return (
      <>

      <MintToken mintNFT = {handleMintNFT} />
      
         <Navbar />

          <Routes>
             <Route path = '/reset-password/:resetToken' element = {<ResetPassword />} />
            <Route path = '/' element = {<Home />} />
            <Route path = '/register' element = {<Register />} /> 
            <Route path = '/login' element = {<Login />} />
            <Route path = '/forgot-password' element = {<ForgotPassword />} />

            <Route path = '/reset-password' element = {<ResetPassword />} />
            <Route path = '/verify-email' element = {<EmailVerification />} />
            <Route path = '/update-password' element = {<UpdatePassword />} />
            <Route path = '/update-profile' element = {<UpdateProfile />} />
            <Route path = '/cart' element = {<CartPage />} />


            <Route path = '*' element = {<NotFound />} />
         </Routes>

      </>
  );
}

export default App;
