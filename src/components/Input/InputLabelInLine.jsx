import React, { Fragment } from "react";
import { Form, Col, Row } from "react-bootstrap";
import CurrencyInput from "react-currency-input";

export const InputLabelInLine = (props, index) => {
  return (
    <Fragment>
      <Form.Group as={Row} controlId={`formInputInLine_${index}`}>
        <Form.Label>{props.label}</Form.Label>
        <Col sm="10">
          <Form.Control {...props} type="text" />
          {/* <CurrencyInput
            {...props}
            decimalSeparator=","
            thousandSeparator="."
            prefix="R$ "
            className="form-control"
          /> */}
        </Col>
      </Form.Group>
    </Fragment>
  );
};
