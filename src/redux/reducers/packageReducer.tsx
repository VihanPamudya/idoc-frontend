import { packageActionTypes } from "../actionTypes/index";
import produce from "immer";

const initialState = {
  allPackageDetails: [],
};

const packageData = produce(
  (state = initialState, action: { type: any; payload: any }) => {
    const { type, payload } = action;

    switch (type) {
      case packageActionTypes.PACKAGE_DETAILS_GETTING_SUCCEED: {
        state.allPackageDetails = payload;
        return state;
      }

      default: {
        return state;
      }
    }
  }
);

export default packageData;
