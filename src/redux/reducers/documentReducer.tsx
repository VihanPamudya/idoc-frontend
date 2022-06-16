import { documentActionTypes } from "../actionTypes";
import produce from "immer";

const initialState = {
  documentDetails: null,
  allDocumentDetailes: { data: [], totalSize: 0 },
  sharingLink: ''
};

const documentData = produce(
  (state = initialState, action: { type: any; payload: any }) => {
    const { type, payload } = action;

    switch (type) {
      case documentActionTypes.UPDATE_DOCUMENT_SUCCEED: {
        const updated_document_id = state.allDocumentDetailes.data.findIndex(
          (item: { id: any }) => item.id === payload.id
        );
        state.allDocumentDetailes.data[updated_document_id] = payload;
        return state;
      }

      case documentActionTypes.DOCUMENT_DETAILS_GETTING_SUCCEED: {
        state.allDocumentDetailes = payload;
        return state;
      }

      case documentActionTypes.DOCUMENT_SEARCH_SUCCEED: {
        state.allDocumentDetailes = payload.data;
        return state;
      }

      case documentActionTypes.DOCUMENT_SHARING_LINK_GETTING_SUCCEED: {
        state.sharingLink = payload;
        return state;
      }

      case documentActionTypes.DOCUMENT_UNSHARE_SUCCEED: {
        state.sharingLink = '';
        return state;
      }

      default: {
        return state;
      }
    }
  }
);

export default documentData;
