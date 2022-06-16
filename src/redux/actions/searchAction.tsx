import { searchActionTypes } from "../actionTypes";
import APIService from "../../utils/APIService";

export const searchUserUsergroups = ( name: any) => async (dispatch: any) => {
    dispatch({type: searchActionTypes.USER_USERGROUP_SEARCH_REQUEST});

    try {
        const res: any = await APIService({
            url: `/search-management/user-user-group/list?searchValue=${name}`,
            auth: true,
            method: 'GET',
        });

        dispatch({
            type: searchActionTypes.USER_USERGROUP_SEARCH_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: searchActionTypes.USER_USERGROUP_SEARCH_FAILED,
            payload: err ? err.data : null
        });
    }
};
