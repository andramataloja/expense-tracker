import * as types from "./action-types";

export const fetchMonth = month => {
  return {
    type: types.FETCH_MONTH,
    payload: month
  };
};

export const fetchYear = year => {
  return {
    type: types.FETCH_YEAR,
    payload: year
  };
};

export const fetchDoughnutData = data => {
  return {
    type: types.FETCH_DOUGHNUTDATA,
    payload: data
  };
};
