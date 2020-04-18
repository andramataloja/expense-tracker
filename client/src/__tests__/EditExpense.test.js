import React from "react";
import {
  cleanup,
  render,
  fireEvent,
  screen,
  wait
} from "@testing-library/react";
import EditExpense from "../components/EditExpense";
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

describe("Edit Expense", () => {
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

  const expense = {
    amount: 8,
    description: "Snacks",
    category_id: 1,
    date: "2020-03-06"
  };

  const mockPutData = {
    description: "TEST VALUE",
    amount: 8,
    date: "2020-03-17",
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

  it("should take a snapshot of edit button", async () => {
    const store = mockStore();
    const { asFragment } = render(
      <Provider store={store}>
        <EditExpense expense={expense} />
      </Provider>
    );
    await act(wait);

    expect(asFragment(<EditExpense />)).toMatchSnapshot();
  });

  it("edit dialog renders", async () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <EditExpense expense={expense} />
      </Provider>
    );
    await act(wait);

    fireEvent.click(screen.getByTestId("edit-button"));
    expect(screen.getByText("Edit Expense")).toBeVisible();
    expect(screen.getByText("Cancel")).toBeVisible();
    expect(screen.getByText("Update")).toBeVisible();
  });

  it("edit dialog opens and closes", async () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <EditExpense expense={expense} />
      </Provider>
    );
    await act(wait);

    expect(screen.queryByTestId("edit-dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId("edit-button"));
    expect(screen.getByTestId("edit-dialog")).toBeVisible();
    fireEvent.click(screen.getByText("Cancel"));
    await wait(() =>
      expect(screen.queryByTestId("edit-dialog")).not.toBeInTheDocument()
    );
  });

  it("Edit fields change", async () => {
    const store = mockStore();
    const handleChange = jest.fn();
    render(
      <Provider store={store}>
        <EditExpense onChange={handleChange} expense={expense} />
      </Provider>
    );
    await act(wait);

    fireEvent.click(screen.getByTestId("edit-button"));
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "TEST VALUE" }
    });
    expect(screen.getByLabelText("Description")).toHaveValue("TEST VALUE");

    const amount = screen.getByLabelText("Amount");
    fireEvent.change(amount, {
      target: { value: 5 }
    });
    expect(amount).toHaveValue(5);

    fireEvent.change(screen.getByLabelText("Date"), {
      target: { value: "05/02/2020" }
    });
    expect(screen.getByLabelText("Date")).toHaveValue("05/02/2020");

    const category = screen.getByTestId("category").querySelector("input");
    fireEvent.change(category, {
      target: { value: "3" }
    });
    expect(category).toHaveValue("3");
  });

  it("Handle submit", async () => {
    mockAxios.put.mockImplementationOnce(() => Promise.resolve(mockPutData));
    const store = mockStore();
    const handleSubmit = jest.fn();
    render(
      <Provider store={store}>
        <EditExpense onSubmit={handleSubmit} expense={expense} />
      </Provider>
    );
    await act(wait);

    fireEvent.click(screen.getByTestId("edit-button"));
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "TEST VALUE" }
    });
    expect(screen.getByLabelText("Description")).toHaveValue("TEST VALUE");
    fireEvent.click(screen.getByText("Update"));
    expect(mockAxios.put(`${API}/put/expense`)).resolves.toEqual(mockPutData);
    expect(mockAxios.put).toHaveBeenCalledWith(`${API}/put/expense`);
    expect(mockAxios.put).toHaveBeenCalledTimes(1);
    expect(
      mockAxios.get(
        `${API}/allexpensesbydate?month=1&year=2020&email=john@gmail.com`
      )
    ).resolves.toEqual(mockExpenses);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${API}/allexpensesbydate?month=1&year=2020&email=john@gmail.com`
    );
    await wait(() =>
      expect(screen.queryByTestId("edit-dialog")).not.toBeInTheDocument()
    );
    expect(screen.getByTestId("edit-button")).toBeVisible();
  });
});
