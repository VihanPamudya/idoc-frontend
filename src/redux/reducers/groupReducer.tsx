import { groupActionTypes } from "../actionTypes/index";
import produce from "immer";

const initialState = {
  allGroupDetails: [],
};

const groupData = produce(
  (state = initialState, action: { type: any; payload: any }) => {
    const { type, payload } = action;

    switch (type) {
      case groupActionTypes.GROUP_DETAILS_GETTING_SUCCEED: {
        state.allGroupDetails = payload;
        return state;
      }

      default: {
        return state;
      }
    }
  }
);

export default groupData;
