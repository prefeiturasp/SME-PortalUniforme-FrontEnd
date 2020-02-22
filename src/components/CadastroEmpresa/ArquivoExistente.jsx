import React, { useEffect } from "react";
import "./style.scss";

const ArquivoExistente = props => {
  useEffect(() => {}, [props]);
  return (
    <div className="file-existent">
      <div className="label">{props.label}</div>
      <a target="blank" href={props.arquivo.arquivo || props.arquivo}>
        Visualizar arquivo
      </a>
      {!props.proponenteStatus && (
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
