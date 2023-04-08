import { User } from "models/user";
import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getUser } from "api/auth/auth-api";

interface UserProfileData {
  _id: string;
  surname: string;
  forename: string;
  email: string;
  username: string;
  role: string;
  password: string;
}

const UserProfile: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfileData | null>(null);

  let ethBalance: number;

  const fetchUserId = async () => {
    if (user === null) {
      try {
        const response = await getUser();
        const data: UserProfileData = {
          _id: response.user._id,
          surname: response.user.surname,
          forename: response.user.forename,
          email: response.user.email,
          username: response.user.username,
          role: response.user.role,
          password: "********",
        };
        setUser(data);
      } catch (error: any) {
        if (error) {
          setError(error.message);
        }
      }
    }
  };
  fetchUserId();

  return (
    <Container className="profile-container">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <div>Your Profile</div>
    </Container>
  );
};

export default UserProfile;
