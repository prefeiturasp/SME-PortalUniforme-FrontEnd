import React, { useEffect } from "react";
import "./style.scss";

const ArquivoExistente = props => {
  useEffect(() => {}, [props]);
  return (
    <div className="file-existent">
      <div className="label">{props.label}</div>
      {props.arquivo.arquivo}
      <span className="delete">x</span>
    </div>
  );
};

export default ArquivoExistente;
