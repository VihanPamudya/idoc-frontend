import {roleActionTypes} from "../actionTypes/index";
import APIService from "../../utils/APIService";

export const getRolesList = () => async (dispatch: any) => {
  dispatch({ type: roleActionTypes.ROLE_DETAILS_GETTING_REQUEST });

    try {
        const res: any = await APIService({
            url: `/user-management/role-and-permission/list`,
            auth: true,
            method: 'GET',
        });

        dispatch({
            type: roleActionTypes.ROLE_DETAILS_GETTING_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: roleActionTypes.ROLE_DETAILS_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }
};


