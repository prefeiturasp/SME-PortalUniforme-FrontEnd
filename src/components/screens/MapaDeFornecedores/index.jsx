import React, { Component, Fragment } from "react";
import Mapa from "components/Mapa";
import "./style.scss";

export class MapaDeFornecedores extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      latitude,
      longitude,
      tipoUniformeSelecionados
    } = this.props.location.state;
    return (
      <Fragment>
        <div className="w-100 sociedade-governo text-white mt-5">
          <div className="container">
            <div className="col-lg-12 mb-lg-0">
              <h3>Lojas mais próximas</h3>
            </div>
          </div>
        </div>
        <div className="w-100 bg-light h-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-sm-12 lojas">
                Essas são as 10 lojas credenciadas que vendem os seguintes itens
                do uniforme escolar (Bermuda, blusão de moletom, calça,
                camiseta, jaqueta, meia e sapato) mais próximas da Rua Diogo de
                Faria, 1247.
              </div>
              <div className="col-lg-6 col-sm-12 mapa-completo">
                <Mapa
                  tipoUniformeSelecionados={tipoUniformeSelecionados}
                  latitude={latitude}
                  longitude={longitude}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default MapaDeFornecedores;
