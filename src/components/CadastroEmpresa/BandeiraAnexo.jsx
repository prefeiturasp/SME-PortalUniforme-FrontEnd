import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { CheckInputLabel } from "components/Input/CheckInputLabel";
import { Field } from "redux-form";
import { FileUpload } from "components/Input/FileUpload";
import { required } from "helpers/fieldValidators";

const BandeiraAnexo = props => {
  const badeiras = [
    {
      id: 1,
      nome: "Visa"
    },
    {
      id: 2,
      nome: "Mastercard"
    },
    {
      id: 3,
      nome: "American Express"
    }
  ];
  return (
    <Fragment>
      <Row className="py-2">
        <Col lg={6} xl={6}>
          {badeiras.map((value, key) => {
            return (
              <Field
                component={CheckInputLabel}
                label={value.nome}
                name={value.id}
                index={key}
              />
            );
          })}
        </Col>
      </Row>
      <hr />
      <Row className="py-2">
        <Col>
          <Field
            component={FileUpload}
            name="anexos_loja"
            id="anexos_loja"
            accept="file/pdf"
            className="form-control-file"
            label="Anexos / Documentos"
            required
            validate={required}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default BandeiraAnexo;
