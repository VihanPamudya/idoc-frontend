import {authActionTypes} from "../actionTypes/index";
import {parseJwt} from "../../utils/jwtReader";
import APIService from "../../utils/APIService";

export const userLogin = (loginData: any) => async (dispatch: any) => {
    dispatch({type: authActionTypes.USER_LOGIN_REQUEST});

    try {
        const res: any = await APIService({
            url: `/auth/login`,
            auth: true,
            method: 'POST',
            data: loginData
        });

        dispatch({
            type: authActionTypes.USER_LOGIN_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: authActionTypes.USER_LOGIN_FAILED,
            payload: err ? err.data : null
        });
    }
};

export const sendForgotPasswordLink = (email: string) => async (dispatch: any) => {
    dispatch({type: authActionTypes.USER_FORGOT_PASSWORD_REQUEST});

    try {
        const res: any = await APIService({
            url: `/auth/reset-password/${email}`,
            auth: true,
            method: 'POST',
        });

        location.replace('/')
        dispatch({
            type: authActionTypes.USER_FORGOT_PASSWORD_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: authActionTypes.USER_FORGOT_PASSWORD_FAILED,
            payload: err ? err.data : null
        });
    }
};

export const userLogout = () => async (dispatch: any) => {
    dispatch({type: authActionTypes.USER_LOGOUT_REQUEST});

    let userObj = parseJwt(localStorage.getItem('token'))

    try {
        const res: any = await APIService({
            url: `/auth/logout/${userObj.sub}`,
            auth: true,
            method: 'PUT',
        });

        localStorage.removeItem('token')
        location.reload()
        dispatch({
            type: authActionTypes.USER_LOGOUT_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: authActionTypes.USER_LOGOUT_FAILED,
            payload: err ? err.data : null
        });
    }

};
