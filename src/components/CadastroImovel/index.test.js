import { shallow } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import CadastroImovel from ".";

describe("test <CadastroImovel>", () => {
  const mockStore = configureStore();
  const initialState = {};

  let wrapper;
  beforeAll(() => {
    let store = mockStore(initialState);

    wrapper = shallow(
      <Provider store={store}>
        <CadastroImovel />
      </Provider>
    );
  });

  it("renders component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
