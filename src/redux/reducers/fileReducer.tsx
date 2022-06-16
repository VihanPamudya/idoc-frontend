import { fileActionTypes } from "../actionTypes";
import produce from "immer";

const initialState = {
    allTagDetails: [],
  };
  
  const fileData = produce(
    (state = initialState, action: { type: any; payload: any }) => {
      const { type, payload } = action;
  
      switch (type) {
        case fileActionTypes.FILE_DETAILS_GETTING_SUCCEED: {
            state.allUserDetails = payload;
            return state;
          }
    
    
          case fileActionTypes.FILE_UPDATE_SUCCEED: {
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
  
  export default fileData;