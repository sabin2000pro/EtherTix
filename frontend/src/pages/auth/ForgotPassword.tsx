import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Form, Container } from "react-bootstrap";
import TextInputField from "../../components/form/TextInputField";
import { forgotPassword, ForgotPCredentials } from "api/auth/auth-api";

const ForgotPassword: React.FC = () => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const [successText, setSuccessText] = useState<string | null>(null);

  const timeLeft = 15;

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    return () => {
      if (timer > 0) {
        clearInterval(interval);
      }
    };
  }, [timer]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPCredentials>();

  const onSubmit = async (data: ForgotPCredentials) => {
    try {
      setErrorText(null);
      setSuccessText(null);
      const response = await forgotPassword(data);
      if (response.success === true) {
        setErrorText(null);
        setSuccessText(
          "User found - A password reset link has been sent to your email address."
        );
      };
    } catch (error: any) {
      setSuccessText(null);
      setErrorText("No corresponding user found - Please check email entry...");
      console.log(error);
    }
    setTimer(timeLeft);
  };

  return (
    <Container>
      {errorText && <Alert variant="danger" style={{textAlign: "center"}}>{errorText}</Alert>}
      {successText && <Alert variant="success" style={{textAlign: "center"}}>{successText}</Alert>}
      <Container className="verify-container">
        <Form.Label
          column="lg"
          style={{ marginTop: "15px", textAlign: "center" }}
        >
          Forgotten Password?
        </Form.Label>
        <Form.Label
          column="sm"
          style={{ marginTop: "5px", marginBottom: "45px" }}
        >
          Thats Okay! Please enter your email to receive a password reset link.
        </Form.Label>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="email"
            label="Please enter your email:"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
            autoFocus
          />
          <Button
            type="submit"
            disabled={isSubmitting || timer > 0}
            className="w-100"
          >
            {timer > 0
              ? timer < 10
                ? `Re-send Reset Link in (00:0${timer})`
                : `Re-send Reset Link in (00:${timer})`
              : "Send Reset Link"}
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default ForgotPassword;
