import React from "react";
import { cleanup, render, screen, wait } from "@testing-library/react";
import Dashboard from "../components/Dashboard";
import { useAuth0 } from "../utils/auth0-context";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { initialState } from "../reducers/RootReducer";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import mockAxios from "axios";

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234"
};

jest.mock("../utils/auth0-context");
jest.mock("../store.js");

describe("Dashboard", () => {
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
    mockAxios.get = jest.fn(() => Promise.resolve(mockData));
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

  it("should take a snapshot", async () => {
    const store = mockStore({
      ...initialState,
      doughnutData: mockDough
    });

    const { asFragment } = render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    await act(wait);
    expect(asFragment(<Dashboard />)).toMatchSnapshot();
  });

  it("should render", async () => {
    const store = mockStore({
      ...initialState,
      doughnutData: mockDough
    });
    render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    await act(wait);
    expect(screen.getByText("Monthly Spending")).toBeVisible();
    expect(screen.getByTestId("date-carousel")).toBeVisible();
    expect(screen.getByTestId("doughnutchart")).toBeVisible();
    expect(screen.getByTestId("add-button")).toBeVisible();
    expect(screen.getByTestId("expenses-paper")).toBeVisible();
  });
});
