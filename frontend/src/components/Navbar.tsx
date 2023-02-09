import React from 'react';

const Navbar = () => {
  return (
    <header>
        <nav className = "nav-container">
        <ul className = "nav-list-items">
            <li><a className = "nav-item" href="#">Home</a></li>
            <li><a className = "nav-item" href="#">Cart</a></li>
            <li><a className = "nav-item" href="#">Register</a></li>
        </ul>
        </nav>
    </header>
  );
};

export default Navbar;
