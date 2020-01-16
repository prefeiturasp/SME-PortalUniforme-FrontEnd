import { mount } from "enzyme";
import React from "react";

import { InputText } from "./InputText";
import { required } from "helpers/fieldValidators";

describe("test <InputText>", () => {
  let wrapper;
  let wrappercustomChange;
  let onChange = jest.fn();
  let input = { onChange, value: "" };
  beforeAll(() => {
    const props = {
      meta: {
        touched: true,
        error: "This field is required"
      }
    };
    wrappercustomChange = mount(
      <InputText
        customChange={e => {}}
        className="teste"
        name="myCombo"
        input={input}
        label="mylabel"
        validate={required}
        required
        {...props}
      />
    );
    wrapper = mount(
      <InputText
        className="teste"
        name="myCombo"
        input={input}
        label="mylabel"
        validate={required}
        required
        {...props}
      />
    );
  });

  it("renders component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders component customChange", () => {
    expect(wrappercustomChange).toMatchSnapshot();
  });

  it("Change Value", () => {
    wrapper
      .find("input")
      .simulate("change", { target: { value: "Your new Value" } });
  });
});
