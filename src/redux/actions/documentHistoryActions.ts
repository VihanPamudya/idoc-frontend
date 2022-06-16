import { documentHistoryActionTypes } from "../actionTypes";
import APIService from "../../utils/APIService";

export const getDocumentHistoryList = (document: any) => async (dispatch: any) => {
    dispatch({ type: documentHistoryActionTypes.DOCUMENT_HISTORY_DETAILS_GETTING_REQUEST });

      try {
          const res: any = await APIService({
              url: `/document-management/document/${document}/history`,
              auth: true,
              method: 'GET',
          });
  
          dispatch({
              type: documentHistoryActionTypes.DOCUMENT_HISTORY_DETAILS_GETTING_SUCCEED,
              payload: res.data
          });
      } catch (err: any) {
          dispatch({
              type: documentHistoryActionTypes.DOCUMENT_HISTORY_DETAILS_GETTING_FAILED,
              payload: err ? err.data : null
          });
      }
  
  };