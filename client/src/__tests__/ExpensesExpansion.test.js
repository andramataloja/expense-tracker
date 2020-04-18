import React from "react";
import {
  cleanup,
  render,
  fireEvent,
  screen,
  wait
} from "@testing-library/react";
import ExpensesExpansion from "../components/ExpensesExpansion";
import { useAuth0 } from "../utils/auth0-context";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import { initialState } from "../reducers/RootReducer";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import mockAxios from "axios";

const API = "http://localhost:3000";

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234"
};

jest.mock("../utils/auth0-context");
jest.mock("../store.js");

describe("Edit Expense", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  afterEach(cleanup);
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
    require("mutationobserver-shim");
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(mockData));
    mockAxios.get.mockImplementationOnce(() => Promise.resolve(mockExpenses));
  });

  const mockData = {
    data: [
      {
        category_id: 3,
        category_name: "Entertainment",
        icon: "Entertainment",
        fill: "#EA6E6E"
      },
      {
        category_id: 1,
        category_name: "Food",
        icon: "Food",
        fill: "#FCD246"
      }
    ]
  };

  const mockExpenses = {
    data: [
      {
        expense_id: 117,
        description: "food",
        amount: "14",
        date_created: "2020-03-12T22:00:00.000Z",
        date: "2020-03-06T22:00:00.000Z",
        category_id: 1,
        email: "john@gmail.com",
        category_name: "Food",
        formatted_date: "07/03/2020",
        month: 3,
        year: 2020
      },
      {
        expense_id: 116,
        description: "theatre",
        amount: "45",
        date_created: "2020-03-12T22:00:00.000Z",
        date: "2020-03-06T22:00:00.000Z",
        category_id: 3,
        email: "john@gmail.com",
        category_name: "Entertainment",
        formatted_date: "07/03/2020",
        month: 3,
        year: 2020
      }
    ]
  };
  const mockDough = {
    data: [
      {
        category_name: "Entertainment",
        total: "65",
        fill: "#EA6E6E"
      },
      {
        category_name: "Food",
        total: "78.5",
        fill: "#FCD246"
      }
    ]
  };

  it("fetches successfully data from an API", async () => {
    expect(mockAxios.get(`${API}/get/categories`)).resolves.toEqual(mockData);
    expect(mockAxios.get).toHaveBeenCalledWith(`${API}/get/categories`);

    expect(
      mockAxios.get(
        `${API}/allexpensesbydate?month=1&year=2020&email=john@gmail.com`
      )
    ).resolves.toEqual(mockExpenses);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${API}/allexpensesbydate?month=1&year=2020&email=john@gmail.com`
    );
  });
  it("renders", async () => {
    mockAxios.get.mockImplementation(() => Promise.resolve(mockData));
    const store = mockStore({
      ...initialState,
      expenses: mockExpenses,
      doughnutData: mockDough
    });
    render(
      <Provider store={store}>
        <ExpensesExpansion categoryList={mockData} />
      </Provider>
    );
    await act(wait);
    //expect(screen.getByTestId("category-panel")).toBeVisible();
    console.log(screen.debug());
  });
});
