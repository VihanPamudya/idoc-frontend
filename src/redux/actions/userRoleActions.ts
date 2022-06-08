import {userRoleActionTypes} from "../actionTypes/index";
import APIService from "../../utils/APIService";


export const addUserRole = (userroledata: any) => async (dispatch: any) => {
  dispatch({ type: userRoleActionTypes.ADD_USERROLE_REQUEST });

    try {
        const res: any = await APIService({
            url: `/user-management/role-and-permission/add`,
            auth: true,
            method: 'POST',
            data: userroledata,
        });

        dispatch(getPaginatedList(
            {limit: 5})
        )

        return true;

    } catch (err: any) {
        dispatch({
            type: userRoleActionTypes.ADD_USERROLE_FAILED,
            payload: err ? err.data : null
        });
        return false;
    }
};

export const updateUserRole = (userroledata: any) => async (dispatch: any) => {
  dispatch({ type: userRoleActionTypes.UPDATE_USERROLE_REQUEST });

    try {
        const res: any = await APIService({
            url: `/user-management/role-and-permission/modify/${userroledata.id}`,
            auth: true,
            method: 'PUT',
            data: userroledata,
        });

        dispatch({
            type: userRoleActionTypes.UPDATE_USERROLE_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: userRoleActionTypes.UPDATE_USERROLE_FAILED,
            payload: err ? err.data : null
        });
    }
};
export const getUserRoleList = () => async (dispatch: any) => {
  dispatch({ type: userRoleActionTypes.USERROLE_ACTIVE_USERS_GETTING_REQUEST });

    try {
        const res: any = await APIService({
            url: `/user-management/role-and-permission/list`,
            auth: true,
            method: 'GET',
        });

        dispatch({
            type: userRoleActionTypes.USERROLE_ACTIVE_USERS_GETTING_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: userRoleActionTypes.USERROLE_ACTIVE_USERS_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }

};

export const getPaginatedList=(details: any)=>async(dispatch: any)=>{
  dispatch({type:userRoleActionTypes.USERROLE_DETAILS_GETTING_REQUEST});

    try {
        const res: any = await APIService({
            url: `/user-management/role-and-permission/list`,
            auth: true,
            method: 'POST',
            data: details,
        });

        dispatch({
            type: userRoleActionTypes.USERROLE_DETAILS_GETTING_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: userRoleActionTypes.USERROLE_DETAILS_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }
}

export const userRoleDelete = (id: string) => async (dispatch: any) => {
  dispatch({ type: userRoleActionTypes.USERROLE_INACTIVE_REQUEST });

    try {
        const res: any = await APIService({
            url: `/user-management/role-and-permission/${id}/inactive`,
            auth: true,
            method: 'PUT',
        });

        dispatch({
            type: userRoleActionTypes.USERROLE_INACTIVE_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: userRoleActionTypes.USERROLE_INACTIVE_FAILED,
            payload: err ? err.data : null
        });
    }
};

export const userRoleActivate = (id: string) => async (dispatch: any) => {
    dispatch({ type: userRoleActionTypes.USERROLE_ACTIVE_REQUEST });

    try {
        const res: any = await APIService({
            url: `/user-management/role-and-permission/${id}/active`,
            auth: true,
            method: 'PUT',
        });

        dispatch({
            type: userRoleActionTypes.USERROLE_ACTIVE_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: userRoleActionTypes.USERROLE_ACTIVE_FAILED,
            payload: err ? err.data : null
        });
    }
};

export const userRoleSearch = () => async (dispatch: any) => {
  dispatch({ type: userRoleActionTypes.USERROLE_SEARCH_REQUEST });
  setTimeout(() => {
    dispatch({
      type: userRoleActionTypes.USERROLE_SEARCH_SUCCEED,
      payload: [
        { id: "1", username: "user 1" },
        { id: "2", username: "user 2" },
      ],
    });
  }, 2000);
};
