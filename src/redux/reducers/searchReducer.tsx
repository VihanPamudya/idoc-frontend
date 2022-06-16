import { searchActionTypes } from "../actionTypes";
import produce from "immer";

const initialState = {
    searchResults: [],
  };

  const searchData = produce(
    (state = initialState, action: { type: any; payload: any }) => {
      const { type, payload } = action;
      
      switch (type) {
          case searchActionTypes.USER_USERGROUP_SEARCH_SUCCEED: {
              state.searchResults = payload
              return state;
            }
          default:
              return state;
      }})

export default searchData;