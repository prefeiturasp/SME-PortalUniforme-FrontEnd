import React, { Fragment } from "react";
import { Form } from "react-bootstrap";
import { InputErroMensagem } from "./InputErroMensagem";

export const InputLabelRequired = props => {
  return (
    <Fragment>
      <div className="input">
        <Form.Group>
          <span className="required-asterisk">* </span>
          <Form.Label>{props.label}</Form.Label>
          <Form.Control
            {...props}
            {...props.input}
            className={`${props.meta &&
              props.meta.touched &&
              props.meta.error &&
              "invalid-field"}`}
            name={props.name}
            required
          />
          <InputErroMensagem meta={props.meta} />
        </Form.Group>
      </div>
    </Fragment>
  );
};

export const InputLabel = props => {
  return (
    <Fragment>
      <div className="input">
        <Form.Group>
          <Form.Label>{props.label}</Form.Label>
          <Form.Control {...props} name={props.name} value={props.value} />
        </Form.Group>
      </div>
    </Fragment>
  );
};
