import React from "react";
import {
  cleanup,
  render,
  fireEvent,
  screen,
  wait,
  waitForElement
} from "@testing-library/react";
import AddExpense from "../components/AddExpense";
import { useAuth0 } from "../utils/auth0-context";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";

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
    expect(mockAxios.get(`${API}/get/categories`)).resolves.toEqual(mockData);
    expect(mockAxios.get).toHaveBeenCalledWith(`${API}/get/categories`);
  });

  it("should take a snapshot of add button", async () => {
    const store = mockStore();
    const { asFragment } = render(
      <Provider store={store}>
        <AddExpense />
      </Provider>
    );
    await act(wait);

    expect(asFragment(<AddExpense />)).toMatchSnapshot();
  });

  it("add button opens add expense dialog", async () => {
    const store = mockStore();
    jest.useFakeTimers();
    render(
      <Provider store={store}>
        <AddExpense />
      </Provider>
    );
    await act(wait);

    expect(screen.queryByTestId("add-dialog")).toBeNull();

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("add-dialog")).toBeVisible();

    fireEvent.click(screen.getByTestId("cancel-button"));
    await wait(() => expect(screen.getByTestId("add-dialog")).toBeNull()); //miks sa ei tööta??
  });

  it("handlechange in dialog", async () => {
    const store = mockStore();
    const handleChange = jest.fn();
    render(
      <Provider store={store}>
        <AddExpense handleChange={handleChange} />
      </Provider>
    );
    await act(wait);

    fireEvent.click(screen.getByTestId("add-button"));

    const input = screen.getByTestId("description").querySelector("input");
    console.log("debug", screen.debug(input));

    fireEvent.change(input, {
      target: { value: "TEST VALUE" }
    });
    expect(input).toHaveValue("TEST VALUE");
    expect(handleChange).toHaveBeenCalledTimes(1); //miks callib 0 korda?
  });
});
