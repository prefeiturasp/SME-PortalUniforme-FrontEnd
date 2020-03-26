import React, { Component } from "react";
import Mapa from "components/Mapa";
import "./style.scss";
import { getLojasCredenciadas } from "services/uniformes.service";
import Select from "components/Select";
import { ORDENAR_OPCOES } from "./constants";
import { LoadingCircle } from "components/LoadingCircle";
import { QUANTIDADE_POR_PAGINA } from "components/Paginacao/constants";
import { Paginacao } from "components/Paginacao";

export class MapaDeFornecedores extends Component {
  constructor() {
    super();
    this.state = {
      lojas: null,
      pagina: 1
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
    const { lojas, pagina } = this.state;
    return (
      <div>
        <div
          className={`w-100 sociedade-governo mt-5 ${!lojas &&
            "opaco"}`}
        >
          <div className="container">
            <div className="col-lg-12 mb-lg-0">
              <h3 className="text-white">Lojas mais próximas</h3>
            </div>
          </div>
        </div>
        {!lojas && <LoadingCircle />}
        <div className={`w-100 bg-light h-100 ${!lojas && "opaco"}`}>
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
                    lojas
                      .slice(
                        QUANTIDADE_POR_PAGINA * (pagina - 1),
                        QUANTIDADE_POR_PAGINA * pagina
                      )
                      .map((loja, key) => {
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
                  {lojas && <Paginacao
                    onChange={pagina => this.setState({ pagina })}
                    total={lojas.length}
                  />}
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
      </div>
    );
  }
}
export default MapaDeFornecedores;
