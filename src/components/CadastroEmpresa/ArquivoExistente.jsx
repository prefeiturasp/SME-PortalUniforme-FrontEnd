import React, { useEffect } from "react";
import "./style.scss";

const ArquivoExistente = props => {
  useEffect(() => {}, [props]);
  return (
    <div className="file-existent">
      <div className="label">{props.label}</div>
      <a target="blank" href={props.arquivo.arquivo}>
        Visualizar arquivo
      </a>
      <span
        onClick={() => props.removeAnexo(props.arquivo.uuid)}
        className="delete"
      >
        x
      </span>
    </div>
  );
};

export default ArquivoExistente;
