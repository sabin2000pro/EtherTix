import React, { useState } from "react";
import { verifyEmailAddress } from "api/auth/auth-api";
import { resendEmailVerification } from "api/auth/auth-api";
import { useNavigate, useLocation } from "react-router-dom";

const EmailVerification: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [OTP, setOTP] = useState({
    userID: location.state.email,
    otp: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOTP({ ...OTP, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await verifyEmailAddress(OTP);

      if (response.data.message === "E-mail Address verified") {
        navigate("/login", { state: { email: OTP.userID } });
      } else {
        alert("Wrong OTP, try again");
      }
    } catch (err: any) {
      if (err) {
        return console.error(err);
      }
    }
  };

  const handleResend = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await resendEmailVerification(OTP);

      if (response.data.message === "E-mail Verification Re-sent") {
        alert("E-mail Verification Re-sent");
      }
    } catch (err: any) {
      if (err) {
        return console.error(err);
      }
    }
  };

  return (
    <div className="verify-container">
      <h1 className="heading">You've got mail</h1>
      <form onSubmit={handleSubmit} method="POST">
        <div className="otp-verify-container">
          <label htmlFor="otp-verify">Enter your one-time-password here:</label>
          <input
            type="text"
            name="otp"
            id="otp-verify"
            value={OTP.otp}
            onChange={handleChange}
          />
        </div>
        <button className="verify-btn" type="submit">
          Verify
        </button>
      </form>
      <button className="resend-btn" onClick={handleResend}>
        Re-send OTP
      </button>
    </div>
  );
};

export default EmailVerification;