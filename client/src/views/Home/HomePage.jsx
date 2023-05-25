import React, { useEffect } from 'react'
import { Cards, Navbar } from '../../components'
import { getAllVideogames, getGenres } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

// if (!localStorage.getItem("currentPage")) {
//   console.log("xd");
//   localStorage.setItem("currentPage", "1");
// }

const HomePage = () => {

  const dispatch = useDispatch();
  const videogames = useSelector(state => state.allVideogames)
  const genres = useSelector(state => state.genres)

  const getVideogames = () => {
    dispatch(getAllVideogames());
  }
  const getAllGenres = () => {
    dispatch(getGenres())
  }

  // getAllGenres();
  // getVideogames();
  useEffect(() => {
    videogames.length === 0 && getVideogames();
    genres.length === 0 && getAllGenres();
  }, [])


  return (
    <div>
      <Navbar />
      <Cards />
    </div>
  )
}

export default HomePage