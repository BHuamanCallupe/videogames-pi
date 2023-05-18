const InitialState = {
    videogames : []
};

const rootReducer = (state = InitialState, action) => {
    switch (action) {
        default:
            return {
                ...state
            }
    }
};

export default rootReducer;