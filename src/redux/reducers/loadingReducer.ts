import produce from "immer";

const ERROR_MSG = "You don't have permission to execute current action"

const initialState = {
    loading: false,
    error: null,
    denied: false,
};

const loadingState = {
    loading: true,
    error: null,
    denied: false,
}

const successState = {
    loading: false,
    error: null,
    denied: false,
}

const loadingData = produce(
    (state = initialState, action) => {
        const { type, payload } = action;

        if(type.includes('SEARCH_REQUEST')){
            state.error = null;
            state.denied = false;
            return state;
        } else if(type.includes('REQUEST')){
            state = loadingState;
            return state;
        } else if (type.includes('SUCCEED')){
            state = successState;
            return state;
        } else if (type.includes('FAILED') && typeof payload === 'string' && payload.includes(ERROR_MSG)){
            state.loading = false;
            state.error = payload;
            state.denied = true;
            return state;
        } else if (type.includes('FAILED')){
            state.loading = false;
            state.error = payload;
            state.denied = false;
            return state;
        } else {
            return state;
        }
    }
);

export default loadingData;
