import { logout } from "api/auth/auth-api";
import React from "react";
import { Button, NavDropdown, Nav } from "react-bootstrap";
import { User } from "../models/user";
import * as stor from "../auth/store";
import cookies from "auth/cookies";

interface NavBarLoggedInViewProps {
  user: User;
}

const NavBarLoggedInView = ({ user }: NavBarLoggedInViewProps) => {

  const logOut = async () => {

    stor.logout();
    cookies.remove(stor.COOKIE_NAME_USER);
    cookies.remove(stor.COOKIE_NAME_LOGGED_IN);
    cookies.remove(stor.COOKIE_NAME_TOKEN);

    try {
      await logout();
    }
    
    catch (error) {
      console.error(error);
      alert(error);
    }
    
    window.location.reload();
  };

  return (

    <Nav style={{ backgroundColor: "red" }}>

      <Button href="/my-cart" style={{ backgroundColor: "transparent", border: "none" }} >
        Cart
      </Button>

      <NavDropdown title = {user.username} id = "dropdown-menu-right">
        <NavDropdown.Item href="#Settings">Settings</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={logOut}>Log out</NavDropdown.Item>
      </NavDropdown>
    </Nav>


  );
};

export default NavBarLoggedInView;
