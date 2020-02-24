import React, { useState, useEffect } from "react";
import { InputLabelInLine } from "components/Input/InputLabelInLine";

const TipoFornecimento = props => {
  const initialValue = { preco: "", uniforme: "" };
  const [payload, setPayload] = useState(initialValue);
  const [obrigar, setObrigar] = useState(false);

  useEffect(() => {}, [payload, props]);

  const addValor = (valor, quantidade) => {
    props.addValor(
      valor.replace(",", "."),
      quantidade,
      props.chave,
      props.index
    );
    setPayload({ ...payload, preco: valor.replace(",", ".") });
  };

  const valorDevido = value => {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      (value && parseFloat(value) <= 0)
    ) {
      setObrigar(true);
    } else {
      setObrigar(false);
    }
  };

  return (
    <div className="row tipo-fornecimento">
      <div className="col-4">
        <p>{props.uniforme.nome}</p>
      </div>
      <div className="col-4 tipo-fornecimento-valor">
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
      </div>
      <div className="col-4 text-right tipo-fornecimento-quantidade">
        <div class="float-left">x {props.uniforme.quantidade}</div>
        <strong>R$:</strong> {props.total}
      </div>
    </div>
  );
};

export default TipoFornecimento;
