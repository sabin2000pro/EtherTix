import React from "react";
import { Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOutView = ({ onSignUpClicked, onLoginClicked }: NavBarLoggedOutViewProps) => {
    const navigate = useNavigate();
    const goToCart = () => navigate("/my-cart");
    return (
        <Nav>
            <Button onClick={goToCart} style={{backgroundColor: "transparent", border:"none"}}>Cart</Button>
            <Button onClick={onSignUpClicked} style={{backgroundColor: "transparent", border:"none"}}>Register</Button>
            <Button onClick={onLoginClicked} style={{backgroundColor: "transparent", border:"none"}}>Log In</Button>
        </Nav>
    );
}

export default NavBarLoggedOutView;