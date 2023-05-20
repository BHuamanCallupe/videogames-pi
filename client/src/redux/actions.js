import axios from 'axios'
import { URL_GET_ALL_VIDEOGAMES } from "../consts"

export const getAllVideogames = (page) => {
    return async (dispatch) => {
        try {
            const { data } = await axios(`${URL_GET_ALL_VIDEOGAMES}?page=${page}`);
            if (Array.isArray(data)) {
                dispatch({
                    type: "GET_ALL_VIDEOGAMES",
                    payload: {
                        data: data
                    }
                })
            }
        } catch (error) {
            console.log(error.response.data.error);
        }
    }
}

export const clearAllVideogames = () => {
    return {
        type: "CLEAN_ALL_VIDEOGAMES"
    }
}