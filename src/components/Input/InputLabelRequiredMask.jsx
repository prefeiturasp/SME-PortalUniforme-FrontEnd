import React, { Fragment } from "react";
import { Form } from "react-bootstrap";
import InputMask from "react-input-mask";

const InputLabelRequiredMask = props => {
  return (
    <Fragment>
      <div className="input">
        <Form.Group controlId="1">
          <span className="required-asterisk">* </span>
          <Form.Label>{props.label}</Form.Label>
          <InputMask {...props} mask={props.mask} name={props.name} />
          {props.erro ? (
            <>
              <div class="valid-feedback">Valid.</div>
              <div class="invalid-feedback">{props.mensagem}</div>
            </>
          ) : null}
        </Form.Group>
      </div>
    </Fragment>
  );
};

export default InputLabelRequiredMask;
