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

  return (
    <div className="row tipo-fornecimento">
      <div className="col-md-4 col-12">
        <p>{props.uniforme.nome}</p>
      </div>
      <div className="col-md-4 col-12 tipo-fornecimento-valor">
        <InputLabelInLine
          autoComplete="off"
          className={obrigar ? "is-invalid" : null}
          onFocus={obrigar ? true : false}
          label="R$"
          style={{ marginTop: "-10px" }}
          type="number"
          onKeyDown={evt => evt.key === "e" && evt.preventDefault()}
          value={props.valor}
          disabled={props.desabilitado}
          required={false}
          onChange={e => addValor(e.target.value, props.uniforme.quantidade)}
          //onBlur={e => valorDevido(e.target.value)}
        />
      </div>
      <div className="col-md-4 col-12 text-right tipo-fornecimento-quantidade">
        <div className="float-left">x {props.uniforme.quantidade}</div>
        <strong>R$:</strong>{" "}
        {props.total
          ? props.total
              .toFixed(2)
              .toString()
              .replace(".", ",")
          : "0,00"}
      </div>
    </div>
  );
};

export default TipoFornecimento;
