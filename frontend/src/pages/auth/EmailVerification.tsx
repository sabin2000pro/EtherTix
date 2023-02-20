import React, { useState } from "react";
import { verifyEmailAddress } from "api/auth/auth-api";
import { resendEmailVerification } from "api/auth/auth-api";
import { useNavigate } from "react-router-dom";
import { concat } from "ethers/lib/utils";

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  //const localUserID = JSON.parse(localStorage.getItem("UserID") || "");

  const [OTP, setOTP] = useState({
    OTP: "",
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
    //userID: localUserID
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOTP({ ...OTP, [event.target.name]: event.target.value });
    //console.log(OTP);
  };

  const inputfocus = (elmnt: any) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      //console.log("next");

      const next = elmnt.target.tabIndex;
      if (next < 6) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

  const bundleTogether = () => {
    OTP.OTP = OTP.otp1.concat(OTP.otp2, OTP.otp3, OTP.otp4, OTP.otp5, OTP.otp6);
    //console.log(OTP.OTP);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      bundleTogether();
      const response = await verifyEmailAddress(OTP);
      console.table(response);

      if (response.data.message === "E-mail Address verified") {
        navigate("/login");
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

        // Create an alert component with a green success background
      }
    } catch (err: any) {
      if (err) {
        return console.error(err);
      }
    }
  };

  return (
    <div className="verify-container">
      <h1 className="inputHeading">You've got mail</h1>
      <form onSubmit={handleSubmit} method="POST">
        <div className="otp-verify-container">
          <label htmlFor="otp-verify">Enter your one-time-password here:</label>
          {/* <input
            type="text"
            name="OTP"
            id="otp-verify"
            value={OTP.OTP}
            onChange={handleChange}
          /> */}
          <input
            name="otp1"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={OTP.otp1}
            onChange={handleChange}
            tabIndex={1}
            maxLength={1}
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp2"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={OTP.otp2}
            onChange={handleChange}
            tabIndex={2}
            maxLength={1}
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp3"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={OTP.otp3}
            onChange={handleChange}
            tabIndex={3}
            maxLength={1}
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp4"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={OTP.otp4}
            onChange={handleChange}
            tabIndex={4}
            maxLength={1}
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp5"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={OTP.otp5}
            onChange={handleChange}
            tabIndex={5}
            maxLength={1}
            onKeyUp={(e) => inputfocus(e)}
          />
          <input
            name="otp6"
            type="text"
            autoComplete="off"
            className="otpInput"
            value={OTP.otp6}
            onChange={handleChange}
            tabIndex={6}
            maxLength={1}
            onKeyUp={(e) => inputfocus(e)}
          />
        </div>
        <button className="verify-btn" type="submit">
          Verify
        </button>
        <button className="resend-btn" onClick={handleResend}>
        Re-send OTP
      </button>
      </form>
    </div>
  );
};

export default EmailVerification;