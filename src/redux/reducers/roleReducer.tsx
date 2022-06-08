import { roleActionTypes } from "../actionTypes/index";
import produce from "immer";

const initialState = {
  allRoleDetails: [],
};

const roleData = produce(
  (state = initialState, action: { type: any; payload: any }) => {
    const { type, payload } = action;

    switch (type) {
      case roleActionTypes.ROLE_DETAILS_GETTING_SUCCEED: {
        state.allRoleDetails = payload;
        return state;
      }

      default: {
        return state;
      }
    }
  }
);

export default roleData;
