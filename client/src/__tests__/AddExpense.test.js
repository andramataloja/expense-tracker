import React from "react";
import {
  cleanup,
  render,
  fireEvent,
  screen,
  wait
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

  const mockPostData = {
    description: "Food",
    amount: 15,
    date: "12/03/2020",
    category_id: 1,
    email: "john@gmail.com"
  };

  it("fetches successfully data from an API", async () => {
    expect(mockAxios.get(`${API}/get/categories`)).resolves.toEqual(mockData);
    expect(mockAxios.get).toHaveBeenCalledWith(`${API}/get/categories`);
  });

  /*  it("fetches post", async () => {
    // kuidas post käib?
    mockAxios.post.mockImplementationOnce(() => Promise.resolve(mockPostData));
    expect(mockAxios.post(`${API}/post/expensetodb`)).resolves.toEqual(
      mockPostData
    );
    expect(mockAxios.post).toHaveBeenCalledWith(`${API}/post/expensetodb`);
  }); */

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

  it("add expense dialog opens and closes", async () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <AddExpense />
      </Provider>
    );
    await act(wait);

    expect(screen.queryByTestId("add-dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.getByTestId("add-dialog")).toBeVisible();
    fireEvent.click(screen.getByTestId("cancel-button"));
    await wait(() =>
      expect(screen.queryByTestId("add-dialog")).not.toBeInTheDocument()
    );
  });

  it("Description field change", async () => {
    const store = mockStore();
    //const handleChange = jest.fn();
    const logSpy = jest.spyOn(console, "log");
    render(
      <Provider store={store}>
        <AddExpense /* onChange={handleChange} */ />
      </Provider>
    );
    await act(wait);

    fireEvent.click(screen.getByTestId("add-button"));
    const description = screen.getByLabelText("Description");
    fireEvent.change(description, {
      target: { value: "TEST VALUE" }
    });
    expect(description).toHaveValue("TEST VALUE");
    expect(logSpy).toHaveBeenCalledTimes(1);
    //expect(handleChange).toHaveBeenCalledTimes(1); //miks callib 0 korda?
    fireEvent.click(screen.getByText("Add"));
  });

  it("Amount field change", async () => {
    const store = mockStore();
    const handleChange = jest.fn();
    render(
      <Provider store={store}>
        <AddExpense onChange={handleChange} />
      </Provider>
    );
    await act(wait);

    fireEvent.click(screen.getByTestId("add-button"));
    const amount = screen.getByLabelText("Amount");
    fireEvent.change(amount, {
      target: { value: 5 }
    });
    expect(amount).toHaveValue(5);
    fireEvent.change(amount, {
      target: { value: "viis" }
    });
    expect(amount).toHaveValue(null);
  });

  it("Date field change", async () => {
    const store = mockStore();
    const handleChange = jest.fn();
    render(
      <Provider store={store}>
        <AddExpense onChange={handleChange} />
      </Provider>
    );
    await act(wait);

    fireEvent.click(screen.getByTestId("add-button"));
    const date = screen.getByLabelText("Date");
    fireEvent.change(date, {
      target: { value: "05/02/2020" }
    });
    expect(date).toHaveValue("05/02/2020");
  });

  it("Category field change", async () => {
    const store = mockStore();
    const handleChange = jest.fn();
    render(
      <Provider store={store}>
        <AddExpense onChange={handleChange} />
      </Provider>
    );
    await act(wait);

    fireEvent.click(screen.getByTestId("add-button"));
    const category = screen.getByTestId("category").querySelector("input");
    expect(category).toHaveValue("1");
    fireEvent.change(category, {
      target: { value: "3" }
    });
    expect(category).toHaveValue("3");
  });

  it("Show submit error on empty description and amount", async () => {
    const store = mockStore();
    const handleSubmit = jest.fn();
    render(
      <Provider store={store}>
        <AddExpense onSubmit={handleSubmit} />
      </Provider>
    );
    await act(wait);

    fireEvent.click(screen.getByTestId("add-button"));
    expect(screen.queryByTestId("description-error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("amount-error")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Add"));
    await wait(() =>
      expect(screen.getByTestId("description-error")).toBeVisible()
    );
    await wait(() => expect(screen.getByTestId("amount-error")).toBeVisible());
  });

  it("Handle submit", async () => {
    const store = mockStore();
    const handleSubmit = jest.fn();
    render(
      <Provider store={store}>
        <AddExpense onSubmit={handleSubmit} />
      </Provider>
    );
    await act(wait);

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.click(screen.getByText("Add"));
  });
});
