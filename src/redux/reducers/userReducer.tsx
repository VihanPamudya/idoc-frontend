import { userActionTypes } from "../actionTypes/index";
import produce from "immer";

const initialState = {
  allUserDetails: {data:[], totalSize:0}
};

const userData = produce(
  (state = initialState, action: { type: any; payload: any }) => {
    const { type, payload } = action;

    switch (type) {

      case userActionTypes.USER_DETAILS_GETTING_SUCCEED: {
        state.allUserDetails = payload;
        return state;
      }

      case userActionTypes.USER_SEARCH_SUCCEED: {
        state.allUserDetails = payload;
        return state;
      }

      case userActionTypes.USER_UPDATE_SUCCEED: {
        const updated_user_id = state.allUserDetails.data.findIndex(
          (item: { epfNumber: any }) => item.epfNumber === payload.epfNumber
        );
        state.allUserDetails.data[updated_user_id] = payload;
        return state;
      }

      default: {
        return state;
      }
    }
  }
);

export default userData;
