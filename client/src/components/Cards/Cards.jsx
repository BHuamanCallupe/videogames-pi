import React, { useState } from 'react'
import { Card, Loader, Pagination } from '../../components'
import style from "./Cards.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { filterVideogamesByGenre, filterVideogamesByOrder, filterVideogamesByRating, filterVideogamesByDATABASE, filterVideogamesByAPI, setError, getVideogames } from '../../redux/actions';

const Cards = () => {
  const dispatch = useDispatch();
  const allVideogames = useSelector(state => state.allVideogames);
  const genres = useSelector(state => state.genres);
  const currentError = useSelector(state => state.currentError);
  const currentFilterGender = useSelector(state => state.currentFilterGender);
  const currentSearch = useSelector(state => state.currentSearch);
  const currentOrder = useSelector(state => state.currentOrder);
  const [aux, setaux] = useState(false);

  // Logica de Paginacion
  const totalVideogames = allVideogames.length;
  const [videogamesPerPage, setVideogamesPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * videogamesPerPage;
  const firstIndex = lastIndex - videogamesPerPage;
  //

  const handleOrder = (event) => {
    setaux(!aux); // forzamos renderizado
    dispatch(filterVideogamesByOrder(event.target.value));
  }

  const handleGenres = (event) => {
    const { value } = event.target;
    setaux(!aux); // forzamos renderizado
    dispatch(filterVideogamesByGenre(value))
  }

  const handlerByRating = () => {
    setaux(!aux);
    dispatch(filterVideogamesByRating());
  }

  const handlerByDATABASE = () => {
    setaux(!aux);
    dispatch(filterVideogamesByDATABASE());
  }

  const handlerByAPI = () => {
    setaux(!aux);
    dispatch(filterVideogamesByAPI());
  }

  const handlerError = () => {
    setaux(!aux);
    dispatch(setError())
    dispatch(getVideogames())
  }

  const handlerResetFilters = () => {
    setaux(!aux);
    dispatch(getVideogames())
  }

  return (
    <>
      {
        currentError
          ?
          <p>{currentError}&nbsp;<button onClick={handlerError}>Seguir buscando...</button></p>
          :
          currentSearch
            ?
            <Loader />
            :
            allVideogames.length === 0
              ?
              <Loader />
              :
              <>
                <select onChange={handleOrder} value={currentOrder}>
                  <option value={"E"} disabled>Estandar</option>
                  <option value={"A"}>Ascendente</option>
                  <option value={"D"}>Descendente</option>
                </select>
                <select onChange={handleGenres} value={currentFilterGender}>
                  <option value={"All"}>All genres</option>
                  {genres.map(genre => (
                    <option key={crypto.randomUUID()} value={genre}>{genre}</option>
                  ))}
                </select>
                <button onClick={handlerByRating}>By Rating</button>
                <button onClick={handlerByAPI}>API</button>
                <button onClick={handlerByDATABASE}>DATABASE</button>
                <button onClick={handlerResetFilters}>RESET FILTERS</button>
                <div className={style.cards}>
                  {allVideogames.map((videogame, i) => (
                    videogame &&
                    <Card
                      key={crypto.randomUUID()}
                      id={videogame.id}
                      name={videogame.name}
                      image={videogame.image}
                      platforms={videogame.platforms}
                      released={videogame.released}
                      rating={videogame.rating}
                      genres={videogame.genres}
                    />
                  )).slice(firstIndex, lastIndex)}
                </div>
                <Pagination
                  videogamesPerPage={videogamesPerPage}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalVideogames={totalVideogames}
                />
              </>
      }
    </>
  )
}

export default Cards
