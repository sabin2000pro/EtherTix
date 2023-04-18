import React, { useState } from "react";
import { sendMfaEmail, MfaEmailProps } from "api/auth/auth-api";
import { useForm, useFormState } from "react-hook-form";
import { Alert, Button, Form, Modal, Container } from "react-bootstrap";
import TextInputField from "../../components/form/TextInputField";
import { useNavigate } from "react-router-dom";
import cookies from "auth/cookies";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: () => void;
}

// @description: Login Component
const Login = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const [errorText, setErrorText] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MfaEmailProps>();

  const navigate = useNavigate();

  const onSubmit = async (credentials: MfaEmailProps) => {
    try {
      const response = await sendMfaEmail(credentials);

      // cookies.set("mail", credentials.email);

      const mail = credentials.email as string;

      if (response.success) {
        onLoginSuccessful()
        navigate("/mfa", {state: {email: mail, password: credentials.password}});
      }
    } catch (err: any) {
      if (err.response === undefined) {
        setErrorText("Something went wrong, please try again later...");
      } else {
        setErrorText(err.response.data.message);
      }
      console.error(err);
    }
  };

  const togglePassVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal show onHide={onDismiss} centered>
      <Modal.Header closeButton>
        <Container className="text-center">
          <Modal.Title>Welcome Back</Modal.Title>
        </Container>
      </Modal.Header>

      <Modal.Body>
        {errorText && (
          <Alert variant="danger" style={{ textAlign: "center" }}>
            {errorText}
          </Alert>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container className="text-left">
            <TextInputField
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.email}
              autoFocus
            />

            <TextInputField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.password}
            />
            <Form.Check
              style={{ marginBottom: "15px" }}
              type="checkbox"
              label={showPassword ? "Hide Password" : "Show password"}
              checked={showPassword}
              onChange={togglePassVisibility}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-100"
              variant="primary"
            >
              Log In
            </Button>
            <Button variant="link" href="/forgot-password" className="w-100">
              Forgot your password?
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
