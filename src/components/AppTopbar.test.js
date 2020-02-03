import { mount } from "enzyme";
import React from "react";
import { AppTopbar } from "./AppTopbar";

describe("test <AppTopbar>", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<AppTopbar onToggleMenu={e => console.log(e)} />);
  });

  it("renders component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
