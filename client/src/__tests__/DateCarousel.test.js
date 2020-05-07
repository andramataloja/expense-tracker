import React from "react";
import {
  cleanup,
  render,
  fireEvent,
  screen,
  wait,
  waitForElement
} from "@testing-library/react";
import DateCarousel from "../components/DateCarousel";
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

describe("DateCarousel", () => {
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
        month_id: 1,
        month: "January",
        month_nr: 0
      },
      {
        month_id: 2,
        month: "February",
        month_nr: 1
      }
    ]
  };

  it("fetches successfully data from an API", async () => {
    expect(mockAxios.get(`${API}/get/months`)).resolves.toEqual(mockData);
    expect(mockAxios.get).toHaveBeenCalledWith(`${API}/get/months`);
  });

  it("should take a snapshot of datecarousel", async () => {
    const store = mockStore();
    const { asFragment } = render(
      <Provider store={store}>
        <DateCarousel />
      </Provider>
    );
    await act(wait);

    expect(asFragment(<DateCarousel />)).toMatchSnapshot();
  });

  /* it("renders", async () => {
    const store = mockStore();
    const { container } = render(
      <Provider store={store}>
        <DateCarousel />
      </Provider>
    );
    await act(wait);

    expect(container.firstChild).toHaveClass(
      "BrainhubCarousel__customArrows BrainhubCarousel__arrow--disable BrainhubCarousel__custom-arrowLeft"
    );
  }); */
});
