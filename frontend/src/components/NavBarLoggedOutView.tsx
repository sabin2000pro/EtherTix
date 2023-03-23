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
            <Button onClick={goToCart} style={{backgroundColor: "transparent", border:"none"}}>Cart</Button>
            <Button onClick={onSignUpClicked} style={{backgroundColor: "transparent", border:"none"}}>Register</Button>
            <Button onClick={onLoginClicked} style={{backgroundColor: "transparent", border:"none"}}>Log In</Button>
        </>
    );
}

export default NavBarLoggedOutView;