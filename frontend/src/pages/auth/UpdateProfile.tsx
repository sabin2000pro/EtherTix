import React, { useState } from "react";
import { Alert, Button, Form, Container, Modal } from "react-bootstrap";
import { updateProfile } from "api/auth/auth-api";
import { UpdateProfileCredentials } from "api/auth/interfaces/auth-interfaces";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import TextInputField from "components/form/TextInputField";
import { useSelector } from "react-redux";
import { User } from "models/user";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState<UpdateProfileCredentials | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileCredentials>();

  const user = useSelector((state: any) => state.auth.user as User);

  const onSubmit = (data: UpdateProfileCredentials) => {
    handleChange(data);
  };

  const handleRedirect = () => {
    const updatedDetails: string[] = [];
    if (formData?.email) {
      updatedDetails.push("email");
    }
    if (formData?.username) {
      updatedDetails.push("username");
    }
    if (formData?.role) {
      updatedDetails.push("role");
    }

    setError(null);

    setSuccess(
      `Successfully updated your ${updatedDetails.join(
        ", "
      )}, redirecting now...`
    );

    
    setTimeout(() => {
      navigate("/");
    }, 3500);
  };

  const handleModalSubmit = async () => {

    if (formData) {
      setError(null);
      setSuccess(null);
      try {
        const response = await updateProfile(formData);

        setShowConfirm(false);

        if (response.success) {
          handleRedirect();
        }
      } 
      
      catch (error) {
        console.error(error);
        setSuccess(null);
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  const handleChange = (data: UpdateProfileCredentials) => {
    if (user !== null) {
      setFormData(data);
      setShowConfirm(true);
    } else {
      setSuccess(null);
      setError("You need to be logged in to make any changes");
    }
  };

  const handleRoleChange = (role: string) => {
    setFormData((prevData) => {
      if (prevData) {
        return { ...prevData, role };
      }
      return null;
    });
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
      <Container className="update-profile-container">
        <Form.Label
          column="lg"
          style={{
            marginTop: "15px",
            marginBottom: "15px",
            textAlign: "center",
          }}
        >
          Update at least one:
        </Form.Label>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="email"
            label="Please enter your new email:"
            type="email"
            placeholder="New email"
            register={register}
            error={errors.email}
            autoFocus
          />
          <TextInputField
            name="username"
            label="Please enter your new username:"
            type="text"
            placeholder="New username"
            register={register}
            error={errors.username}
          />
          <select
            className="w-100"
            style={{
              marginTop: "15px",
              marginBottom: "30px",
            }}
            {...register("role")}
            onChange={(event) => handleRoleChange(event.target.value)}
          >
            <option value="">Please select your new role</option>
            {user.role !== "Admin" && <option value="Admin">Admin</option>}
            {user.role !== "Organiser" && (
              <option value="Organiser">Organiser</option>
            )}
            {user.role !== "Moderator" && (
              <option value="Moderator">Moderator</option>
            )}
            {user.role !== "User" && <option value="User">User</option>}
          </select>
          <Button className="w-100" onClick={handleSubmit(onSubmit)}>
            Update Profile
          </Button>
        </Form>
        {showConfirm && (
          <Modal
            show={showConfirm}
            onHide={() => setShowConfirm(false)}
            centered
          >
            <Modal.Header>
              <Container>
                <Modal.Title> Confirm your selection</Modal.Title>
              </Container>
            </Modal.Header>

            <Modal.Body>
              <Container>
                {formData?.email && <p>New Email: {formData?.email}</p>}
                {formData?.username && (
                  <p>New Username: {formData?.username}</p>
                )}
                {formData?.role && <p>New Role: {formData?.role}</p>}
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleModalSubmit}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </Container>
  );
};

export default UpdateProfile;
