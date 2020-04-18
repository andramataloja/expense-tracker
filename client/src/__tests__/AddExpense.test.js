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
    mockAxios.get.mockImplementation(url => {
      switch (url) {
        case `${API}/get/categories`:
          return Promise.resolve(mockData);
        case `${API}/allexpensesbydate?month=1&year=2020&email=john@gmail.com`:
          return Promise.resolve(mockExpenses);
        default:
          return Promise.resolve(mockData);
      }
    });
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
    description: "TEST",
    amount: "5",
    date: "2020-03-04T22:00:00.000Z",
    category_id: 1,
    email: "johndoe@me.com"
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
    const handleChange = jest.fn();
    render(
      <Provider store={store}>
        <AddExpense onChange={handleChange} />
      </Provider>
    );
    await act(wait);

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "TEST VALUE" }
    });
    expect(screen.getByLabelText("Description")).toHaveValue("TEST VALUE");
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
    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: 5 }
    });
    expect(screen.getByLabelText("Amount")).toHaveValue(5);
    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: "viis" }
    });
    expect(screen.getByLabelText("Amount")).toHaveValue(null);
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
    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "05/02/2020" }
    });
    expect(screen.getByLabelText("Date")).toHaveValue("05/02/2020");
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
    mockAxios.post.mockImplementationOnce(() => Promise.resolve(mockPostData));
    const store = mockStore();
    const handleSubmit = jest.fn();
    const handleChange = jest.fn();
    render(
      <Provider store={store}>
        <AddExpense onSubmit={handleSubmit} onChange={handleChange} />
      </Provider>
    );
    await act(wait);

    fireEvent.click(screen.getByTestId("add-button"));
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "TEST" }
    });
    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: 5 }
    });
    const date = screen.getByTestId("date-field").querySelector("input");
    fireEvent.change(date, {
      target: { value: "05/03/2020" }
    });
    const category = screen.getByTestId("category").querySelector("input");
    fireEvent.change(category, {
      target: { value: "3" }
    });

    fireEvent.click(screen.getByText("Add"));
    expect(mockAxios.post(`${API}/post/expensetodb`)).resolves.toEqual(
      mockPostData
    );
    expect(mockAxios.post).toHaveBeenCalledWith(`${API}/post/expensetodb`);
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(
      mockAxios.get(
        `${API}/allexpensesbydate?month=1&year=2020&email=john@gmail.com`
      )
    ).resolves.toEqual(mockExpenses);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${API}/allexpensesbydate?month=1&year=2020&email=john@gmail.com`
    );
    await wait(() =>
      expect(screen.queryByTestId("add-dialog")).not.toBeInTheDocument()
    );
    expect(screen.getByTestId("add-button")).toBeVisible();
  });
});
