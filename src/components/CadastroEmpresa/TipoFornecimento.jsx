import React, { Fragment, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { InputLabelInLine } from "components/Input/InputLabelInLine";
import { CheckInputLabel } from "components/Input/CheckInputLabel";
import { fieldMoney } from "helpers/textMask";

const TipoFornecimento = props => {
  const initialValue = { preco: "", uniforme: "" };
  const [produto, setPoduto] = useState("");
  const [valor, setValor] = useState("");
  const [requerido, setRequerido] = useState(false);
  const [desabilitado, setDesabilitado] = useState(true);
  const [payload, setPayload] = useState(initialValue);
  const [obrigar, setObrigar] = useState(false);

  useEffect(() => {
    setPoduto(props.produto);
  }, [payload, props]);

  const addValor = valor => {
    setValor(valor);
    setPayload({ ...payload, preco: valor.replace(",", ".") });
    props.onUpdate(payload, props.chave);
  };

  const checkProduto = event => {
    if (event) {
      setDesabilitado(false);
      setRequerido(true);
      addUniforme();
    } else {
      setDesabilitado(true);
      setRequerido(false);
      delUniforme();
      setValor("");
      setObrigar(false);
    }
  };

  const addUniforme = () => {
    setPayload({ ...payload, uniforme: props.index });
    props.onUpdate(payload, props.chave);
  };

  const delUniforme = () => {
    setPayload(initialValue);
    props.onUpdate({}, props.chave);
  };

  const valorDevido = value => {
    if (value === null || value === undefined || value === "") {
      setObrigar(true);
    } else {
      setObrigar(false);
    }
  };

  return (
    <Fragment>
      <Row>
        <Col lg={4}>
          <CheckInputLabel
            label={produto}
            type="checkbox"
            onChange={e => checkProduto(e.target.checked)}
          />
        </Col>
        <Col lg={8}>
          <InputLabelInLine
            className={obrigar ? "is-invalid" : null}
            onFocus={obrigar ? true : false}
            label="Valor R$"
            style={{ marginTop: "-10px" }}
            placeholder="10,00"
            value={valor}
            disabled={desabilitado}
            required={requerido}
            onChange={e => addValor(e.target.value)}
            onBlur={e => valorDevido(e.target.value)}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default TipoFornecimento;

export const ProdutoValor = props => {
  return (
    <Fragment>
      <Row>
        <Col lg={5} xl={5}>
          {/* <Field
            {...props}
            component={CheckInputLabel}
            type="checkbox"
            label={props.label}
            name={`produtos_${props.chave}`}
          /> */}
          <CheckInputLabel
            label={props.label}
            type="checkbox"
            value={props.value}
          />
        </Col>
        <Col lg={7} xl={7}>
          {/* <Field
            {...fieldMoney}
            component={InputLabelInLine}
            placeholder="R$ 10,00"
            label="Valor"
            name={`valor_${props.chave}`}
            style={{ marginTop: "-10px" }}
          /> */}
          <InputLabelInLine
            label="Valor"
            style={{ marginTop: "-10px" }}
            placeholder="R$ 10,00"
            value={props.valor}
          />
        </Col>
      </Row>
    </Fragment>
  );
};
