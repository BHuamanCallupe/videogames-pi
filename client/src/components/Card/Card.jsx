import React from 'react'
import style from "./Card.module.css"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Card = ({ id, name, image, platforms, released, rating, genres }) => {
  if(image){
    return (
      <div className={style.card}>
        <Link to={`/detail/${id}`} >{name}</Link>
        <figure>
          <img src={image} alt={name} />
        </figure>
        Genres: {genres.map((genre, i) => {
          if (i === genres.length - 1) {
            return <span key={crypto.randomUUID()}>{genre}</span>
          }
          return <span key={crypto.randomUUID()}>{genre},&nbsp;</span>
        })}
      </div>
    )
  }
}

export default Card