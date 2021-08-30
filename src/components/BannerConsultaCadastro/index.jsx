import React, { Component } from "react";
import endPoint from "../../constants/endPonts.constants";
import "./style.scss";

export class BannerConsultaCadastro extends Component {
  render() {
    return (
      <div className="banner-consulta-cadastro">
        <div className="titulo-banner">
          Verifique se seu cadastro está correto para comprar o uniforme.
        </div>

        <div className="botao-container">
          <a className="botao-banner" href={endPoint.CONSULTA_CADASTRO_URL}>Clique Aqui</a>
        </div>
      </div>
    );
  }
}

export default BannerConsultaCadastro;
