import axios from 'axios'
import { URL_GET_ALL_VIDEOGAMES, URL_SEARCH_VIDEOGAMES, URL_GET_GENRES } from "../consts"

export const getAllVideogames = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios(`${URL_GET_ALL_VIDEOGAMES}`);

            dispatch({
                type: "GET_ALL_VIDEOGAMES",
                payload: {
                    database: data.database,
                    api: data.api
                }
            })

        } catch (error) {
            console.log(error.response.data.error);
        }
    }
}

export const getVideogames = () => {
    return {
        type: "GET_VIDEOGAMES"
    }
}

export const clearVideogamesFiltered = () => {
    return {
        type: "CLEAN_VIDEOGAMES_FILTERED"
    }
}

export const searchVideogames = (text) => {
    return async (dispatch) => {
        try {
            // console.log(text);
            const { data } = await axios(`${URL_SEARCH_VIDEOGAMES}?search=${text}`);

            if (!data.message) {
                dispatch({
                    type: "SEARCH_VIDEOGAMES",
                    payload: {
                        results: [...data.database, ...data.api]
                    }
                })
            } else {
                dispatch({
                    type: "SET_ERROR",
                    payload: data.message
                })
            }
        } catch (error) {
            console.log(error.response.data.error);
        }
    }
}

export const setCurrentSearch = (search) => {
    return {
        type: "SET_CURRENT_SEARCH",
        payload: search
    }
}

export const getCurrentVideogame = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios(`${URL_GET_ALL_VIDEOGAMES}/${id}`);
            if (data.id) {
                dispatch({
                    type: "GET_CURRENT_VIDEOGAME",
                    payload: data
                })
            };
        } catch (error) {
            console.log(error.response.data.error);
        }
    }
}

export const clearCurrentVideogame = () => {
    return {
        type: "CLEAR_CURRENT_VIDEOGAME"
    }
}

export const getGenres = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios(`${URL_GET_GENRES}`);

            let genres = [];
            data.forEach(genre => {
                genres.push(genre.name)
            })

            dispatch({
                type: "GET_GENRES",
                payload: genres
            })

        } catch (error) {
            console.log(error.response.data.error);
        }
    }
}

export const filterVideogamesByOrder = (order) => {
    return {
        type: "ORDER",
        payload: order,
    };
};

export const filterVideogamesByRating = () => {
    return {
        type: "RATING",
    };
};


export const filterVideogamesByGenre = (genre) => {
    return {
        type: "FILTER_VIDEOGAMES_PER_GENRES",
        payload: genre
    }
}


export const filterVideogamesByDATABASE = () => {
    return {
        type: "FILTER_VIDEOGAMES_BY_DATABASE",
    }
}

export const filterVideogamesByAPI = () => {
    return {
        type: "FILTER_VIDEOGAMES_BY_API",
    }
}

export const setError = () => {
    return {
        type: "SET_ERROR"
    }
}



