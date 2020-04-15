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

  const expense = {
    amount: 8,
    description: "Snacks",
    category_id: 1,
    date: "17/03/2020"
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
    const description = screen.getByLabelText("Description");
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "TEST VALUE" }
    });
    expect(description).toHaveValue("TEST VALUE");

    const amount = screen.getByLabelText("Amount");
    fireEvent.change(amount, {
      target: { value: 5 }
    });
    expect(amount).toHaveValue(5);

    /*  const date = screen.getByLabelText("Date");
    console.log(screen.debug(date));
    fireEvent.change(date, {
      target: { value: "05/02/2020" }
    });
    expect(date).toHaveValue("05/02/2020"); */

    const category = screen.getByTestId("category").querySelector("input");
    fireEvent.change(category, {
      target: { value: "3" }
    });
    expect(category).toHaveValue("3");
  });

  it("Handle submit", async () => {
    /*  const store = mockStore();
    const handleSubmit = jest.fn();
    render(
      <Provider store={store}>
        <EditExpense onSubmit={handleSubmit} />
      </Provider>
    );
    await act(wait);
    fireEvent.click(screen.getByTestId("edit-button"));
    fireEvent.click(screen.getByText("Update")); */
  });
});
