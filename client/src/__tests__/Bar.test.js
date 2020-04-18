import React from "react";
import {
  cleanup,
  render,
  fireEvent,
  screen,
  wait
} from "@testing-library/react";
import Bar from "../components/Bar";
import { useAuth0 } from "../utils/auth0-context";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";

import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const API = "http://localhost:3000";

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234"
};

jest.mock("../utils/auth0-context");
jest.mock("../store.js");

describe("Bar", () => {
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
  });

  it("should take a snapshot of bar", async () => {
    const store = mockStore();
    const { asFragment } = render(
      <Provider store={store}>
        <Bar />
      </Provider>
    );
    await act(wait);
    expect(asFragment(<Bar />)).toMatchSnapshot();
  });

  it("renders", async () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <Bar />
      </Provider>
    );
    await act(wait);
    expect(screen.getByText("Monthly Spending")).toBeVisible();
    expect(screen.getByTestId("open-menu")).toBeVisible();
    fireEvent.click(screen.getByTestId("open-menu"));
    expect(screen.getByTestId("menu")).toBeVisible();
    expect(screen.getByText("Sign out")).toBeVisible();
  });

  it("Signs out works as expected", async () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <Bar />
      </Provider>
    );
    await act(wait);
    fireEvent.click(screen.getByTestId("open-menu"));
    fireEvent.click(screen.getByText("Sign out"));

    //expect(window.location.origin).to.equal(`${API}`);
    await wait(() =>
      expect(screen.queryByTestId("bar")).not.toBeInTheDocument()
    );
  });
});
