import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { Field } from "redux-form";
import { InputLabelInLine } from "components/Input/InputLabelInLine";
import { CheckInputLabel } from "components/Input/CheckInputLabel";
import { fieldMoney } from "helpers/textMask";

const TipoFornecimento = props => {
  return (
    <Fragment>
      <ProdutoValor chave={1} label="Bermuda" />
      <ProdutoValor chave={2} label="Calça" />
      <ProdutoValor chave={3} label="Camisa" />
      <ProdutoValor chave={4} label="Moletom" />
    </Fragment>
  );
};

export default TipoFornecimento;

export const ProdutoValor = props => {
  return (
    <Fragment>
      <Row>
        <Col lg={5} xl={5}>
          <Field
            {...props}
            component={CheckInputLabel}
            type="checkbox"
            label={props.label}
            name={`produtos_${props.chave}`}
          />
        </Col>
        <Col lg={7} xl={7}>
          <Field
            {...fieldMoney}
            component={InputLabelInLine}
            placeholder="R$ 10,00"
            label="Valor"
            name={`valor_${props.chave}`}
            style={{ marginTop: "-10px" }}
          />
        </Col>
      </Row>
    </Fragment>
  );
};
