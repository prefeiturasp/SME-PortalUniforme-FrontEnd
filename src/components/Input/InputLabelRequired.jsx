import React, { Fragment } from "react";
import { Form } from "react-bootstrap";

export const InputLabelRequired = props => {
  return (
    <Fragment>
      <div className="input">
        <Form.Group controlId="1">
          <span className="required-asterisk">* </span>
          <Form.Label>{props.label}</Form.Label>
          <Form.Control
            {...props}
            name={props.name}
            value={props.value}
            required
          />
        </Form.Group>
      </div>
    </Fragment>
  );
};



export const InputLabel = props => {
  return (
    <Fragment>
      <div className="input">
        <Form.Group controlId="1">
          <Form.Label>{props.label}</Form.Label>
          <Form.Control
            {...props}
            name={props.name}
            value={props.value}
          />
        </Form.Group>
      </div>
    </Fragment>
  );
};
