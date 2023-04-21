import React, { useContext, useState } from "react";
import { Button, Container, Row, Col, Alert, Modal } from "react-bootstrap";
import * as blockchain from "context/Web3Context";
import { useSelector } from "react-redux";
import { User } from "models/user";

const UserProfile: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  // const [user, setUser] = useState<UserProfileData | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  const user = useSelector((state: any) => state.auth.user as User);

  const { connectMetaMaskWallet } = useContext(blockchain.Web3Context);

  const handleConnect = async () => {
    const ethAccount = await connectMetaMaskWallet(); // Invoke function to connect to the meta mask wallet account

    if (ethAccount) {
      setBalance(parseFloat(ethAccount.convertedBalance));
      setAddress(ethAccount.currentAccount[0]);
    }


  };

  handleConnect();

  const handleChange = () => {
    if (user !== null) {
      setShowEditModal(!showEditModal);
    }
    
    else {
      setSuccess(null);
      setError("You need to be logged in to make any changes");
    }
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

      <Container className="profile-container text-center">
        <Row style={{ paddingTop: "5px" }}>
          <Col style={{ textAlign: "right", paddingLeft: "60px" }}>
            <h1
              style={{
                paddingRight: "87px",
                textAlign: "left",
                paddingBottom: "60px",
              }}
            >
              Your Profile
            </h1>

            <p>Name: {user?.forename}</p>
            <p>Surname: {user?.surname}</p>
            <p>Email: {user?.email}</p>
            <p>Username: {user?.username}</p>
            <p>Role: {user?.role}</p>
            <p>ETH balance: {balance}</p>
            <p>Wallet address: {address}</p>

            <Button variant = "primary" onClick={handleChange} style={{
                display: "flex",
                borderRadius: "7px",
                marginTop: "40px",
              }}
            >
              Edit Profile
            </Button>
          </Col>

          <Col
            style={{
              textAlign: "right",
              paddingRight: "100px",
              paddingTop: "30px",
            }}
          >
            <img
              src={`/images/${user?.photo}`}
              alt="user-propic"
              style={{
                height: "250px",
                width: "250px",
                border: "5px solid gray",
                borderRadius: "15px",
              }}
            />
          </Col>
        </Row>

        {showEditModal && (
          <Modal show onHide={handleChange} centered>
            <Modal.Header style={{ borderBottom: "2px solid gray" }}>
              <Container className="text-center">
                <Modal.Title>Edit Your Profile</Modal.Title>
              </Container>
            </Modal.Header>

            <Modal.Body>
              <Container>
                <Row>
                  <Col>
                    <Button href="/update-profile" className="w-100">
                      Update profile
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      href="/update-password"
                      className="w-100"
                      style={{ marginTop: "10px" }}
                    >
                      Update password
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      onClick={handleChange}
                      variant="outline-secondary"
                      className="w-100"
                      style={{ marginTop: "50px" }}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
          </Modal>
        )}
      </Container>
    </Container>
  );
};

export default UserProfile;
