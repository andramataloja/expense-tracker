import configureStore from "redux-mock-store";
import * as actions from "../actions/actions";

const mockStore = configureStore();
const store = mockStore();

describe("select_actions", () => {
  beforeEach(() => {
    store.clearActions();
  });
  test("Dispatches FETCH_MONTH correct action and payload", () => {
    const expectedActions = [
      {
        payload: 1,
        type: "FETCH_MONTH"
      }
    ];
    store.dispatch(actions.fetchMonth(1));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("Dispatches FETCH_YEAR correct action and payload", () => {
    const expectedActions = [
      {
        payload: 1,
        type: "FETCH_YEAR"
      }
    ];
    store.dispatch(actions.fetchYear(1));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("Dispatches FETCH_DOUGHNUTDATA correct action and payload", () => {
    const expectedActions = [
      {
        payload: 1,
        type: "FETCH_DOUGHNUTDATA"
      }
    ];
    store.dispatch(actions.fetchDoughnutData(1));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("Dispatches FETCH_EXPENSES correct action and payload", () => {
    const expectedActions = [
      {
        payload: 1,
        type: "FETCH_EXPENSES"
      }
    ];
    store.dispatch(actions.fetchExpenses(1));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test("Dispatches SET_EXPLODEINDEX correct action and payload", () => {
    const expectedActions = [
      {
        payload: 1,
        type: "SET_EXPLODEINDEX"
      }
    ];
    store.dispatch(actions.setExplodeIndex(1));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
