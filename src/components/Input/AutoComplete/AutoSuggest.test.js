import { mount } from "enzyme";
import React from "react";
import { required } from "helpers/fieldValidators";
import { AutoSuggestAddress } from "./AutoSuggest";

describe("test <AutoSuggestAddress>", () => {
  let wrapper;
  let onChange = jest.fn();
  let input = { onChange };

  beforeEach(() => {
    const props = {
      meta: {
        touched: true,
        error: "This field is required"
      }
    };
    wrapper = mount(
      <AutoSuggestAddress
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
});
