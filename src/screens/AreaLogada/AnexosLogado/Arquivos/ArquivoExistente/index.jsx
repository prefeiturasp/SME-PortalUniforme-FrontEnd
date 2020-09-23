import React, { useEffect } from "react";
import moment from "moment";
import "./style.scss";

export const ArquivoExistente = (props) => {
  useEffect(() => {}, [props]);
  return (
    <div className="file-existent pt-3">
      <div className="label">{props.label}</div>
      <div className="success-message">Arquivo enviado com sucesso!</div>
      <div className="row">
        {props.logado && (
          <div className="col-4">
            <span className="font-weight-bold">Status: </span>
            {props.arquivo.status === "PENDENTE"
              ? "PENDENTE APROVAÇÃO"
              : props.arquivo.status}
          </div>
        )}
        <div className="col-4">
          <a target="blank" href={props.arquivo.arquivo || props.arquivo}>
            Visualizar arquivo
          </a>
          {(["EM_PROCESSO"].includes(props.proponenteStatus) ||
            (["REPROVADO", "VENCIDO"].includes(props.arquivo.status) &&
              props.logado)) && (
            <span
              onClick={() =>
                props.lojaUuid
                  ? props.removeAnexo(props.lojaUuid)
                  : props.removeAnexo(props.arquivo.uuid)
              }
              className="delete"
            >
              x
            </span>
          )}
        </div>
        {props.arquivo.data_validade && (
          <div className="col-4">
            {moment(props.arquivo.data_validade).diff(moment(), "days") + 1 >=
              0 && (
              <div>
                <strong>Documento vence em: </strong>
                {moment(props.arquivo.data_validade).diff(moment(), "days") +
                  1}{" "}
                dias
              </div>
            )}
            {moment(props.arquivo.data_validade).diff(moment(), "days") + 1 <
              0 && (
              <div>
                <strong>Documento vencido a: </strong>
                {Math.abs(
                  moment(props.arquivo.data_validade).diff(moment(), "days") + 1
                )}{" "}
                dias
              </div>
            )}
          </div>
        )}
      </div>
      {props.logado && props.arquivo.justificativa && (
        <div>
          <span className="font-weight-bold">Justificativa: </span>
          {props.arquivo.justificativa}
        </div>
      )}
    </div>
  );
};
