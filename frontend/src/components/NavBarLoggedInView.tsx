import React from "react";
import { Button, Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import { User } from "../models/user";
import { logout } from "../api/auth/auth-api";

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedInView = ({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) => {

    async function logOut() {
        try {
            await logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <>
        {/* <Navbar bg="light" expand="lg">
      <Container> */}
        {/* <Navbar.Brand href="/Cart">Cart</Navbar.Brand> */}
        <Button variant="link" href="/Cart">Cart</Button>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title={user.username} id="dropdown-menu-right">
              <NavDropdown.Item href="#Settings">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">
                Action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logOut}>
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      {/* </Container>
    </Navbar> */}


            {/* <Navbar.Text className="me-2">
                Signed in as: {user.username}
            </Navbar.Text>
            <Button onClick={logOut}>Log out</Button> */}
        </>
    );
}

export default NavBarLoggedInView;