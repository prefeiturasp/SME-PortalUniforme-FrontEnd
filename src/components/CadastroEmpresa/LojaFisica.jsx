import React, { Fragment, useState, useMemo } from "react";
import { Button } from "react-bootstrap";
import { Field } from "redux-form";
import { InputText } from "components/Input/InputText";
import { required } from "helpers/fieldValidators";
import { fieldTel } from "helpers/textMask";

const LojaFisica = props => {
  const [loja, setLoja] = useState([1]);

  const addLoja = key => {
    loja.push(key);
    setLoja([...loja]);
  };

  const delLoja = key => {
    console.log(loja);
    delete loja[key]
    console.log(loja);

    
  };

  const quantidadeLoja = useMemo(() => loja.length, [loja]);

  return (
    <Fragment>
      {loja.length
        ? loja.map((value, key) => {
            return (
              <>
                <Field
                  component={InputText}
                  label="Endereço"
                  name={`loja.endereco_${key}`}
                  key={key}
                  required
                  validate={required}
                  placeholder="Digite o endereço da loja física em São Paulo"
                />
                <Field
                  {...fieldTel}
                  component={InputText}
                  label="Telefone"
                  name={`loja.telefone_${key}`}
                  required
                  key={key}
                  validate={required}
                  placeholder="Digite o telefone da loja física em São Paulo"
                />
                {key > 0 ? (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => delLoja(key)}
                    block
                    type="button"
                  >
                    <i className="fas fa-trash" />
                  </Button>
                ) : null}
                <hr />
              </>
            );
          })
        : null}
      <Button
        type="button"
        onClick={() => addLoja(quantidadeLoja + 1)}
        variant="outline-primary"
        block
      >
        <i className="fas fa-plus-circle" /> Novo Endereço
      </Button>
    </Fragment>
  );
};

export default LojaFisica;
