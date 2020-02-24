import React, { useEffect } from "react";
import "./style.scss";

const ArquivoExistente = props => {
  useEffect(() => {}, [props]);
  return (
    <div className="file-existent pt-3">
      <div className="label">{props.label}</div>
      <div className="success-message">Arquivo enviado com sucesso!</div>
      <a target="blank" href={props.arquivo.arquivo || props.arquivo}>
        Visualizar arquivo
      </a>
      {props.proponenteStatus !== "INSCRITO" && (
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
  );
};

export default ArquivoExistente;
