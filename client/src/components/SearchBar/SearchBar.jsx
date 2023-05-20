import React from 'react'

const SearchBar = () => {

  const handlerSearch = () => {

  }

  return (
    <div>
        <label htmlFor='search'>Search: </label>
        <input type="text" placeholder="videogame name" id='search' onChange={handlerSearch}/>
    </div>
  )
}

export default SearchBar