import {packageActionTypes} from "../actionTypes/index";
import APIService from "../../utils/APIService";

export const getPackageList = () => async (dispatch: any) => {
    dispatch({ type: packageActionTypes.PACKAGE_DETAILS_GETTING_REQUEST });

    try {
        const res: any = await APIService({
            url: `/system-configuration/package/list`,
            auth: true,
            method: 'GET',
        });

        dispatch({
            type: packageActionTypes.PACKAGE_DETAILS_GETTING_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: packageActionTypes.PACKAGE_DETAILS_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }
};

