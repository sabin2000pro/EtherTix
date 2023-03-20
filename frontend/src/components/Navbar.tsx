import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import { Link } from "react-router-dom";
import NavBarLoggedInView from "./NavBarLoggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import Search from "./Search";

interface NavBarProps {
  loggedInUser: User | null;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
}

const NavBar = ({
  
  loggedInUser,
  onSignUpClicked,
  onLoginClicked,
  onLogoutSuccessful,

}: NavBarProps) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<
    { name: string; path: string }[]
  >([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

    if (!searchTerm) {
      setSearchResults([]);
    }
  };

  return (

    <Navbar className = "navbar" expand="sm" sticky="top">

      <Navbar.Brand as = {Link} to="/">

        <img className="logo" height="89" width="270" src="/images/ethertix.png" alt="Ether Tix Logo"/>

      </Navbar.Brand>

      <Container>

          <Nav className="justify-content-center">

            <Search searchTerm={searchTerm as any} handleSearch={handleSearch as any} searchResults = {searchResults as any}/>
            
          </Nav>

          <Nav className="justify-content-right">

            {loggedInUser ? (
              
              <NavBarLoggedInView
                user={loggedInUser}
                onLogoutSuccessful={onLogoutSuccessful}
              />
            ) : (
              <NavBarLoggedOutView
                onLoginClicked={onLoginClicked}
                onSignUpClicked={onSignUpClicked}
              />
            )}
          </Nav>

      </Container>
    </Navbar>

    // <header>

    //     <nav className = "nav-container">

    //       <div className = "nav-left">
    //         <img className = "logo" height = "89" width = "270" src = '/images/ethertix.png' alt = "Ether Tix Logo"/>
    //       </div>

    //        <Search searchTerm = {searchTerm as any} handleSearch = {handleSearch as any} searchResults = {searchResults as any} />

    //       <ul className = "nav-list-items">
    //          <li><a className = "nav-item" href="/Cart">Cart</a></li>
    //          <li><a className = "nav-item" href ="/register">Register</a></li>

    //          <Dropdown />
    //       </ul>

    //     </nav>

    // </header>
  );
};

export default NavBar;
