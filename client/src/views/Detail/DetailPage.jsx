import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { clearCurrentVideogame, getCurrentVideogame } from '../../redux/actions';
import { Loader } from '../../components';
import style from "./DetailPage.module.css"

const DetailPage = () => {
  const { id } = useParams();

  const currentVideogame = useSelector(state => state.currentVideogame);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentVideogame(id))

    return () => {
      dispatch(clearCurrentVideogame())
    }
  }, [id])


  return (
    <div>
      {
        !currentVideogame ? <Loader /> : <>
          <div className={style.card}>
            <h1>{currentVideogame.name}</h1>
            <p>ID: {currentVideogame.id}</p>
            <figure>
              <img src={currentVideogame.image} alt={currentVideogame.name} />
            </figure>
            <p>{currentVideogame.description}</p>
            <p>Released: {currentVideogame.released}</p>
            Platforms: {currentVideogame.platforms.map((platform, i) => {
              if (i === currentVideogame.platforms.length - 1) {
                return <span key={crypto.randomUUID()}>{platform}</span>
              }
              return <span key={crypto.randomUUID()}>{platform},&nbsp;</span>
            })}
            Genres: {currentVideogame.genres.map((genre, i) => {
              if (i === currentVideogame.genres.length - 1) {
                return <span key={i}>{genre}</span>
              }
              return <span key={i}>{genre},&nbsp;</span>
            })}
            <p>Rating: {currentVideogame.rating}</p>
            <Link to={`/home`} >Back</Link>
          </div>
        </>
      }
    </div>
  )
}

export default DetailPage