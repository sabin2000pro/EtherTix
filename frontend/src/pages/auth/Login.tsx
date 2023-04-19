import React, { useState } from "react";
import { login, LoginCredentials } from "api/auth/auth-api";
import { useForm, useFormState } from "react-hook-form";
import { Alert, Button, Form, Modal, Container } from "react-bootstrap";
import TextInputField from "../../components/form/TextInputField";
import { useDispatch } from "react-redux";
import cookies from "../../auth/cookies";
import * as stor from "../../auth/store";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: () => void;
}

const Login = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const [errorText, setErrorText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();

  const dispatch = useDispatch();

  const onSubmit = async (credentials: LoginCredentials) => {
    try {

      const response = await login(credentials);

      if (response.success) {

        cookies.set(stor.COOKIE_NAME_USER, response.user);
        cookies.set(stor.COOKIE_NAME_LOGGED_IN, true);
        cookies.set(stor.COOKIE_NAME_TOKEN, response.token);

        dispatch(stor.login(response.user));

        onLoginSuccessful();

      }
    } 
    
    catch (err: any) {

      if (err.response === undefined) {
          setErrorText(err.message);
      } 
      
      else {
        setErrorText(err.response.data.message);
      }
    }


  };

  const togglePassVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (


    <Modal show onHide = {onDismiss} centered>


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

        <Form method = "POST" onSubmit = {handleSubmit(onSubmit)}>

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

            <Form.Check style={{ marginBottom: "15px" }}
              type="checkbox"
              label={showPassword ? "Hide Password" : "Show password"}
              checked={showPassword}
              onChange={togglePassVisibility}
            />

            <Button type = "submit" disabled = {isSubmitting} className = "w-100" variant="primary"> Log In</Button>

            <Button variant = "link" href = "/forgot-password" className = "w-100">
              Forgot your password?
            </Button>

          </Container>

        </Form>
      </Modal.Body>

    </Modal>
  );
};

export default Login;
