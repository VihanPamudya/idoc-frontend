import { authActionTypes } from "../actionTypes/index";
import produce from "immer";

const initialState = {
    userDetails: null,
};

const authData = produce(
    (state = initialState, action: { type: any; payload: any }) => {
        const { type, payload } = action;

        switch (type) {
            case authActionTypes.USER_LOGIN_SUCCEED: {
                state.userDetails = payload;
                return state;
            }
            case authActionTypes.USER_LOGIN_FAILED: {
                state.userDetails = null;
                return state;
            }

            case authActionTypes.USER_LOGOUT_SUCCEED: {
                state.userDetails = null;
                return state;
            }

            default: {
                return state;
            }
        }
    }
);

export default authData;
