import { InputText } from "components/Input/InputText";
import React, { useEffect, useState } from "react";
import { Field } from "react-final-form";
import { getTiposFornecimentos } from "services/uniformes.service";
import { getPrecoVezesQuantidade, getTotal } from "./helpers";
import "./style.scss";

export const TabelaPrecos = ({ form, values }) => {
  const [tiposDeUniforme, setTiposDeUniforme] = useState(null);

  useEffect(() => {
    getTiposFornecimentos().then((response) => {
      console.log(response);
      setTiposDeUniforme(response);
    });
  }, []);

  return (
    <div className="card mt-3 tabela-precos">
      <div className="card-body">
        <h2>Preços máximos por item (fornecimento)</h2>
        <h3 className="mt-2">Tipo de Fornecimento</h3>
        <hr />
        {tiposDeUniforme && (
          <div className="row">
            {tiposDeUniforme.map((tipoDeUniforme) => {
              return (
                <div className="col-6">
                  <label className="produto col-sm-6 col-12 my-auto">
                    <Field
                      onClick={() => {
                        values[tipoDeUniforme.id] &&
                          tipoDeUniforme.uniformes.forEach((uniforme) => {
                            values[uniforme.nome] = undefined;
                          });
                      }}
                      name={`${tipoDeUniforme.id}`}
                      checked={values[tipoDeUniforme.id]}
                      component="input"
                      type="checkbox"
                    />{" "}
                    {tipoDeUniforme.nome}
                  </label>
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
                              />
                            </div>
                            <div className="col-3">x {uniforme.quantidade}</div>
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
