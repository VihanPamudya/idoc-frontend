import { documentHistoryActionTypes } from "../actionTypes";
import produce from "immer";

const initialState = {
  documentHistoryDetails: [],
};

const documentHistoryData = produce(
  (state = initialState, action: { type: any; payload: any }) => {
    const { type, payload } = action;
    switch (type) {

        case documentHistoryActionTypes.DOCUMENT_HISTORY_DETAILS_GETTING_SUCCEED: {
          
          state.documentHistoryDetails = payload;
          return state;
      }

        default: {
        return state;
        }
    }
  }
);

export default documentHistoryData;
