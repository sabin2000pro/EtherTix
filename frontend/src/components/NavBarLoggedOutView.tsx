import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOutView = ({ onSignUpClicked, onLoginClicked }: NavBarLoggedOutViewProps) => {
    const navigate = useNavigate();
    const goToCart = (type: any) => navigate("/Cart");
    return (
        <>
            <Button onClick={goToCart}>Cart</Button>
            <Button onClick={onSignUpClicked}>Register</Button>
            <Button onClick={onLoginClicked}>Log In</Button>
        </>
    );
}

export default NavBarLoggedOutView;