import React, { Fragment, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { InputLabelInLine } from "components/Input/InputLabelInLine";
import { CheckInputLabel } from "components/Input/CheckInputLabel";

const TipoFornecimento = props => {
  const initialValue = { preco: "", uniforme: "" };
  const [produto, setPoduto] = useState("");
  const [valor, setValor] = useState("");
  const [requerido, setRequerido] = useState(false);
  const [desabilitado, setDesabilitado] = useState(true);
  const [payload, setPayload] = useState(initialValue);
  const [obrigar, setObrigar] = useState(false);
  const [checado, SetChecado] = useState(false)

  useEffect(() => {
    setPoduto(props.produto);
    limpafornecimento();
  }, [payload, props]);

  const limpafornecimento = () => {
    if (props.limpar) {
      setValor("");
      setDesabilitado(true);
      setRequerido(false);
      delUniforme();
      SetChecado(false)
      props.setLimpar(false)
    }
  };


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
      SetChecado(true)
    } else {
      SetChecado(false)
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
            checked={checado}
          />
        </Col>
        <Col lg={8}>
          <InputLabelInLine
            className={obrigar ? "is-invalid" : null}
            onFocus={obrigar ? true : false}
            label="Valor R$"
            style={{ marginTop: "-10px" }}
            type="number"
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

