import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "api/auth/auth-api";
import { IResetPassword } from "api/auth/interfaces/auth-interfaces";
import { useForm } from "react-hook-form";
import TextInputField from "../../components/form/TextInputField";
import { Alert, Button, Form, Modal, Container } from "react-bootstrap";

interface ResetPasswordModalProps {
  onDismiss: () => void;
}

const ResetPassword: React.FC<ResetPasswordModalProps> = ({ onDismiss }) => {
  const navigate = useNavigate();
  const { resetToken, userId } = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch} = useForm<IResetPassword>();
  const newPassword = watch("newPassword", "");

  const onSubmit = async (data: IResetPassword) => {

    if (data.newPassword !== data.confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    data.resetToken = resetToken as string;
    data.userId = userId as string;

    try {

      const response = await resetPassword(data);

      if (response.success) {
        navigate("/");
      }


    } 
    
    catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (


    <Modal show onHide = {onDismiss} backdrop="static" centered>

      <Modal.Header>
        <Container className="text-center">
          <Modal.Title>Reset Password</Modal.Title>
        </Container>
      </Modal.Header>


      <Modal.Body>
        {errorMessage && (
          <Alert variant="danger" style={{ textAlign: "center" }}>
            {errorMessage}
          </Alert>
        )}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-center">Please enter your new password below:</p>
          <Container className="text-left">
            <TextInputField
              name="newPassword"
              label="New Password"
              type="password"
              placeholder="New Password"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.newPassword}
              autoFocus
            />
            <TextInputField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              register={register}

              registerOptions={{
                required: "Required",
                validate: (value) =>
                  value === newPassword || "Passwords don't match.",
              }}
              error={errors.confirmPassword}
            />

            <Button type="submit" disabled={isSubmitting} className="w-100">
              Submit
            </Button>


          </Container>
        </Form>
      </Modal.Body>
    </Modal>


  );

};

export default ResetPassword;