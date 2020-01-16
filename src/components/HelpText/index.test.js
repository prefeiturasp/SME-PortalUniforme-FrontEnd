import { mount } from "enzyme";
import React from "react";
import { HelpText } from "./index";

describe("test <HelpText>", () => {
  it("renders component", () => {
    let wrapper = mount(<HelpText helpText="Teste" />);

    expect(wrapper).toMatchSnapshot();
  });
});
