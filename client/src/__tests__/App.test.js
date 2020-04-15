import React from "react";
import { render, screen, wait } from "@testing-library/react";
import App from "../App";
import { useAuth0 } from "../utils/auth0-context";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234"
};

jest.mock("../utils/auth0-context");
jest.mock("../store.js");

describe("App", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  it("should render", async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
    const store = mockStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    await act(wait);
    console.log(screen.debug());
  });

  it("should render Login", async () => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user: null,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
    const store = mockStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    await act(wait);
    expect(
      screen.getByText(
        "You can log in to your Expense Tracker with Google account"
      )
    ).toBeVisible();
    expect(screen.getByText("Login with Google account")).toBeVisible();
  });
});
