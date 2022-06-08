import {userRoleActionTypes} from '../actionTypes';
import produce from "immer";

const initialState = {
    userRoleDetails: null,
    allUserRoleDetails: {data: [], totalSize: 0}
};


const userRoleData = produce((state = initialState, action: { type: any; payload: any; }) => {
    const {type, payload} = action;

    switch (type) {

        case userRoleActionTypes.UPDATE_USERROLE_SUCCEED: {
            const updated_user_role_id = state.allUserRoleDetails.data.findIndex((item: { id: any; }) => item.id === payload.id);
            state.allUserRoleDetails.data[updated_user_role_id] = payload;
            return state;
        }


        case userRoleActionTypes.USERROLE_DETAILS_GETTING_SUCCEED: {
            state.allUserRoleDetails = payload;
            return state;
        }

        case userRoleActionTypes.USERROLE_SEARCH_SUCCEED: {
            state.allUserRoleDetails = payload;
            return state;
        }


        case userRoleActionTypes.USERROLE_INACTIVE_SUCCEED: {
            const deleted_user_role_id = state.allUserRoleDetails.data.findIndex((item: { id: any; }) => item.id === payload.id);
            state.allUserRoleDetails.data[deleted_user_role_id] = payload;
            return state;
        }

        case userRoleActionTypes.USERROLE_ACTIVE_SUCCEED: {
            const deleted_user_role_id = state.allUserRoleDetails.data.findIndex((item: { id: any; }) => item.id === payload.id);
            state.allUserRoleDetails.data[deleted_user_role_id] = payload;
            return state;
        }


        default: {
            return state;
        }
    }
});

export default userRoleData;
