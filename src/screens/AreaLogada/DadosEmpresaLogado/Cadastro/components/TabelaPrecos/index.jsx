import { InputText } from "components/Input/InputText";
import { CheckInputLabel } from "components/Input/CheckInputLabel";
import {
  somenteNumeros,
  somenteValoresPositivos,
  composeValidators,
} from "helpers/fieldValidators";
import React, { useState, useEffect } from "react";
import { Field } from "react-final-form";
import { getPrecoVezesQuantidade, getTotal, maiorQueLimite, limparValues } from "./helpers";
import "./style.scss";

export const TabelaPrecos = ({ form, values, empresa, tiposDeUniforme, limites }) => {
  const [checks, setChecks] = useState({});

  const checkProduto = (event, tipoDeUniforme) => {
    if (event) {
      setChecks({...checks, [tipoDeUniforme.id]:true})
    } else {
      setChecks({...checks, [tipoDeUniforme.id]:false})
      limparValues(form, tipoDeUniforme, values);
    }
  };

  const selecionado = (tipoUniformeId) => {
    return empresa && empresa.ofertas_de_uniformes.find(
      (oferta) => oferta.uniforme_categoria === tipoUniformeId) && !checks.hasOwnProperty(tipoUniformeId)
    ? true
    : checks[tipoUniformeId]
  }

  return (
    <div className="card mt-3 tabela-precos">
      <div className="card-body">
        <h2>Preços máximos por item (fornecimento)</h2>
        <h3 className="mt-2">
          Tipo de Fornecimento
        </h3>
        <hr />
        {tiposDeUniforme && limites && (
          <div className="row">
            {tiposDeUniforme
              .filter((tipo) => tipo.uniformes.length > 0)
              .map((tipoDeUniforme) => {
                return (
                  <div className="col-6">
                    <CheckInputLabel
                      id={tipoDeUniforme.id}
                      label={tipoDeUniforme.nome}
                      key={tipoDeUniforme.id}
                      type="checkbox"
                      onChange={(e) => checkProduto(e.target.checked, tipoDeUniforme)}
                      checked={
                        selecionado(tipoDeUniforme.id)}
                    />
                    {tipoDeUniforme.uniformes.map((uniforme) => {
                      return (
                        <div className="row mt-3">
                          <div className="col-3">{uniforme.nome}</div>
                          <div className="col-6">
                            <div className="row">
                              <div className="col-3 text-right">R$ </div>
                              <div className="col-6">
                                <Field
                                  name={uniforme.nome}
                                 component={InputText} 
                                  required={checks[tipoDeUniforme.id]}
                                  validate={composeValidators(
                                    somenteNumeros,
                                    somenteValoresPositivos
                                  )}
                                  disabled={!selecionado(tipoDeUniforme.id)}
                                  
                                />
                              </div>
                              <div className="col-3">
                                x {uniforme.quantidade}
                              </div>
                            </div>
                          </div>
                          <div className="col-3">
                            R$ {getPrecoVezesQuantidade(values, uniforme)}
                          </div>
                        </div>
                      );
                    })}
                    <div className="row">
                      <div className="col-9 font-weight-bold text-right">
                        Total:
                      </div>
                      <div className="col-3">
                        R$ {getTotal(tipoDeUniforme, values)}
                      </div>
                    </div>
                    <div className="text-danger">
                      {maiorQueLimite(tipoDeUniforme, values, limites) &&
                        `Valor maior que limite: ${maiorQueLimite(
                          tipoDeUniforme,
                          values,
                          limites
                        )}`}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
