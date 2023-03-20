import React, { useState, useEffect } from "react";
import { verifyEmailAddress, resendEmailVerification } from "api/auth/auth-api";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

const EmailVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state.email; 
  //"mail";
  const timeLeft = 15;

  const fetchUserId = () => {
    const userId = location.state._id; 
    //"hello";
    setCreds({ ...creds, userId: userId });
  };
  setTimeout(() => {
    fetchUserId();
  }, 2000);

  const [error, setError] = useState("");
  const [OTP, setOTP] = useState({
    // OTP: "",
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
    // userId: "",
  });

  const [creds, setCreds] = useState({
    OTP: "",
    userId: "",
  })

  const [buttonState, setButtonState] = useState({
    verify: false,
    resend: true,
  });

  const [timer, setTimer] = useState(timeLeft);

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
    setOTP({ ...OTP, [event.target.name]: event.target.value });
    //console.log(OTP);
  };

  const inputfocus = (elmnt: any) => {
    const ms = 250;
    if (
      elmnt.key === "Delete" ||
      elmnt.key === "Backspace" ||
      elmnt.keyCode === 37
    ) {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        setTimeout(() => {
          elmnt.target.form.elements[next].focus();
          elmnt.target.form.elements[next].select();
        }, ms);
      }
    } else {
      //console.log("next");
      const next = elmnt.target.tabIndex;
      if (next < 6) {
        setTimeout(() => {
          elmnt.target.form.elements[next].focus();
          elmnt.target.form.elements[next].select();
        }, ms);
      }
    }
  };

  const bundleTogether = () => {
    creds.OTP = OTP.otp1.concat(OTP.otp2, OTP.otp3, OTP.otp4, OTP.otp5, OTP.otp6);
    //console.log(OTP.OTP);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setButtonState({ ...buttonState, verify: true, resend: true });
    event.preventDefault();
    try {
      bundleTogether();
      const response = await verifyEmailAddress(creds);

      if (response.message === "E-mail Address verified") {
        navigate("/");
      } else {
        alert("Wrong OTP, try again");

        if (timer === 0) {
          setButtonState({ ...buttonState, resend: false });
        }
        setTimeout(() => {
          setButtonState({ ...buttonState, verify: false });
        }, 5000);
      }
    } catch (err: any) {
      setError(err.message);

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
    try {
      const response = await resendEmailVerification(creds);

      if (response.message === "E-mail Verification Re-sent") {
        alert("A new one-time password has been sent to your email");
        setTimer(timeLeft);
        setButtonState({ ...buttonState, resend: true });

        // Create an alert component with a green success background
      }
    } catch (err: any) {
      setError(err.message);
      setTimer(timeLeft);
      setButtonState({ ...buttonState, resend: true });
    }
  };

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      <Container className="verify-container">
        <Form.Label
          column="lg"
          style={{ marginTop: "15px", textAlign: "center" }}
        >
          Verify it's you
        </Form.Label>
        <Form.Label
          column="sm"
          style={{ marginTop: "5px" }}
        >
          A one-time password has been sent to "{userEmail}". It may take a moment
          to arrive.
        </Form.Label>
        <Form.Label column="lg" style={{ marginTop: "5px", textAlign: "center" }}>
          Enter OTP:
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
            Verify
          </Button>
          <Button
            className="w-100 resend-btn"
            variant="outline-primary"
            onClick={handleResend}
            disabled={buttonState.resend || timer > 0}
          >
            {timer > 0
              ? timer < 10
                ? `Re-send OTP (00:0${timer})`
                : `Re-send OTP (00:${timer})`
              : "Re-send OTP"}
          </Button>
        </Form>
      </Container>
    </Container>

    // <div className="verify-container">
    //   <br />
    //   <h1 className="inputHeading">
    //     Please verify your account
    //   </h1>
    //   <br />
    //   <h4 className="inputHeading">A one-time password has been sent to {userEmail}</h4>
    //   <br />
    //   <br />
    //   <form onSubmit={handleSubmit} method="POST">
    //     <div className="otp-verify-container">
    //       <br />
    //       <input
    // name="otp1"
    // type="text"
    // autoComplete="off"
    // className="otpInput"
    // value={OTP.otp1}
    // onChange={handleChange}
    // tabIndex={1}
    // maxLength={1}
    // onKeyUp={(e) => inputfocus(e)}
    //       />
    //       <input
    //         name="otp2"
    //         type="text"
    //         autoComplete="off"
    //         className="otpInput"
    //         value={OTP.otp2}
    //         onChange={handleChange}
    //         tabIndex={2}
    //         maxLength={1}
    //         onKeyUp={(e) => inputfocus(e)}
    //       />
    //       <input
    //         name="otp3"
    //         type="text"
    //         autoComplete="off"
    //         className="otpInput"
    //         value={OTP.otp3}
    //         onChange={handleChange}
    //         tabIndex={3}
    //         maxLength={1}
    //         onKeyUp={(e) => inputfocus(e)}
    //       />
    //       <input
    //         name="otp4"
    //         type="text"
    //         autoComplete="off"
    //         className="otpInput"
    //         value={OTP.otp4}
    //         onChange={handleChange}
    //         tabIndex={4}
    //         maxLength={1}
    //         onKeyUp={(e) => inputfocus(e)}
    //       />
    //       <input
    //         name="otp5"
    //         type="text"
    //         autoComplete="off"
    //         className="otpInput"
    //         value={OTP.otp5}
    //         onChange={handleChange}
    //         tabIndex={5}
    //         maxLength={1}
    //         onKeyUp={(e) => inputfocus(e)}
    //       />
    //       <input
    //         name="otp6"
    //         type="text"
    //         autoComplete="off"
    //         className="otpInput"
    //         value={OTP.otp6}
    //         onChange={handleChange}
    //         tabIndex={6}
    //         maxLength={1}
    //         onKeyUp={(e) => inputfocus(e)}
    //       />
    //     </div>
    //     <br />
    //     <div className="buttons">
    //       <button
    //         className="verify-btn"
    //         type="submit"
    //         disabled={buttonState.verify}
    //       >
    //         Verify
    //       </button>
    //       <button
    //         id="resend-btn"
    //         className="resend-btn"
    //         onClick={handleResend}
    //         disabled={buttonState.resend}
    //       >
    //         Re-send OTP
    //       </button>
    //     </div>
    //   </form>
    //   {error && <p>{error}</p>}
    // </div>
  );
};

export default EmailVerification;
