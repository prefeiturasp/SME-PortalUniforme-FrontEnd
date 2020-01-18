import React, { Fragment, useState, useMemo, useEffect } from "react";
import { Button } from "react-bootstrap";
import { AutoComplete } from "components/Input/AutoComplete";
import InputMask from "react-input-mask";

const LojaFisica = props => {
  const [loja, setLoja] = useState([{endereco: "", telefone: ""}]);

  const addLoja = () => {
    loja.push({endereco: "", telefone: ""});
    setLoja([...loja]);
  };

  const delLoja = key => {
    loja.splice(key, 1);
    setLoja([...loja]);
  };

  useEffect(() => {
    console.log(loja);
  });

  return (
    <Fragment>
      {loja
        ? loja.map((valor, chave) => {
            return (
              <>
                <AutoComplete
                  name="endereco"
                  value={""}
                  key={chave}
                  onAddressSelected={e => console.log(e.properties.label)}
                />
                <InputMask
                  mask="(99) 9999-9999"
                  onChange={e => {valor = e.target.value}}
                  // value={valor}
                  key={chave}
                  className="form-control mb-2"
                  placeholder="(11) 5555-6666"
                />
                
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => delLoja(chave)}
                    block
                    type="button"
                  >
                    <i className="fas fa-trash" />
                  </Button>
                <hr />
              </>
            );
          })
        : null}
      <Button
        type="button"
        onClick={() => addLoja()}
        variant="outline-primary"
        block
      >
        <i className="fas fa-plus-circle" /> Novo Endereço
      </Button>
    </Fragment>
  );
};

export default LojaFisica;
