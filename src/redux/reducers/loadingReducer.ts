import produce from "immer";

const initialState = {
    loading: false,
    error: null
};

const loadingState = {
    loading: true,
    error: null,
}

const successState = {
    loading: false,
    error: null
}

const loadingData = produce(
    (state = initialState, action) => {
        const { type, payload } = action;

        if(type.includes('REQUEST')){
            state = loadingState;
            return state;
        } else if (type.includes('SUCCEED')){
            state = successState;
            return state;
        } else if (type.includes('FAILED')){
            state.loading = false;
            state.error = payload;
            return state;
        } else {
            return state;
        }
    }
);

export default loadingData;
