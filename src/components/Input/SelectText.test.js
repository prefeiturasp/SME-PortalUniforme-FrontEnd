import { mount } from "enzyme";
import React from "react";
import { SelectText } from "./SelectText";

describe("test <SelectText>", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<SelectText />);
  });

  it("renders component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
