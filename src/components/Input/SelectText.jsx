import PropTypes from "prop-types";
import React from "react";
import { InputErroMensagem } from "./InputErroMensagem";
import { HelpText } from "components/HelpText";
import { Dropdown } from "primereact/dropdown";
import "./style.scss";

export class SelectText extends React.Component {
  render() {
    const {
      className,
      disabled,
      esconderAsterisco,
      helpText,
      input,
      label,
      labelClassName,
      meta,
      options,
      name,
      placeholder,
      required
    } = this.props;
    return (
      <div className="input">
        {label && [
          required && !esconderAsterisco && (
            <span key={2} className="required-asterisk">
              *
            </span>
          ),
          <label
            key={1}
            htmlFor={name}
            className={`col-form-label ${labelClassName}`}
          >
            {label}
          </label>
        ]}
        <Dropdown
          {...input}
          options={options}
          autoWidth={false}
          className={`${className} ${meta.touched &&
            meta.error &&
            "invalid-field"}`}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
        />
        <HelpText helpText={helpText} />
        <InputErroMensagem meta={meta} />
      </div>
    );
  }
}
SelectText.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  esconderAsterisco: PropTypes.bool,
  helpText: PropTypes.string,
  input: PropTypes.object,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  meta: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  options: PropTypes.array
};

SelectText.defaultProps = {
  className: "",
  disabled: false,
  esconderAsterisco: false,
  helpText: "",
  input: {},
  label: "",
  labelClassName: "",
  meta: {},
  name: "",
  placeholder: "",
  required: false,
  type: "text",
  options: []
};
