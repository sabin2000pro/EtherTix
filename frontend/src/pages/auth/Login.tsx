import React, { useState } from "react";
import { login, LoginCredentials } from "api/auth/auth-api";
import { User } from "../../models/user";
import { useForm } from "react-hook-form";
import { Alert, Button, Form, Modal, Container } from "react-bootstrap";
import TextInputField from "../../components/form/TextInputField";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

// @description: Login Component
const Login = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  const onSubmit = async (credentials: LoginCredentials) => {
    try {
      const response = await login(credentials);

      //if (response.success === true) {
      onLoginSuccessful(response);
      //} else {
      //return response;
      //}
    } catch (err: any) {
      if (err) {
        setErrorText(err);
        alert(err);
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
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Container className="text-left">
            <TextInputField
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.username}
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

    // <div className="login-container">
    //   <div className="image-container"></div>
    //   <h1 className="heading-primary">Welcome to EtherTix</h1>
    //   <form onSubmit={handleSubmit(onSubmit)} >
    //     <div className="email-container">
    //       <label htmlFor="email-login">Enter Email:</label>
    //       <br />
    //       <input
    //         type="text"
    //         name="email"
    //         id="email-login"
    //         value={Creds.email}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div className="password-container">
    //       <label htmlFor="password">Password</label>
    //       <br />
    //       <input
    //         type="password"
    //         name="password"
    //         id="password"
    //         value={Creds.password}
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <br />
    //     <div className="span-container">
    //       <span>
    //         Don't have an account? - <a href="/register">Register Here</a>{" "}
    //       </span>
    //     </div>
    //     <button className="login-btn" type="submit">
    //       Log-in
    //     </button>
    //   </form>
    // </div>
  );
};

export default Login;
