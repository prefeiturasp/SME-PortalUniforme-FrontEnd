import React from "react";
import { shallow } from "enzyme";

import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import configureStore from "redux-mock-store";

import AppLayout from "./App";

describe("test <AppLayout>", () => {
  const mockStore = configureStore();
  const initialState = {};

  let wrapper;
  beforeAll(() => {
    let store = mockStore(initialState);

    wrapper = shallow(
      <Provider store={store}>
        <HashRouter>
          <AppLayout />
        </HashRouter>
      </Provider>
    );
  });

  it("renders component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
