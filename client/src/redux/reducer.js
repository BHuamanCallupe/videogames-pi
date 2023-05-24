const InitialState = {
    videogamesAPI: [],
    videogamesDB: [],
    allVideogames: [],
    genres: [],
    currentOrder: "E",
    currentSearch: "",
    currentVideogame: null,
    currentFilterGender: "All",
    currentError: ""
};

const rootReducer = (state = InitialState, action) => {
    switch (action.type) {
        case "GET_ALL_VIDEOGAMES": {
            return {
                ...state,
                videogamesDB: [...action.payload.database],
                videogamesAPI: [...action.payload.api],
                allVideogames: [...action.payload.database, ...action.payload.api],
            }
        }
        case "GET_VIDEOGAMES": {
            return {
                ...state,
                allVideogames: [...state.videogamesDB, ...state.videogamesAPI],
                currentSearch: "",
                currentFilterGender: "All",
                currentOrder: "E",
            }
        }
        case "CLEAN_VIDEOGAMES_FILTERED": {
            return {
                ...state,
                videogamesFiltered: [],
            }
        }
        case "SEARCH_VIDEOGAMES": {
            return {
                ...state,
                allVideogames: [...action.payload.results],
                currentSearch: "",
            }
        }
        case "SET_CURRENT_SEARCH": {
            return {
                ...state,
                currentSearch: action.payload,
            }
        }
        case "GET_CURRENT_VIDEOGAME": {
            return {
                ...state,
                currentVideogame: action.payload,
            }
        }
        case "CLEAR_CURRENT_VIDEOGAME": {
            return {
                ...state,
                currentVideogame: null
            }
        }
        case "GET_GENRES": {
            return {
                ...state,
                genres: [...action.payload],
            }
        }
        case "SET_ERROR": {
            return {
                ...state,
                currentError: action.payload || "",
                currentSearch: "",
            }
        }
        case "ORDER": {
            if (action.payload === "A") {
                return {
                    ...state,
                    allVideogames: [...state.allVideogames].sort(function (a, b) {
                        if (a.name < b.name) { return -1; }
                        if (a.name > b.name) { return 1; }
                        return 0;
                    }),
                    currentOrder: "A"
                }
            } else if (action.payload === "D") {
                return {
                    ...state,
                    allVideogames: [...[...state.allVideogames].sort(function (a, b) {
                        if (a.name < b.name) { return -1; }
                        if (a.name > b.name) { return 1; }
                        return 0;
                    })].reverse(),
                    currentOrder: "D"
                }
            } else {
                return {
                    ...state,
                    allVideogames: [...state.videogamesDB, ...state.videogamesAPI],
                    currentOrder: "E"
                }
            }
        }
        case "RATING": {
            return {
                ...state,
                allVideogames: [...state.allVideogames].sort((a, b) => b.rating - a.rating)
            }
        }
        case "FILTER_VIDEOGAMES_PER_GENRES": {
            if (action.payload === "All" || action.payload === "") {
                return {
                    ...state,
                    allVideogames: [...state.videogamesDB, ...state.videogamesAPI],
                    currentFilterGender: "All"
                }
            } else {
                let array = [...state.allVideogames].filter((videogame, i) => {
                    if (videogame) {
                        if (videogame.genres.find(genre => genre === action.payload)) {
                            return videogame;
                        }
                    }
                })
                if (array.length === 0) {
                    return {
                        ...state,
                        currentError: "No se encontraron resultados con esta busqueda.",
                        currentFilterGender: "All"
                    }
                } else {
                    return {
                        ...state,
                        allVideogames: [...array],
                        currentFilterGender: action.payload
                    }
                }
            }
        }
        case "FILTER_VIDEOGAMES_BY_DATABASE": {
            return {
                ...state,
                allVideogames: [...state.videogamesDB],
            }
        }
        case "FILTER_VIDEOGAMES_BY_API": {
            return {
                ...state,
                allVideogames: [...state.videogamesAPI],
            }
        }
        default:
            return {
                ...state
            }
    }
};

export default rootReducer;