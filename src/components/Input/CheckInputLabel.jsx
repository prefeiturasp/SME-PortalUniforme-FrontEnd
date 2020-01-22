import React, { Fragment } from "react";
import { Form } from "react-bootstrap";

export const CheckInputLabel = (props, index) => {
  const { input } = props;
  return (
    <Fragment>
      <Form.Group controlId={`formCheck_${index}`}>
        <Form.Check
          {...props}
          {...input}
          label={props.label}
        />
      </Form.Group>
    </Fragment>
  );
};
