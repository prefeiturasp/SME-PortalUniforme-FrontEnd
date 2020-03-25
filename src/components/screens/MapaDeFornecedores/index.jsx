import React, { Component, Fragment } from "react";
import Mapa from "components/Mapa";
import "./style.scss";
import { getLojasCredenciadas } from "services/uniformes.service";
import Select from "components/Select";
import { ORDENAR_OPCOES } from "./constants";

export class MapaDeFornecedores extends Component {
  constructor() {
    super();
    this.state = {
      lojas: null
    };
  }

  componentDidMount() {
    const { latitude, longitude } = this.props.location.state;
    getLojasCredenciadas(latitude, longitude).then(response => {
      this.setState({ lojas: response.data });
    });
  }

  render() {
    const {
      latitude,
      longitude,
      tipoUniformeSelecionados,
      endereco
    } = this.props.location.state;
    const { lojas } = this.state;
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
                Essas são as <span>{lojas && lojas.length} lojas </span>
                credenciadas que vendem os seguintes itens do uniforme escolar
                (Bermuda, blusão de moletom, calça, camiseta, jaqueta, meia e
                sapato) mais próximas da {endereco}.
                <div className="row">
                  <div className="col-4 offset-8 pt-3">
                    <Select
                      options={ORDENAR_OPCOES}
                      naoDesabilitarPrimeiraOpcao
                    />
                  </div>
                </div>
                <div className="tabela-lojas">
                  <div className="tabela-header row">
                    <div className="col-7">Nome</div>
                    <div className="col-5">Itens de uniforme disponíveis</div>
                  </div>
                  {lojas &&
                    lojas.map((loja, key) => {
                      return (
                        <div key={key} className="loja-collapse">
                          <div className="row">
                            <div className="col-7 font-weight-bold">
                              {loja.nome_fantasia.toUpperCase()}
                              <div className="clique-mensagem">
                                Clique no + para dados de contato e preço
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="col-lg-6 col-sm-12 mapa-completo">
                {lojas && (
                  <Mapa
                    lojas={lojas}
                    tipoUniformeSelecionados={tipoUniformeSelecionados}
                    latitude={latitude}
                    longitude={longitude}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default MapaDeFornecedores;
