import React, { Fragment, useState, useEffect } from "react";
import { AutoComplete } from "components/Input/AutoComplete";
import InputMask from "react-input-mask";
import { Form } from "react-bootstrap";

const LojaFisica = props => {
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");

  const updateEndereco = valor => {
    setEndereco(valor);
    const payload = { endereco: valor, telefone: telefone };
    props.onUpdate(payload, props.chave);
  };

  const updateTelefone = valor => {
    setTelefone(valor);
    const payload = { endereco: endereco, telefone: valor };
    props.onUpdate(payload, props.chave);
  };

  useEffect(() => {
    setTelefone(props.telefone);
    setEndereco(props.endereco);
  }, [props]);

  return (
    <Fragment>
      <div className="input">
        <Form.Group controlId="1">
          <span className="required-asterisk">* </span>
          <Form.Label>Endereço Físico</Form.Label>
          <Form.Control
            name={`loja.endereco_${props.chave}`}
            value={endereco}
            onChange={e => updateEndereco(e.target.value)}
            required
            placeholder="Digite o endereço físico da empresa"
          />
        </Form.Group>
      </div>
      {/* <AutoComplete
        name={`loja.endereco_${props.chave}`}
        value={endereco}
        onAddressSelected={e => updateEndereco(e.properties.label)}
      /> */}
      <div className="input">
        <Form.Group controlId="1">
          <span className="required-asterisk">* </span>
          <Form.Label>Telefone do Estabelecimento</Form.Label>
          <InputMask
            mask="(99) 9999-9999"
            onChange={e => updateTelefone(e.target.value)}
            value={telefone}
            className="form-control mb-2"
            placeholder="(11) 5555-6666"
            name={`loja.telefone_${props.chave}`}
          />
        </Form.Group>
      </div>
      <hr />
    </Fragment>
  );
};

export default LojaFisica;
