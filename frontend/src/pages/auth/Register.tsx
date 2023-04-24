import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Form, Modal, Container } from "react-bootstrap";
import TextInputField from "../../components/form/TextInputField";
import { registerUser } from "api/auth/auth-api";
import { IRegisterCredentials } from "api/auth/auth-api";
import { useNavigate } from "react-router-dom";
import * as stor from "../../auth/store";
import cookies from "auth/cookies";
import { useDispatch } from "react-redux";

interface SignUpModalProps {
  onDismiss: () => void;
  onSignUpSuccessful: () => void;
}

export const Register = ({ onDismiss, onSignUpSuccessful }: SignUpModalProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const {register, handleSubmit, formState: { errors, isSubmitting }, watch} = useForm<IRegisterCredentials>();
  const Password = watch("password", "");

  async function onSubmit(credentials: IRegisterCredentials) {

    try {

      const response = await registerUser(credentials);

      cookies.set(stor.COOKIE_NAME_USER, response.user);
      cookies.set(stor.COOKIE_NAME_LOGGED_IN, true);
      cookies.set(stor.COOKIE_NAME_TOKEN, response.token);

      dispatch(stor.login(response.user));

      onSignUpSuccessful();
      navigate("/verify-email");
    }
    
    catch (error: any) {

      if (error) {
        setErrorText(error.message);
      } 
      
      else {
        alert(error);
      }

      console.error(error);
    }
  }

  const togglePassVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (

    <Modal show onHide={onDismiss} backdrop = "static" centered>


      <Modal.Header closeButton>

        <Container className = "text-center">
          <Modal.Title>Register Account</Modal.Title>
        </Container>


      </Modal.Header>

      <Modal.Body>

        {errorText && (

          <Alert variant="danger" style={{ textAlign: "center" }}>
            {errorText}
          </Alert>

        )}

        <Form onSubmit = {handleSubmit(onSubmit)}>

          <Container className = "text-left">

            <TextInputField name="forename" label = "Forename" type="text" placeholder="Forename" register={register} registerOptions={{ required: "Required" }} error = {errors.username} autoFocus
            />

            <TextInputField name = "surname"
              label="Surname"
              type="text"
              placeholder="Surname"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.username}
            />

            <TextInputField
              name="username"
              label="Username"
              type="text"
              placeholder="Username"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.username}
            />

            <TextInputField
              name="email"
              label="Email"
              type="email"
              placeholder="Email"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.email}
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

            <TextInputField
              name="passwordConfirm"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              register={register}

              registerOptions={{

                required: "Required",
                validate: (value) =>
                  value === Password || "Passwords don't match.",
              }}

              error={errors.passwordConfirm}
            />

            <Form.Check
              style={{ marginBottom: "15px" }}
              type="checkbox"
              label={showPassword ? "Hide Password" : "Show password"}
              checked={showPassword}
              onChange={togglePassVisibility}
            />
            
            <Button type="submit" disabled={isSubmitting} className="w-100">
              Sign Up
            </Button>


          </Container>


        </Form>
      </Modal.Body>
    </Modal>
  );
};
