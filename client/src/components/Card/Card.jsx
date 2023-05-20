import React from 'react'
import style from "./Card.module.css"

const Card = ({ id, name, image, platforms, released, rating, genres }) => {
  return (
    <div className={style.card}>
      <p>{name}</p>
      <figure>
        <img src={image} alt={name}/>
      </figure>
      {genres.map( (genre,i) => {
        return <p key={i}>{genre}</p>
      })}
    </div>
  )
}

export default Card