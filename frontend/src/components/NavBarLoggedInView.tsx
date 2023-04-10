import { logout } from "api/auth/auth-api";
import React from "react";
import { NavDropdown } from "react-bootstrap";
import { User } from "../models/user";
import * as stor from "../auth/store";
import cookies from "auth/cookies";
import { useNavigate } from "react-router-dom";

interface NavBarLoggedInViewProps {
  user: User;
}

const NavBarLoggedInView = ({ user }: NavBarLoggedInViewProps) => {
  const navigate = useNavigate()

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
    
    navigate("/");
    window.location.reload();
  };

  return (

    <div style={{ backgroundColor: "red", fontWeight: "bold" }}>

      <NavDropdown title={user.username} id="dropdown-menu-right">

        <NavDropdown.Item href = "/my-profile">Profile</NavDropdown.Item>
        <NavDropdown.Item href = "/my-tickets">Tickets</NavDropdown.Item>
        <NavDropdown.Item href = "/my-events">Events</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick = {logOut}>Log out</NavDropdown.Item>
      </NavDropdown>


    </div>
  );
};

export default NavBarLoggedInView;
