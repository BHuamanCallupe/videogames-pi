require('dotenv').config();
const axios = require('axios');
const {
    URL, API_KEY
} = process.env;

// videogames
const getVideogamesAPI = async (URL_ = `${URL}/games?key=${API_KEY}`, array = [], page = 1) => {
    if (page == 5) {
        let { data } = await axios.get(URL_);
        array.push(data.results)
        let results = [];
        array.forEach((element, index) => {
            element.forEach((element, index) => {
                results.push(element)
            })
        });
        return results;
    }
    let { data } = await axios.get(URL_);
    array.push(data.results)
    return getVideogamesAPI(data.next, array, ++page)
}

const getVideogamesAPIbyID = async (id) => {
    return await axios.get(`${URL}/games/${id}?key=${API_KEY}`)
        .then(response => response.data)
        .catch(error => error)
}

const getVideogamesAPIbyName = async (game, URL_ = `${URL}/games`, array = [], page = 1) => {
    if (!URL_.includes("page")) {
        let { data } = await axios.get(`${URL_}?search=${game}&key=${API_KEY}`);
        if (data.results.length === 0) {
            return array;
        } else if (data.next) {
            array.push(data.results)
            return getVideogamesAPIbyName(game, data.next, array, ++page)
        } else {
            array.push(data.results)
            let results = [];
            array.forEach((element, index) => {
                element.forEach((element, index) => {
                    results.push(element)
                })
            });
            return results;
        }
    } else {
        let { data } = await axios.get(`${URL_}`);
        if (data.next) {
            if (page < 5) {
                array.push(data.results)
                return getVideogamesAPIbyName(game, data.next, array, ++page)
            }
            array.push(data.results)
            let results = [];
            array.forEach((element, index) => {
                element.forEach((element, index) => {
                    results.push(element)
                })
            });
            return results;
        } else {
            array.push(data.results)
            let results = [];
            array.forEach((element, index) => {
                element.forEach((element, index) => {
                    results.push(element)
                })
            });
            return results;
        }
    }

    if (data.results.length === 0) {
        return array;
    } else if (data.next) {
        if (page == 5) {
            array.push(data.results)
            let results = [];
            array.forEach((element, index) => {
                element.forEach((element, index) => {
                    results.push(element)
                })
            });
            return results;
        }
        array.push(data.results)
        return getVideogamesAPIbyName(game, data.next, array, ++page)
    } else {
        array.push(data.results)
        let results = [];
        array.forEach((element, index) => {
            element.forEach((element, index) => {
                results.push(element)
            })
        });
        return results;
    }
    // console.log(data);
    // if (page == 5) {
    //     let { data } = await axios.get(URL_);
    //     array.push(data.results)
    //     let results = [];
    //     array.forEach((element, index) => {
    //         element.forEach((element, index) => {
    //             results.push(element)
    //         })
    //     });
    //     return results;
    // }
    // let { data } = await axios.get(URL_);
    // array.push(data.results)
    // return getVideogamesAPI(data.next, array, ++page)
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