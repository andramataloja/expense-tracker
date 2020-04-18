import React from "react";
import {
  cleanup,
  render,
  fireEvent,
  screen,
  wait
} from "@testing-library/react";
import DeleteDialog from "../components/DeleteDialog";
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

  const mockResponse = {
    data: { expense_id: 116 },
    status: 200,
    statusText: "OK",
    headers: {},
    config: {}
  };

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

  it("should take a snapshot of delete button", async () => {
    const store = mockStore();
    const { asFragment } = render(
      <Provider store={store}>
        <DeleteDialog />
      </Provider>
    );
    await act(wait);

    expect(asFragment(<DeleteDialog />)).toMatchSnapshot();
  });

  it("delete dialog renders", async () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <DeleteDialog />
      </Provider>
    );
    await act(wait);

    fireEvent.click(screen.getByTestId("delete-button"));
    expect(screen.getByText("Delete?")).toBeVisible();
    expect(
      screen.getByText("Are you sure you want to delete this expense?")
    ).toBeVisible();
    expect(screen.getByText("Cancel")).toBeVisible();
    expect(screen.getByText("Delete")).toBeVisible();
  });

  it("delete dialog opens and closes", async () => {
    const store = mockStore();
    render(
      <Provider store={store}>
        <DeleteDialog />
      </Provider>
    );
    await act(wait);

    expect(screen.queryByTestId("delete-dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId("delete-button"));
    expect(screen.getByTestId("delete-dialog")).toBeVisible();
    fireEvent.click(screen.getByText("Cancel"));
    await wait(() =>
      expect(screen.queryByTestId("delete-dialog")).not.toBeInTheDocument()
    );
  });

  it("deletes expense", async () => {
    mockAxios.delete.mockImplementationOnce(() =>
      Promise.resolve(mockResponse)
    );
    const store = mockStore();
    const handleDelete = jest.fn();
    render(
      <Provider store={store}>
        <DeleteDialog onClick={handleDelete} />
      </Provider>
    );
    await act(wait);
    fireEvent.click(screen.getByTestId("delete-button"));
    fireEvent.click(screen.getByText("Delete"));
    /*  await wait(() =>
      expect(mockAxios.delete).toHaveBeenCalledWith(`${API}/delete/expense`, {
        data: {
          expense_id: 116
        }
      })
    );
    expect(
      mockAxios.delete(`${API}/delete/expense`, {
        data: { expense_id: 116 }
      })
    ).resolves.toEqual(mockResponse); */

    await wait(() =>
      expect(screen.queryByTestId("delete-dialog")).not.toBeInTheDocument()
    );
  });
});
