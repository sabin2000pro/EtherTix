import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { sendMfaEmail, login } from "api/auth/auth-api";
import { useDispatch } from "react-redux";
import cookies from "../auth/cookies";
import * as stor from "../auth/store";

const MfaInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const timeLeft = 15;

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    mfaToken: "",
  });

  const [mail, setMail] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [OTP, setOTP] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });

  const [buttonState, setButtonState] = useState({
    verify: false,
    resend: true,
  });

  const [timer, setTimer] = useState(timeLeft);

  const fetchLoginData = () => {
    if (loginData.password !== "") {
      return;
    }
    const email = location.state.email
      const password = location.state.password;
    if (!email || !password) {
      return;
    }
      

        setLoginData(loginData => ({...loginData, email: email}));
        //setMail(email);

        setLoginData(loginData => ({ ...loginData, password: password }));


      //redirect back to login
      // if (!email || !password) {

      // }
    
    console.log("loginData: ", loginData);
      console.log("email state: ", mail);
  };
  setTimeout(() => {
    fetchLoginData();
  }, 2000);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setButtonState({ ...buttonState, resend: false });
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [buttonState, timer]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = event.target.value.replace(/\D/g, "");

    setOTP({ ...OTP, [event.target.name]: result });
    //console.log(OTP);
  };

  const inputfocus = (elmnt: any) => {
    setError(null);
    setSuccess(null);
    const ms = 100;
    const nOfFields = 6;
    if (
      elmnt.key === "Delete" ||
      elmnt.key === "Backspace" ||
      //left arrow key
      elmnt.keyCode === 37
    ) {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        setTimeout(() => {
          elmnt.target.form.elements[next].focus();
          elmnt.target.form.elements[next].select();
        }, ms);
      }
      //if right arrow key, move focus right
    } else if (elmnt.keyCode === 39) {
      const next = elmnt.target.tabIndex;
      if (next < nOfFields) {
        setTimeout(() => {
          elmnt.target.form.elements[next].focus();
          elmnt.target.form.elements[next].select();
        }, ms);
      }
    } else {
      if (elmnt.keyCode < 48 || elmnt.keyCode > 57) {
        setError("Only digits allowed");
        return;
      }
      const next = elmnt.target.tabIndex;
      if (next < nOfFields) {
        setTimeout(() => {
          elmnt.target.form.elements[next].focus();
          elmnt.target.form.elements[next].select();
        }, ms);
      }
    }
  };

  const bundleTogether = () => {
    loginData.mfaToken = OTP.otp1.concat(
      OTP.otp2,
      OTP.otp3,
      OTP.otp4,
      OTP.otp5,
      OTP.otp6
    );
    console.log(loginData);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    if (
      OTP.otp1 === "" ||
      OTP.otp2 === "" ||
      OTP.otp3 === "" ||
      OTP.otp4 === "" ||
      OTP.otp5 === "" ||
      OTP.otp6 === ""
    ) {
      setError("Please enter a valid token...");
      return;
    }
    setButtonState({ ...buttonState, verify: true, resend: true });

    try {
      bundleTogether();
      const response = await login(loginData);

      if (response.success) {
        cookies.set(stor.COOKIE_NAME_USER, response.user);
        cookies.set(stor.COOKIE_NAME_LOGGED_IN, true);
        cookies.set(stor.COOKIE_NAME_TOKEN, response.token);

        dispatch(stor.login(response.user));
        navigate("/");
      }

      if (timer === 0) {
        setButtonState({ ...buttonState, resend: false });
      }
      setTimeout(() => {
        setButtonState({ ...buttonState, verify: false });
      }, 5000);
    } catch (err: any) {
      setSuccess(null);
      setError("Wrong token, try again");
      console.error(err);

      if (timer === 0) {
        setButtonState({ ...buttonState, resend: false });
      }
      setTimeout(() => {
        setButtonState({ ...buttonState, verify: false });
      }, 5000);
    }
  };

  const handleResend = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setButtonState({ ...buttonState, resend: true });
    event.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await sendMfaEmail(loginData);

      if (response.message === "Two Factor Verification Code Resent") {
        setError(null);
        setSuccess("A new token has been sent to your email");
        setTimer(timeLeft);
        setButtonState({ ...buttonState, resend: true });
      }
    } catch (err: any) {
      setSuccess(null);
      setError("Something went wrong, please try again later...");
      setTimer(timeLeft);
      setButtonState({ ...buttonState, resend: true });
      console.error(err);
    }
  };

  return (
    <Container>
      {error && (
        <Alert variant="danger" style={{ textAlign: "center" }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" style={{ textAlign: "center" }}>
          {success}
        </Alert>
      )}
      <Container className="verify-container">
        <Form.Label
          column="lg"
          style={{ marginTop: "15px", textAlign: "center" }}
        >
          Multi-factor authenication is active on your account
        </Form.Label>
        <Form.Label column="sm" style={{ marginTop: "5px" }}>
          A token has been sent to your email. It may take a moment to arrive.
        </Form.Label>
        <Form.Label
          column="lg"
          style={{ marginTop: "5px", textAlign: "center" }}
        >
          Enter token:
        </Form.Label>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Row
              style={{
                marginBottom: "30px",
                marginTop: "15px",
                marginLeft: "10px",
                marginRight: "10px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <Col>
                <Form.Control
                  name="otp1"
                  type="text"
                  autoComplete="off"
                  className="otpInput"
                  value={OTP.otp1}
                  onChange={handleChange}
                  tabIndex={1}
                  maxLength={1}
                  onKeyDown={(e) => inputfocus(e)}
                  autoFocus
                />
              </Col>
              <Col className="text-center">
                <Form.Control
                  name="otp2"
                  type="text"
                  autoComplete="off"
                  className="otpInput"
                  value={OTP.otp2}
                  onChange={handleChange}
                  tabIndex={2}
                  maxLength={1}
                  onKeyDown={(e) => inputfocus(e)}
                />
              </Col>
              <Col className="text-center">
                <Form.Control
                  name="otp3"
                  type="text"
                  autoComplete="off"
                  className="otpInput"
                  value={OTP.otp3}
                  onChange={handleChange}
                  tabIndex={3}
                  maxLength={1}
                  onKeyDown={(e) => inputfocus(e)}
                />
              </Col>
              <Col className="text-center">
                <Form.Control
                  name="otp4"
                  type="text"
                  autoComplete="off"
                  className="otpInput"
                  value={OTP.otp4}
                  onChange={handleChange}
                  tabIndex={4}
                  maxLength={1}
                  onKeyDown={(e) => inputfocus(e)}
                />
              </Col>
              <Col className="text-center">
                <Form.Control
                  name="otp5"
                  type="text"
                  autoComplete="off"
                  className="otpInput"
                  value={OTP.otp5}
                  onChange={handleChange}
                  tabIndex={5}
                  maxLength={1}
                  onKeyDown={(e) => inputfocus(e)}
                />
              </Col>
              <Col className="text-center">
                <Form.Control
                  name="otp6"
                  type="text"
                  autoComplete="off"
                  className="otpInput"
                  value={OTP.otp6}
                  onChange={handleChange}
                  tabIndex={6}
                  maxLength={1}
                  onKeyDown={(e) => inputfocus(e)}
                />
              </Col>
            </Row>
          </Form.Group>
          <Button
            className="w-100 verify-btn"
            variant="primary"
            type="submit"
            disabled={buttonState.verify}
            style={{ marginBottom: "5px", marginTop: "10px" }}
          >
            Log In
          </Button>
          <Button
            className="w-100 resend-btn"
            variant="outline-primary"
            onClick={handleResend}
            disabled={buttonState.resend || timer > 0}
          >
            {timer > 0
              ? timer < 10
                ? `Re-send token (00:0${timer})`
                : `Re-send token (00:${timer})`
              : "Re-send token"}
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default MfaInput;
