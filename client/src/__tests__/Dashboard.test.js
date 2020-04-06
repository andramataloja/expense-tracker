import React from "react";
import { shallow, mount } from "enzyme";
import { cleanup } from "@testing-library/react";
import Dashboard from "../components/Dashboard";
import { useAuth0 } from "../utils/auth0-context";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { initialState, rootReducer } from "../reducers/RootReducer";

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234"
};

jest.mock("../utils/auth0-context");
describe("Dashboard", () => {
  afterEach(cleanup);
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
      isLoading: false,
      getIdTokenClaims: jest.fn(),
      getTokenSilently: jest.fn()
    });
    require("mutationobserver-shim");
  });
  let store = createStore(rootReducer, initialState);
  const container = mount(
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
  it("renders", () => {
    expect(container).toMatchSnapshot();
  });
});
