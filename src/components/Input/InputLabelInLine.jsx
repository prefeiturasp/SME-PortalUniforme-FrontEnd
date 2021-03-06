import React, { Fragment } from "react";
import { Form, Col, Row } from "react-bootstrap";

export const InputLabelInLine = (props) => {
  return (
    <Fragment>
      <Form.Group as={Row}>
        <Form.Label>{props.label}</Form.Label>
        <Col sm="10">
          <Form.Control {...props} />
        </Col>
      </Form.Group>
    </Fragment>
  );
};
