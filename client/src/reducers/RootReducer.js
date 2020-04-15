import * as types from "../actions/action-types";

export const initialState = {
  month: new Date().getMonth(),
  year: new Date().getFullYear(),
  doughnutData: [],
  expenses: [],
  index: ""
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
    case types.FETCH_EXPENSES:
      return {
        ...state,
        expenses: action.payload
      };
    case types.SET_EXPLODEINDEX:
      return {
        ...state,
        index: action.payload
      };
    default:
      return state;
  }
};
export default rootReducer;
