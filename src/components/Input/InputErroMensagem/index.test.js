import { mount } from "enzyme";
import React from "react";
import { InputErroMensagem } from "./index";

describe("test <InputErroMensagem>", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<InputErroMensagem />);
  });

  it("renders component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
