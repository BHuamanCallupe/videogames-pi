import React from 'react'
import style from "./FormPage.module.css"

const FormPage = () => {


  return (
    <form className={style.form}>
      Name: <input type="text" placeholder="name" />
      Description: <input type="text" placeholder="description" />
      Released: <input type="date" placeholder="released" />
      Image: <input type="text" placeholder="image URL" />
      Rating: <input type="number" placeholder="rating" />
      Platforms: 
      <button type="submit">Create Videogame</button>
    </form>
  )
}

export default FormPage