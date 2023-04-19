import React, { useContext, useState } from "react";
import {Form, Button,Container, Row , Col, Alert, Modal,} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "api/auth/auth-api";
import * as blockchain from "context/Web3Context";
interface UserProfileData {
  _id: string;
  surname: string;
  forename: string;
  email: string;
  username: string;
  role: string;
  photo: string;
}

const UserProfile: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  const { connectMetaMaskWallet } = useContext(blockchain.Web3Context);

  const handleConnect = async () => {

    const ethAccount = await connectMetaMaskWallet(); // Invoke function to connect to the meta mask wallet account
    const currMetamaskAccount = ethAccount.currentAccount[0];

    if (ethAccount) {
      setBalance(parseFloat(ethAccount.convertedBalance));
      setAddress(currMetamaskAccount);
    }

    
  };

  handleConnect();

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
          photo: response.user.photo,
        };

        setUser(data);
      } 
      
      catch (error: any) {

        if (error) {
          setSuccess(null);
          setError(error.message);
        }

      }
    }
  };

  fetchUserId();

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

        <Row style = {{ paddingTop: "5px" }}>

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

            <Button variant="primary"
              onClick={handleChange}
              style={{
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
            <Modal.Body></Modal.Body>
          </Modal>
        )}

      </Container>
    </Container>


  );
};

export default UserProfile;
