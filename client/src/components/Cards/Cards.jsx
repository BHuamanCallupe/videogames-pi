import React from 'react'
import {Card} from '../../components'
import style from "./Cards.module.css"

const Cards = ({ videogames }) => {
  return (
    <div className={style.cards}>
      {videogames.map((videogame, id) => {
        return <Card 
          key={id}
          id={id}
          name={videogame.name}
          image={videogame.image}
          platforms={videogame.platforms}
          released={videogame.released}
          rating={videogame.rating}
          genres={videogame.genres}
        />
      })}
    </div>
  )
}

export default Cards

// export default function lazyCards () {

// }