import React, { useState } from "react";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import { Link } from "react-router-dom";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { CartItem } from "models/cart";

interface NavBarProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

const NavBar = ({ onSignUpClicked, onLoginClicked }: NavBarProps) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<{ name: string; path: string }[]>([]);

  const {user} = useSelector((state: any) => state.auth.user as User);
  let isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);

  const cart: CartItem[] = useSelector((state: any) => state.cart);

  console.log(`Cart : `, cart);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    if (!searchTerm) {
      setSearchResults([]);
    }

  };

  return (

    <Navbar className="navbar" expand="sm" sticky="top">

      <Navbar.Brand as = {Link} to="/">

        <img className = "logo" height="69" width="240" src="/images/ethertix.png" alt = "Ether Tix Logo" />

      </Navbar.Brand>

      <Container>

        <Nav className="justify-content-center">

          <Search
            searchTerm={searchTerm as any}
            handleSearch={handleSearch as any}
            searchResults={searchResults as any}
          />
        </Nav>

        <Nav className="justify-content-right">
          
          <ul>
            <li style={{ display: "inline-flex" }}>


              {isLoggedIn ? (
                <NavBarLoggedInView user= {user} />
              ) : (
                <NavBarLoggedOutView
                  onLoginClicked={onLoginClicked}
                  onSignUpClicked={onSignUpClicked}
                />
              )}

            </li>
            <li style={{ display: "inline-flex" }}>
              <Button
                href="/events"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                Events 
              </Button>
              <Button
                href="/my-cart"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                Cart <Badge bg="danger">{cart.length as unknown as string}</Badge>
              </Button>
            </li>
          </ul>
        </Nav>

      </Container>
    </Navbar>
  );
};

export default NavBar;
