import React, { useState, useEffect } from "react";
import { verifyEmailAddress } from "api/auth/auth-api";
import { resendEmailVerification } from "api/auth/auth-api";
import { useNavigate, useLocation } from "react-router-dom";

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state.email;

  const [error, setError] = useState("");
  const [OTP, setOTP] = useState({
    OTP: "",
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
    userId: "",
  });

  const [buttonState, setButtonState] = useState({
    verify: false,
    resend: true,
  });

  useEffect(() => {
    const fetchUserId = () => {
      const userId = location.state._id;
      setOTP({ ...OTP, userId: userId});
    };
    fetchUserId();
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOTP({ ...OTP, [event.target.name]: event.target.value });
    //console.log(OTP);
  };

  const inputfocus = (elmnt: any) => {
    const ms = 250;
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        setTimeout(() => {
          elmnt.target.form.elements[next].focus();
        }, ms);
      }
    } else {
      //console.log("next");
      const next = elmnt.target.tabIndex;
      if (next < 6) {
        setTimeout(() => {
          elmnt.target.form.elements[next].focus();
        }, ms);
      }
    }
  };

  const resendButton = (ms: any) => {
    setTimeout(() => {
      setButtonState({ ...buttonState, resend: false });
    }, ms);
  };
  resendButton(15000);

  const bundleTogether = () => {
    OTP.OTP = OTP.otp1.concat(OTP.otp2, OTP.otp3, OTP.otp4, OTP.otp5, OTP.otp6);
    //console.log(OTP.OTP);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setButtonState({ ...buttonState, verify: true });
      bundleTogether();
      const response = await verifyEmailAddress(OTP);
      console.table(response);

      if (response.message === "E-mail Address verified") {
        navigate("/");
      } else {
        alert("Wrong OTP, try again");
        setTimeout(() => {
          setButtonState({ ...buttonState, verify: false });
        }, 5000);
      }
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => {
        setButtonState({ ...buttonState, verify: false });
      }, 5000);
    }
  };

  const handleResend = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setButtonState({ ...buttonState, resend: true });
    event.preventDefault();
    try {
      const response = await resendEmailVerification(OTP);

      if (response.data.message === "E-mail Verification Re-sent") {
        resendButton(30000);
        alert("A new one-time password has been sent to your email");

        // Create an alert component with a green success background
      }
    } catch (err: any) {
      setError(err.message);
      resendButton(15000);
    }
  };

  return (
    <div className="verify-container">
      <br />
      <h1 className="inputHeading">
        Please verify your account
      </h1>
      <br />
      <h4 className="inputHeading">A one-time password has been sent to {userEmail}</h4>
      <br />
      <br />
      <form onSubmit={handleSubmit} method="POST">
        <div className="otp-verify-container">
          <br />
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
        <br />
        <div className="buttons">
          <button
            className="verify-btn"
            type="submit"
            disabled={buttonState.verify}
          >
            Verify
          </button>
          <button
            id="resend-btn"
            className="resend-btn"
            onClick={handleResend}
            disabled={buttonState.resend}
          >
            Re-send OTP
          </button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default EmailVerification;