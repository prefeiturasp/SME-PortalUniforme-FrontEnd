import PropTypes from "prop-types";
import React from "react";
import { InputErroMensagem } from "../InputErroMensagem";
import { HelpText } from "components/HelpText";
import { AutoSuggestAddress } from "./AutoSuggest";

import "../style.scss";

export class AutoComplete extends React.Component {
  render() {
    const {
      className,
      esconderAsterisco,
      helpText,
      input,
      label,
      labelClassName,
      meta,
      name,
      required,
      handleChange
    } = this.props;
    const {
      input: { value, onChange }
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
        <AutoSuggestAddress
          {...input}
          className={`${className} ${meta.touched &&
            meta.error &&
            "invalid-field"}`}
          required={required}
          value={value}
          onAddressSelected={dataAddress => {
            const address = dataAddress.display_name.split(",");
            const result = {
              latitude: dataAddress.lat,
              longitude: dataAddress.lon,
              endereco: address[0],
              bairro: address[1]
            };
            onChange(result);
            handleChange(result);
          }}
          {...this.props}
        />

        <HelpText helpText={helpText} />
        <InputErroMensagem meta={meta} />
      </div>
    );
  }
}

AutoComplete.propTypes = {
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
  handleChange: PropTypes.func
};

AutoComplete.defaultProps = {
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
  handleChange: () => {}
};
