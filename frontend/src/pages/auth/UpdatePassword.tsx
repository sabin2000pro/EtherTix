import React, { useState } from "react";
import { Alert, Button, Form, Container } from "react-bootstrap";
import { UpdatePasswordCredentials, updatePassword } from "api/auth/auth-api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextInputField from "components/form/TextInputField";

const UpdatePassword: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<UpdatePasswordCredentials>();

  const newPassword = watch("newPassword", "");

  const onSubmit = async (data: UpdatePasswordCredentials) => {
    setError(null);
    setSuccess(null);
    if (data.newPassword !== data.passwordConfirm) {
      setError("Passwords don't match.");
      return;
    }
    try {
      const response = await updatePassword(data);

      if (response.success) {
        setError(null);
        setSuccess("Password updated succesfully, redirecting now...");
        setTimeout(() => {
          navigate("/");
        }, 2500);
      }
    } catch (error) {
      console.error(error);
      setSuccess(null);
      setError("Something went wrong. Please try again later.");
    }
  };

  const togglePassVisibility = () => {
    setShowPassword(!showPassword);
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
      <Container className="update-password-container">
        <Form.Label
          column="lg"
          style={{
            marginTop: "15px",
            marginBottom: "5px",
            textAlign: "center",
          }}
        >
          Update your password
        </Form.Label>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="currentPassword"
            label="Please enter your current password:"
            type={showPassword ? "text" : "password"}
            placeholder="Current password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.currentPassword}
            autoFocus
          />
          <TextInputField
            name="newPassword"
            label="Please enter your new password:"
            type={showPassword ? "text" : "password"}
            placeholder="New password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.newPassword}
          />
          <TextInputField
            name="passwordConfirm"
            label="Please confirm your new password:"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm new password"
            register={register}
            registerOptions={{
              required: "Required",
              validate: (value) =>
                value === newPassword || "Passwords don't match.",
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
            Update Password
          </Button>
        </Form>
      </Container>
    </Container>
  );
};

export default UpdatePassword;
