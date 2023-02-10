import React, { useState } from 'react';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Cart', path: '/cart' },
  { name: 'Register', path: '/register' },
  { name: 'Log In', path: '/login' },
  { name: 'Forgot Password', path: '/forgot-password' },
  { name: 'Update Profile', path: '/update-profile' },
];

<<<<<<< HEAD
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{ name: string, path: string }[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  if (!searchTerm) {
    setSearchResults([]);
  } else {
    setSearchResults(
      pages.filter(page => page.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }
};
=======
const Navbar = () => { // Navigation Bar Component
>>>>>>> 01faa316f8c22572c75e17107ff1bf45f7787290

  return (

    <header>

        <nav className = "nav-container">

          <div className = "nav-left">
              Ether Tix
          </div>

          <ul className = "nav-list-items">
            <li><a className = "nav-item" href="/cart">Cart</a></li>
            <li><a className = "nav-item" href ="/register">Register</a></li>
            <li><input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch}/></li>
          </ul>
        </nav>

        {searchTerm.length > 0 && (
          <ul className = "search-results">
            {searchResults.map(result => (
              <li key={result.path}><a className="search-results" href={result.path}>{result.name}</a></li> ))}
          </ul>
        )}

    </header>
    )
  };

export default Navbar;
