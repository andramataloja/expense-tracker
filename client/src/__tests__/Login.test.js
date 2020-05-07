import React from "react";
import {
  cleanup,
  render,
  fireEvent,
  screen,
  wait
} from "@testing-library/react";
import Login from "../components/Login";
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

describe("Login", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  it("renders", async () => {
    const store = mockStore();
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    await act(wait);
    expect(
      screen.getByText(
        "You can log in to your Expense Tracker with Google account"
      )
    ).toBeVisible();
    expect(screen.getByText("Login with Google account")).toBeVisible();
    fireEvent.click(screen.getByText("Login with Google account"));
  });
});
