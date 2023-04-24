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
  const navigate = useNavigate();

  const checkRole = () => {

    if (user.role === "Admin" || user.role === "Organiser") {
      return true;
    } 
    
    else {
      return false;
    }
  };

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
    <div>


      <NavDropdown title={user.username} id="dropdown-menu-right">


        <NavDropdown.Item
          style={{ color: "#04286b", fontWeight: "bold" }}
          href="/my-profile"
        >
          My profile
        </NavDropdown.Item>
        <NavDropdown.Item
          style={{ color: "#04286b", fontWeight: "bold" }}
          href="/my-events"
        >
          My events
        </NavDropdown.Item>

        <NavDropdown.Item
          style={{ color: "#04286b", fontWeight: "bold" }}
          href="/my-tickets"
        >
          My Booked Tickets
        </NavDropdown.Item>


        {checkRole() && (
          <NavDropdown.Item
            style={{ color: "#04286b", fontWeight: "bold" }}
            href="/admin-panel"
          >
            Admin panel
          </NavDropdown.Item>
        )}
        <NavDropdown.Divider style={{ border: "2px solid #04286b" }} />
        <NavDropdown.Item
          style={{ color: "#04286b", fontWeight: "bold" }}
          onClick={logOut}
        >
          Log out
        </NavDropdown.Item>


      </NavDropdown>
    </div>
  );
};

export default NavBarLoggedInView;
