import React, { Fragment, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { InputLabelInLine } from "components/Input/InputLabelInLine";

const TipoFornecimento = props => {
  const initialValue = { preco: "", uniforme: "" };
  const [produto, setPoduto] = useState("");
  const [payload, setPayload] = useState(initialValue);
  const [obrigar, setObrigar] = useState(false);

  useEffect(() => {
    setPoduto(props.produto);
  }, [payload, props]);

  const addValor = (valor, quantidade) => {
    props.addValor(valor.replace(",", "."), quantidade, props.chave, props.index);
    setPayload({ ...payload, preco: valor.replace(",", ".") });
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
      <Row className="tipo-fornecimento">
        <Col sm={4}>
          <p><strong>{props.uniforme.nome}</strong></p>
        </Col>
        <Col sm={4} className="tipo-fornecimento-valor">
          <InputLabelInLine
            autocomplete="off"
            className={obrigar ? "is-invalid" : null}
            onFocus={obrigar ? true : false}
            label="R$"
            style={{ marginTop: "-10px" }}
            type="number"
            value={props.valor}
            disabled={props.desabilitado}
            required={props.requerido}
            onChange={e => addValor(e.target.value, props.uniforme.quantidade)}
            onBlur={e => valorDevido(e.target.value)}
          />
        </Col>
        <Col sm={4} className="text-right tipo-fornecimento-quantidade">
          <div class="float-left">x {props.uniforme.quantidade}</div>
          <strong>R$:</strong> {props.total}
        </Col>
      </Row>
    </Fragment>
  );
};

export default TipoFornecimento;

