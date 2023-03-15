import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Form, Container } from "react-bootstrap";
import TextInputField from "../../components/form/TextInputField";
import { forgotPassword } from "api/auth/auth-api";

const ForgotPassword: React.FC = (props) => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const [successText, setSuccessText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>();

  async function onSubmit(data: { email: string }) {
    try {
      await forgotPassword(data);
      setSuccessText(
        "A password reset link has been sent to your email address."
      );
      setErrorText(null);
    } catch (error: any) {
      setErrorText(error.message);
      console.error(error);
    }
  }

  return (
    <>
      <Container>
        <h1>Forgotten Password?</h1>
        <p>Thats Okay! Please enter your email to receive a password reset link.</p>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        {successText && <Alert variant="success">{successText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Button type="submit" disabled={isSubmitting} className="w-100">
            Send Reset Link
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default ForgotPassword;
