import React, { useEffect, useState } from 'react'
import style from "./FormPage.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, postVideogames } from '../../redux/actions';
import { validate_form } from '../../hooks/useValidateForm';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const FormPage = () => {
  const genres = useSelector(state => state.genres);
  const dispatch = useDispatch();

  const [videogamesData, setVideogamesData] = useState({
    videogameName: "",
    image: "",
    description: "",
    platforms: "",
    released: "",
    rating: "",
    genres: "",
  })
  const [errors, seterrors] = useState({
    videogameName: "",
    image: "",
    description: "",
    platforms: "",
    released: "",
    rating: "",
    genres: "",
  })
  const [platforms, setplatforms] = useState([])
  const [genresForm, setGenresForm] = useState([])

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (event.target.name === "genres") {
      addGenre(event.target.value)
    }
    // console.log(name);
    // console.log(value);
    setVideogamesData({ ...videogamesData, [name]: value });
  }

  const handlerBlur = (event) => {
    const { name, value } = event.target;
    console.log(value);
    validate_form({ ...videogamesData, [name]: value }, errors, seterrors, event.target);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // videogameName
    if (!(/^[a-zA-Z0-9 ]+$/.test(videogamesData.videogameName)) || videogamesData.videogameName.length > 100) {
      seterrors({ ...errors, videogameName: "Invalid Name. Must have only letters and a length of less than 100." });
      return;
    } else {
      seterrors({ ...errors, videogameName: "" });
    }
    // description
    if (!videogamesData.description) {
      seterrors({ ...errors, description: "Invalid Description. Must enter at least a brief description." });
      return;
    } else {
      seterrors({ ...errors, description: "" });
    }
    // released
    if (!videogamesData.released || !isNaN(Number(videogamesData.released))) {
      seterrors({ ...errors, released: "Invalid Released. Must enter the video game released." });
      return;
    } else {
      seterrors({ ...errors, released: "" });
    }
    // image
    if (!videogamesData.image || !isNaN(Number(videogamesData.image))) {
      seterrors({ ...errors, image: "Invalid Image. Must enter the video game image URL." });
      return;
    } else {
      seterrors({ ...errors, image: "" });
    }
    // rating
    if ((videogamesData.rating <= 5) && (videogamesData.rating > 0) && !(isNaN(Number(videogamesData.rating)))) {
      seterrors({ ...errors, rating: "" });
    } else {
      seterrors({ ...errors, rating: "Invalid Rating. Must be a positive number greater than 1 and less than 5." });
      return;
    }
    // platforms
    if (platforms.length === 0) {
      seterrors({ ...errors, platforms: "Must introduce at least one platform." })
      return;
    }
    // genres
    if (genresForm.length === 0) {
      seterrors({ ...errors, genres: "Must select at least one genre." })
      return;
    }

    let formHasErrors = false;
    for (const key in videogamesData) {
      if (key !== "platforms" && key !== "genres") {
        if (!videogamesData[key]) formHasErrors = true;
      }
    }

    for (const key in errors) {
      if (key !== "platforms" && key !== "genres") {
        if (errors[key]) formHasErrors = true;
      }
    }

    if (!formHasErrors) {
      let videogameSendData = {
        name: videogamesData.videogameName,
        description: videogamesData.description,
        platforms: platforms,
        image: videogamesData.image,
        released: videogamesData.released,
        rating: Number(videogamesData.rating),
        genres: genresForm
      }
      console.log(videogameSendData);
      dispatch(postVideogames(videogameSendData))
    }
  }

  const addPLatform = (event) => {
    event.preventDefault();
    if (!platforms.find(platform => platform === videogamesData.platforms) && videogamesData.platforms) {
      seterrors({ ...errors, platforms: "" });
      setplatforms([...platforms, videogamesData.platforms]);
    } else if (!videogamesData.platforms) {
      seterrors({ ...errors, platforms: "Must enter the name of at least one platform." });
    } else {
      seterrors({ ...errors, platforms: "This platform is already in the list." });
    }
  }

  const removePLatform = (event) => {
    event.preventDefault();
    setplatforms([...platforms.filter(platform => platform !== videogamesData.platforms)])
  }

  const addGenre = (genre) => {
    if (!genresForm.find(platform => platform === genre)) {
      setGenresForm([...genresForm, genre]);
    } else {
      seterrors({ ...errors, genres: "This genre is already in the list." });
    }
  }

  const removeGenre = (event) => {
    // console.log(event.target.attributes[1].nodeValue);
    const { nodeValue } = event.target.attributes[1];
    setGenresForm([...genresForm.filter(genre => genre !== nodeValue)])
  }

  useEffect(() => {
    genres.length === 0 && dispatch(getGenres())
  }, [])

  return (
    <>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.fieldContainer}>
          <label htmlFor='videogameName'>Name:&nbsp;</label>
          <input type="text" placeholder="videogameName" name='videogameName' value={videogamesData.videogameName} onChange={handleChange} onBlur={handlerBlur} />
          <span>{errors.videogameName}</span>
        </div>
        <div className={style.fieldContainer}>
          <label htmlFor='description'>Description:&nbsp;</label>
          <textarea name='description' placeholder='write videogame description' value={videogamesData.description} onChange={handleChange} onBlur={handlerBlur}></textarea>
          <span>{errors.description}</span>
        </div>
        <div className={style.fieldContainer}>
          <label htmlFor='released'>Released:&nbsp;</label>
          <input type="date" placeholder="released" name='released' value={videogamesData.released} onChange={handleChange} onBlur={handlerBlur} />
          <span>{errors.released}</span>
        </div>
        <div className={style.fieldContainer}>
          <label htmlFor='image'>Image:&nbsp;</label>
          <input type="text" placeholder="image URL" name='image' value={videogamesData.image} onChange={handleChange} onBlur={handlerBlur} />
          <span>{errors.image}</span>
        </div>
        <div className={style.fieldContainer}>
          <label htmlFor='rating'>Rating:&nbsp;</label>
          <input type="text" placeholder="rating" name='rating' value={videogamesData.rating} onChange={handleChange} onBlur={handlerBlur} />
          <span>{errors.rating}</span>
        </div>
        <div className={style.fieldContainer}>
          <label htmlFor='platforms'>Platforms:&nbsp;</label>
          <input type="text" placeholder="platform name" name='platforms' value={videogamesData.platforms} onChange={handleChange} onBlur={handlerBlur} />
          <span className={style.add} onClick={addPLatform}>&#x2b;</span>
          <span>&nbsp;{errors.platforms}</span>
        </div>
        <div>
          {
            platforms.map((platform, index) => (
              <span key={crypto.randomUUID()}>{platform}&nbsp;<span className={style.remove} onClick={removePLatform}>&#x2d;</span>&nbsp;</span>
            ))
          }
        </div>
        <div className={style.fieldContainer}>
          <label htmlFor='genres'>Genres:&nbsp;</label>
          <select value={videogamesData.genres || "select genres"} onChange={handleChange} name='genres' onBlur={handlerBlur}>
            <option disabled value={"select genres"}>select genres</option>
            {genres.map(genre => (
              <option key={crypto.randomUUID()} value={genre}>{genre}</option>
            ))}
          </select>
          <span>{errors.genres}</span>
        </div>
        <div>
          {
            genresForm.map((genre, index) => (
              <span key={crypto.randomUUID()}>{genre}&nbsp;<span className={style.remove} onClick={removeGenre} name={genre}>&#x2d;</span>&nbsp;</span>
            ))
          }
        </div>
        <button type="submit">Create Videogame</button>
      </form>
      <Link to={`/home`}>Back</Link>
    </>
  )
}

export default FormPage