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
      handleChange,
      onAddressBlur
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
            const result = {
              latitude: dataAddress.geometry.coordinates[1],
              longitude: dataAddress.geometry.coordinates[0],
              endereco: dataAddress.properties.label,
              bairro: dataAddress.properties.neighbourhood || "indisponível",
              cep: dataAddress.properties.postalcode,
              numero: dataAddress.properties.housenumber
            };
            onChange(result);
            handleChange(result);
          }}
          onAddressBlur={onAddressBlur}
          {...this.props}
        />

        <HelpText helpText={helpText} red/>
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
