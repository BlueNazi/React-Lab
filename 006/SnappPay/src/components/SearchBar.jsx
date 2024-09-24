import React from 'react';

const SearchBar = ({ setSearchQuery }) => {
  return (
    <input 
    className='search'
      type="text" 
      placeholder="Search by name or phone..." 
      onChange={(e) => setSearchQuery(e.target.value)} 
    />
  );
};

export default SearchBar;
