import * as types from "../actions/action-types";

const initialState = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  doughnutData: []
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_MONTH:
      return {
        ...state,
        month: action.payload
      };
    case types.FETCH_YEAR:
      return {
        ...state,
        year: action.payload
      };
    case types.FETCH_DOUGHNUTDATA:
      return {
        ...state,
        doughnutData: action.payload
      };
    default:
      return state;
  }
};
export default rootReducer;
