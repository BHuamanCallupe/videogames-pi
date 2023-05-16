require('dotenv').config();
const axios = require('axios');
const {
    URL, API_KEY
} = process.env;

// videogames
const getVideogamesAPI = async () => {
    return await axios.get(`${URL}/games?key=${API_KEY}`)
        .then(response => response.data.results)
        .catch(error => error)
}

const getVideogamesAPIbyID = async (id) => {
    return await axios.get(`${URL}/games/${id}?key=${API_KEY}`)
        .then(response => response.data)
        .catch(error => error)
}

const getVideogamesAPIbyName = async (game) => {
    return await axios.get(`${URL}/games?search=${game}&&key=${API_KEY}`)
        .then(response => response.data.results)
        .catch(error => error)
}

// genres
const getGenresAPI = async () => {
    return await axios.get(`${URL}/genres?key=${API_KEY}`)
        .then(response => response.data.results)
        .catch(error => error)
}

module.exports = {
    getVideogamesAPI,
    getGenresAPI,
    getVideogamesAPIbyID,
    getVideogamesAPIbyName
}