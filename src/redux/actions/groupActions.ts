import {groupActionTypes} from "../actionTypes/index";
import APIService from "../../utils/APIService";

export const getGroupList = () => async (dispatch: any) => {
    dispatch({type: groupActionTypes.GROUP_DETAILS_GETTING_REQUEST});

    try {
        const res: any = await APIService({
            url: `/group-management/group/list`,
            auth: true,
            method: 'GET',
        });

        dispatch({
            type: groupActionTypes.GROUP_DETAILS_GETTING_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: groupActionTypes.GROUP_DETAILS_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }
};


