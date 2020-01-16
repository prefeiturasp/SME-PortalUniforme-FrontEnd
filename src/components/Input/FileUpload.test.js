import React from "react";
import { mount } from "enzyme";

import { required } from "helpers/fieldValidators";
import { FileUpload } from "./FileUpload";

describe("test <FileUpload>", () => {
  window.URL.createObjectURL = jest.fn();
  let wrapper;
  let onChange = jest.fn();
  let input = { onChange, value: "" };

  afterEach(() => {
    window.URL.createObjectURL.mockReset();
  });

  beforeEach(() => {
    const props = {
      meta: {
        touched: true,
        error: "This field is required"
      }
    };
    wrapper = mount(
      <FileUpload
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
  const file = new File(["dummy content"], "example.png", {
    type: "image/png"
  });
  const event = {
    target: {
      files: [file]
    }
  };

  it("renders component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Change Value", () => {
    wrapper.find("input").simulate("change", event);
  });
});
