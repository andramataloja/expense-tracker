import React from "react";
import ReactDOM from "react-dom";
import {
  cleanup,
  render,
  fireEvent,
  screen,
  wait,
  waitForElement
} from "@testing-library/react";
import Dashboard from "../components/Dashboard";
import { useAuth0 } from "../utils/auth0-context";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";

import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import mockAxios from "axios";
import { fetchDoughnutData } from "../actions/actions";

const API = "http://localhost:3000";

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234"
};

jest.mock("../utils/auth0-context");
jest.mock("../store.js");

describe("Add Expense", () => {
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

  it("fetches successfully data from an API", async () => {
    expect(
      mockAxios.get(`${API}/get/doughnutdata?month=1&year=2020`)
    ).resolves.toEqual(mockData);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${API}/get/doughnutdata?month=1&year=2020`
    );
  });

  it("should take a snapshot of dashboard", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData)
      })
    );

    await act(async () => {
      const store = mockStore();
      render(
        <Provider store={store}>
          <Dashboard month="1" year="2020" />
        </Provider>
      );
    });

    console.log("debugdash", screen.debug()); // Kuidas DoughnutData.lengthi saan?
  });
});
