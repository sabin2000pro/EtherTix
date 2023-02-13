import React, { useState } from "react";
import { verifyEmailAddress } from 'api/auth/auth-api';
import { resendEmailVerification } from 'api/auth/auth-api';
import { useNavigate, useLocation } from 'react-router-dom';

const EmailVerification: React.FC = () => {

  const location = useLocation();

  const [OTP, setOTP] = useState({
    otp: ""
  });

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {

    setOTP({...OTP, [event.target.name]: event.target.value });
    console.log(OTP);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    try {

      const response = await verifyEmailAddress(OTP);
      console.log(response);

    }
    catch (err: any) {
      if(err) {
        return console.error(err);
    }
    }

  }

  const Example = () => {
    
    var stuff = location.state.email;
    console.log(stuff);
  }

  return (
    <>
    <head></head>
    <body>
      <button onClick={Example}>

        DoIt
      </button>
    </body></>

    
  )
}

export default EmailVerification