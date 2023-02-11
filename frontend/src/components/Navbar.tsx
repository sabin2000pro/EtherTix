import React, { useState } from 'react';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Cart', path: '/cart' },
  { name: 'Register', path: '/register' },
  { name: 'Log In', path: '/login' },
  { name: 'Update Profile', path: '/update-profile' },
];

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<{ name: string, path: string }[]>([]);

  const configureSearchResults = () => {
    setSearchResults(pages.filter(page => page.name.toLowerCase().includes(searchTerm.toLowerCase() )));
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);

  if (!searchTerm) {
     setSearchResults([]);
  } 
  
  else {

      configureSearchResults();
    
  }

};

  return (

    <header>

        <nav className = "nav-container">

          <div className = "nav-left">
            <div className ="nav-header">Ether Tix</div>
          </div>

          <div className = "nav-centre">
            <input className = "search-bar" type = "text" placeholder="Search Events" value={searchTerm} onChange={handleSearch}/>
          </div>

          <ul className = "nav-list-items">
             <li><a className = "nav-item" href="/cart">Cart</a></li>
             <li><a className = "nav-item" href ="/register">Register</a></li>
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
