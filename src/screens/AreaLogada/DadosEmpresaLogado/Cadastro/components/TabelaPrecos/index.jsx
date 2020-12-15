import { InputText } from "components/Input/InputText";
import {
  somenteNumeros,
  somenteValoresPositivos,
  composeValidators,
} from "helpers/fieldValidators";
import React from "react";
import { Field } from "react-final-form";
import { getPrecoVezesQuantidade, getTotal, maiorQueLimite } from "./helpers";
import "./style.scss";

export const TabelaPrecos = ({ form, values, tiposDeUniforme, limites }) => {
  return (
    <div className="card mt-3 tabela-precos">
      <div className="card-body">
        <h2>Item(ns) para fornecimento</h2>
        <h3 className="mt-2">
          Itens que compõem o kit padrão de uniforme escolar sugerido pela SME
          (escolher ao menos uma opção)
        </h3>
        <hr />
        {tiposDeUniforme && limites && (
          <div className="row">
            {tiposDeUniforme
              .filter((tipo) => tipo.uniformes.length > 0)
              .map((tipoDeUniforme) => {
                return (
                  <div className="col-6">
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
                                  disabled={!values[tipoDeUniforme.id]}
                                  required={
                                    limites.find(
                                      (value) =>
                                        value.categoria_uniforme ===
                                        tipoDeUniforme.id
                                    ).obrigatorio
                                  }
                                  validate={composeValidators(
                                    somenteNumeros,
                                    somenteValoresPositivos
                                  )}
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
