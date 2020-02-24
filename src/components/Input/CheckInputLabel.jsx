import React, { Fragment } from "react";
import { Form } from "react-bootstrap";

export const CheckInputLabel = (props, index) => {
  return (
    <Fragment>
      <Form.Group>
        <Form.Check
          {...props}
          label={props.label}
        />
      </Form.Group>
    </Fragment>
  );
};
