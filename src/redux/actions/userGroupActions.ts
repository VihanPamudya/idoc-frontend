import {userGroupActionTypes} from "../actionTypes";
import APIService from "../../utils/APIService";

export const addUserGroup = (group: { name: string; parentGroup_id?:any }) => async (dispatch: any) => {
    dispatch({type: userGroupActionTypes.ADD_USER_GROUP_REQUEST});

    try {
        const res: any = await APIService({
            url: `/group-management/group/add`,
            auth: true,
            method: 'POST',
            data: group,
        });

        dispatch(
            getPaginatedList({
                descending: true,
                limit: 5,
                orderFields: ["group_id"],
            })
        );

        return true;

    } catch (err: any) {
        dispatch({
            type: userGroupActionTypes.ADD_USER_GROUP_FAILED,
            payload: err ? err.data : null
        });

        return false;
    }
};

export const updateUserGroup = (group: any) => async (dispatch: any) => {
    dispatch({type: userGroupActionTypes.UPDATE_USER_GROUP_REQUEST});

    try {
        const res: any = await APIService({
            url: `/group-management/group/modify/${group.id}`,
            auth: true,
            method: 'PUT',
            data: group,
        });
        dispatch({
            type: userGroupActionTypes.UPDATE_USER_GROUP_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: userGroupActionTypes.UPDATE_USER_GROUP_FAILED,
            payload: err ? err.data : null
        });
    }
}

export const getPaginatedList = (details: any) => async (dispatch: any) => {
  dispatch({ type: userGroupActionTypes.USER_GROUP_DETAILS_GETTING_REQUEST });

    try {
        const res: any = await APIService({
            url: `/group-management/group/list`,
            auth: true,
            method: 'POST',
            data: details,
        });

        dispatch({
            type: userGroupActionTypes.USER_GROUP_DETAILS_GETTING_SUCCEED,
            payload: res.data
        });
    } catch (err: any) {
        dispatch({
            type: userGroupActionTypes.USER_GROUP_DETAILS_GETTING_FAILED,
            payload: err ? err.data : null
        });
    }
}

export const userGroupDelete=(selected: String, pageNo: number, searchVal: String)=>async(dispatch: any)=>{
    dispatch({type:userGroupActionTypes.USER_GROUP_DELETE_REQUEST});

    try {
        const res: any = await APIService({
            url: `/group-management/group/${selected}/inactive`,
            auth: true,
            method: 'PUT',
            data: selected,
        });

        dispatch(
            getPaginatedList({
                descending: true,
                limit: 5,
                orderFields: ["group_id"],
                page: pageNo,
                filterData: [
                    {
                        property: "group_name",
                        operator: "LIKE",
                        value: `${searchVal}`,
                    },
                ],
            })
        );
    } catch (err: any) {
        dispatch({
            type: userGroupActionTypes.USER_GROUP_DELETE_FAILED,
            payload: err ? err.data : null
        });
    }
};

export const userGroupSearch = (details: any) => async (dispatch: any) => {
  dispatch({ type: userGroupActionTypes.USER_GROUP_SEARCH_REQUEST });
  
  try {
    const res: any = await APIService({
        url: `/group-management/group/list`,
        auth: true,
        method: 'POST',
        data: details,
    });

    dispatch({
        type: userGroupActionTypes.USER_GROUP_SEARCH_SUCCEED,
        payload: res.data
    });
} catch (err: any) {
    dispatch({
        type: userGroupActionTypes.USER_GROUP_SEARCH_FAILED,
        payload: err ? err.data : null
    });
}
};
