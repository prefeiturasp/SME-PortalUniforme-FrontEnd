import React, { Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import { Field } from "redux-form";
import { InputLabelInLine } from "components/Input/InputLabelInLine";
import { CheckInputLabel } from "components/Input/CheckInputLabel";
import { fieldMoney } from "helpers/textMask";

const TipoFornecimento = props => {
  const produtos = [
    {
      id: 1,
      nome: "Calça"
    },
    {
      id: 2,
      nome: "Camisa"
    },
    {
      id: 3,
      nome: "Calçado"
    },
    {
      id: 4,
      nome: "Bermuda"
    },
    {
      id: 5,
      nome: "Moletom"
    }
  ];

  return (
    <Fragment>
      {produtos.map((value, key) => {
        return (
          <ProdutoValor
            key={key}
            chave={value.id}
            label={value.nome}
            nameProduto={value.id}
            nameValor={value.id}
          />
        );
      })}
    </Fragment>
  );
};

export default TipoFornecimento;

export const ProdutoValor = props => {
  return (
    <Fragment>
      <Row className="py-2">
        <Col lg={6} xl={6}>
          <Field
            component={CheckInputLabel}
            label={props.label}
            name={props.nameProduto}
            index={props.chave}
          />
        </Col>
        <Col lg={6} xl={6}>
          <Field
            {...fieldMoney}
            component={InputLabelInLine}
            index={props.chave}
            placeholder="R$ 10,00"
            label="Valor"
            name={props.nameValor}
            style={{ marginTop: "-10px" }}
          />
        </Col>
      </Row>
    </Fragment>
  );
};
