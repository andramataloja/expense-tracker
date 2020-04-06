import React from "react";
import { shallow, mount } from "enzyme";
import {
  cleanup,
  render,
  act,
  fireEvent,
  waitForElement
} from "@testing-library/react";
import DateCarousel from "../components/DateCarousel";
import Carousel from "@brainhubeu/react-carousel";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { initialState, rootReducer } from "../reducers/RootReducer";
import ReactDOM from "react-dom";
import axiosMock from "axios";

const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  };
};

describe("DateCarousel", () => {
  afterEach(cleanup);
  it("should render correctly with no props", () => {
    let store = createStore(rootReducer, initialState);
    const component = shallow(
      <Provider store={store}>
        <DateCarousel />
      </Provider>
    );
    expect(component.html()).toMatchSnapshot();
  });

  it("should take a snapshot", () => {
    const { asFragment } = renderWithRedux(<DateCarousel />);
    expect(asFragment(<DateCarousel />)).toMatchSnapshot();
  });

  it("async axios request works", async () => {
    axiosMock.get.mockResolvedValue({ data: 2 });

    const url = "/get/months";
    let store = createStore(rootReducer, initialState);
    const { getByText, getByTestId, rerender } = render(
      <Provider store={store}>
        <DateCarousel url={url} />
      </Provider>
    );

    const resolvedEl = await waitForElement(() => getByTestId("monthState"));

    expect(resolvedEl.value()).toBe(2);

    expect(axiosMock.get).toHaveBeenCalledTimes(1);
    expect(axiosMock.get).toHaveBeenCalledWith(url);
  });
});
