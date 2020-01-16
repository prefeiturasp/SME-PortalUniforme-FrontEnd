import { mount } from "enzyme";
import React from "react";
import { required } from "helpers/fieldValidators";
import { AutoComplete } from "./index";

describe("test <AutoComplete>", () => {
  let wrapper;
  let onChange = jest.fn();
  let input = { onChange, value: "" };

  beforeAll(() => {
    const props = {
      meta: {
        touched: true,
        error: "This field is required"
      }
    };
    wrapper = mount(
      <AutoComplete
        className="teste"
        name="myCombo"
        input={input}
        label="mylabel"
        required
        value=""
        validate={required}
        {...props}
      />
    );
  });

  it("renders component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Change Value", () => {
    wrapper.find("input").simulate("change", { target: { value: "Rua A" } });
  });
});
