import React, { useState } from "react";
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
}

const UserProfile: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfileData | null>(null);

  let ethBalance: number = 0;

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
    <Container className="profile-container text-center">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <h1>Your Profile</h1>

      <Row style={{paddingTop: "30px"}}>
        <Col>
          <img
            src="https://source.unsplash.com/random/400x400"
            alt="user-propic"
            style={{ height: "250px", width: "250px" }}
          />
        </Col>
        <Col>
          <p>Name: {user?.forename}</p>
          <p>Surname: {user?.surname}</p>
          <p>Email: {user?.email}</p>
          <p>Username: {user?.username}</p>
          <p>Role: {user?.role}</p>
          <p>ETH balance: {ethBalance}</p>
          <Button variant="primary">Edit Profile</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
