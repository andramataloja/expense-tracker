import RootReducer from "../reducers/RootReducer";
import { initialState } from "../reducers/RootReducer";

describe("Root Reducer", () => {
  it("returns the initial state when an action type is not passed", () => {
    const reducer = RootReducer(undefined, {});
    expect(reducer).toEqual(initialState);
  });

  it("handles FETCH_MONTH as expected", () => {
    const reducer = RootReducer(initialState, {
      type: "FETCH_MONTH",
      payload: 0
    });

    expect(reducer).toEqual({
      ...initialState,
      month: 0
    });
  });

  it("handles FETCH_YEAR as expected", () => {
    const reducer = RootReducer(initialState, {
      type: "FETCH_YEAR",
      payload: 2019
    });

    expect(reducer).toEqual({
      ...initialState,
      year: 2019
    });
  });

  it("handles FETCH_DOUGHNUTDATA as expected", () => {
    const reducer = RootReducer(initialState, {
      type: "FETCH_DOUGHNUTDATA",
      payload: [
        {
          category_name: "Entertainment",
          total: "65",
          fill: "#EA6E6E",
          icon:
            '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="white" d="M18 4l2 3h-3l-2-3h-2l2 3h-3l-2-3H8l2 3H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zm-6.75 11.25L10 18l-1.25-2.75L6 14l2.75-1.25L10 10l1.25 2.75L14 14l-2.75 1.25zm5.69-3.31L16 14l-.94-2.06L13 11l2.06-.94L16 8l.94 2.06L19 11l-2.06.94z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
          percent: "26"
        }
      ]
    });

    expect(reducer).toEqual({
      ...initialState,
      doughnutData: [
        {
          category_name: "Entertainment",
          total: "65",
          fill: "#EA6E6E",
          icon:
            '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="white" d="M18 4l2 3h-3l-2-3h-2l2 3h-3l-2-3H8l2 3H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4zm-6.75 11.25L10 18l-1.25-2.75L6 14l2.75-1.25L10 10l1.25 2.75L14 14l-2.75 1.25zm5.69-3.31L16 14l-.94-2.06L13 11l2.06-.94L16 8l.94 2.06L19 11l-2.06.94z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
          percent: "26"
        }
      ]
    });
  });

  it("handles FETCH_EXPENSES as expected", () => {
    const reducer = RootReducer(initialState, {
      type: "FETCH_EXPENSES",
      payload: [
        {
          expense_id: 116,
          description: "theatre",
          amount: "45",
          date_created: "2020-03-12T22:00:00.000Z",
          date: "2020-03-06T22:00:00.000Z",
          category_id: 3
        }
      ]
    });

    expect(reducer).toEqual({
      ...initialState,
      expenses: [
        {
          expense_id: 116,
          description: "theatre",
          amount: "45",
          date_created: "2020-03-12T22:00:00.000Z",
          date: "2020-03-06T22:00:00.000Z",
          category_id: 3
        }
      ]
    });
  });

  it("handles SET_EXPLODEINDEX as expected", () => {
    const reducer = RootReducer(initialState, {
      type: "SET_EXPLODEINDEX",
      payload: 2
    });

    expect(reducer).toEqual({
      ...initialState,
      index: 2
    });
  });
});
