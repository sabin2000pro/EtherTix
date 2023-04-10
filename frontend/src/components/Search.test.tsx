import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';
import "@testing-library/jest-dom";

describe('Search component', () => {

  const searchTerm = 'concert';
  
  const searchResults = [
    { path: '/concerts/1', name: 'Concert 1' },
    { path: '/concerts/2', name: 'Concert 2' },
    { path: '/festivals/1', name: 'Festival 1' },
  ];

  const handleSearch = jest.fn();

  it('renders the search results with the given search results', () => {

    render(

      <Search searchTerm={searchTerm} searchResults={searchResults} handleSearch={handleSearch} />
    );

    searchResults.forEach(result => {
      const linkElement = screen.getByText(result.name);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', result.path);
    });

  });

  it("Calls handlesaerch function when the search bar changes", () => {

    render(<Search searchTerm = {searchTerm} searchResults = {searchResults} handleSearch = {handleSearch} />)
    const newSearchTerm = "Drinks";

    fireEvent.change(screen.getByPlaceholderText("Search Events"), {
        target: {value: newSearchTerm}
    })

    expect(handleSearch).toHaveBeenCalled();

  })
});
