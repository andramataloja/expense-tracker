import React from "react";
import ReactDOM from "react-dom";
import { cleanup, render, fireEvent } from "@testing-library/react";
import AddExpense from "../components/AddExpense";
import { useAuth0 } from "../utils/auth0-context";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { initialState, rootReducer } from "../reducers/RootReducer";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";

const user = {
  email: "johndoe@me.com",
  email_verified: true,
  sub: "google-oauth2|12345678901234"
};

jest.mock("../utils/auth0-context");

const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  };
};

describe("Add Expense button", () => {
  afterEach(cleanup);
  beforeEach(() => {
    // Mock the Auth0 hook and make it return a logged in state
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn()
    });
    require("mutationobserver-shim");
  });

  it("should take a snapshot of add button", () => {
    const { asFragment } = renderWithRedux(<AddExpense />);
    expect(asFragment(<AddExpense />)).toMatchSnapshot();
  });

  it("add button renders without crashing", () => {
    const { getByTestId } = renderWithRedux(<AddExpense />);
    expect(getByTestId("add-button")).toBeInTheDocument();
  });

  it("add icon opens add expense dialog", () => {
    const { getByTestId } = renderWithRedux(<AddExpense />);
    fireEvent.click(getByTestId("add-button"));
    const dialog = getByTestId("add-dialog");
    expect(dialog).toBeInTheDocument();
  });
});

describe("Add Expense dialog component", () => {
  let wrapper;
  let store = createStore(rootReducer, initialState);
  beforeEach(
    () =>
      (wrapper = mount(
        <Provider store={store}>
          <AddExpense />
        </Provider>
      ))
  );

  it("should take snapshot of add dialog", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the value of open", () => {
    /*  console.log("wrapper", wrapper.debug());
    wrapper.find("button").simulate("click", {
      open: true
    });
    expect(wrapper.find("dialog").props("open")).toEqual(true); */

    /*  wrapper.find("AddIcon").props("onClick");
      expect(wrapper.state("open")).toBe(false); */

    console.log("find", wrapper.findByTestId("add-button"));
    wrapper.find("AddIcon").simulate("click");
    expect(wrapper.find("Dialog").prop("open")).toEqual(true);
  });
});
