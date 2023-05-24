import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchVideogames, setCurrentSearch } from '../../redux/actions';

const SearchBar = () => {
  const dispatch = useDispatch();

  const [inputSearch, setinputSearch] = useState({
    search: ""
  })

  const handlerInputSearch = (event) => {
    setinputSearch({ ...inputSearch, [event.target.name]: event.target.value })
  }

  const onSearch = (event) => {
    if (inputSearch.search !== "") {
      dispatch(searchVideogames(inputSearch.search))
      dispatch(setCurrentSearch(inputSearch.search))
    }
  }

  return (
    <div>
      <input type="text" placeholder="videogame name" id='search' onChange={handlerInputSearch} value={inputSearch.search} name='search' />
      <button onClick={onSearch}>Search</button>
    </div>
  )
}

export default SearchBar