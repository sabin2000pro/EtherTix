import React from "react";
import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLoggedOutView = ({ onSignUpClicked, onLoginClicked}: NavBarLoggedOutViewProps) => {

  return (
   
    <>

      <Button onClick={onSignUpClicked} style={{ backgroundColor: "transparent", border: "none" }} >
        Register
      </Button>

    
      <Button
        onClick={onLoginClicked}
        style={{ backgroundColor: "transparent", border: "none" }}
      >
        Log In
      </Button>


    </>
  );
};

export default NavBarLoggedOutView;
