import React from 'react'
import { CiSearch } from 'react-icons/ci';

export interface ISearchProps {
   searchTerm: any;
   handleSearch: () => void;
   searchResults: any
}

const Search: React.FC<ISearchProps> = ({searchTerm, handleSearch, searchResults}) => {
    
  return (

    <>

    
    <div className = "nav-centre">


      <CiSearch className ="search-icon"/> 
     <input className = "search-bar" type = "text" placeholder = "Search Events" value={searchTerm} onChange={handleSearch}/>

    </div>

    {searchTerm.length > 0 && (

      <ul className = "search-results">

        {searchResults.map((result: any) => (

          <li key={result.path}>
            
            <a className="search-results" href={result.path}>{result.name}</a>
            
            </li> 
            
            ))}


      </ul>
)}
</>
  )
}

export default Search