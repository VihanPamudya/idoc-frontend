import {userActionTypes} from "../actionTypes/index";
import { data } from "../../sampleData/data";
import APIService from "../../utils/APIService";

export const addUser = (data: any) => async (dispatch: any) => {
  dispatch({ type: userActionTypes.USER_ADD_REQUEST });

    try {
        const res: any = await APIService({
            url: `/user-management/user/add`,
            auth: true,
            method: 'POST',
            data: data,
        });

        dispatch(
            getPaginatedList({
                descending: false,
                limit: 5,
                orderFields: ["epf_number"],
            })
        );

        return true;

    } catch (err: any) {
        dispatch({
            type: userActionTypes.USER_ADD_FAILED,
            payload: err ? err.data : null
        });
    }
};

export const updateUser = (data: any) => async (dispatch: any) => {
  dispatch({ type: userActionTypes.USER_UPDATE_REQUEST });

    try {
        const res: any = await APIService({
            url: `/user-management/user/modify/${data.epfNumber}`,
            auth: true,
            method: 'PUT',
            data: data,
        });

        dispatch({
            type: userActionTypes.USER_UPDATE_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: userActionTypes.USER_UPDATE_SUCCEED,
            payload: err ? err.data : null
        });
    }
};
export const getUsersList = () => async (dispatch: any) => {
  dispatch({ type: userActionTypes.USER_DETAILS_GETTING_REQUEST });

    try {
        const res: any = await APIService({
            url: `/user-management/user/list`,
            auth: true,
            method: 'GET',
        });

        dispatch({
            type: userActionTypes.USER_DETAILS_GETTING_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: userActionTypes.USER_DETAILS_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }

};

export const getPaginatedList=(details: any)=>async(dispatch: any)=>{
  dispatch({type:userActionTypes.USER_DETAILS_GETTING_REQUEST});

    try {
        const res: any = await APIService({
            url: `/user-management/user/list`,
            auth: true,
            method: 'POST',
            data: details,
        });

        dispatch({
            type: userActionTypes.USER_DETAILS_GETTING_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: userActionTypes.USER_DETAILS_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }
}

export const userInactive = (epfNumber: string, pageNo: number, searchVal: String) => async (dispatch: any) => {
  dispatch({ type: userActionTypes.USER_INACTIVE_REQUEST });

    try {
        const res: any = await APIService({
            url: `/user-management/user/${epfNumber}/inactive`,
            auth: true,
            method: 'PUT',
            data: data,
        });

        dispatch(
            getPaginatedList({
                descending: true,
                limit: 5,
                orderFields: ["epf_number"],
                page: pageNo,
                filterData: [
                    {
                        property: "user_name",
                        operator: "LIKE",
                        value: `${searchVal}`,
                    },
                ],
            })
        );
    } catch (err: any) {
        dispatch({
            type: userActionTypes.USER_INACTIVE_FAILED,
            payload: err ? err.data : null
        });
    }
};

export const userSearch = () => async (dispatch: any) => {
  dispatch({ type: userActionTypes.USER_SEARCH_REQUEST });
  setTimeout(() => {
    dispatch({
      type: userActionTypes.USER_SEARCH_SUCCEED,
      payload: [
        { id: "1", username: "user 1" },
        { id: "2", username: "user 2" },
      ],
    });
  }, 2000);
};
