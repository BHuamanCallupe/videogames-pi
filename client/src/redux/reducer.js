const InitialState = {
    videogames: [],
    currentError: "",
};

const rootReducer = (state = InitialState, action) => {
    switch (action.type) {
        case "GET_ALL_VIDEOGAMES": {
            return {
                ...state,
                videogames: [...state.videogames, ...action.payload.data],
            }
        }
        case "CLEAN_ALL_VIDEOGAMES": {
            return {
                ...state,
                videogames: [],
            }
        }
        default:
            return {
                ...state
            }
    }
};

export default rootReducer;