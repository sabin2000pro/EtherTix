import React from 'react'

interface ISearchProps {
   searchTerm: any;
   handleSearch: () => void;
   searchResults: any
}

const Search: React.FC<ISearchProps> = ({searchTerm, handleSearch, searchResults}) => {
    
  return (
    <>

    <div className = "nav-centre">
            <input className = "search-bar" type = "text" placeholder="Search Events" value={searchTerm} onChange={handleSearch}/>
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