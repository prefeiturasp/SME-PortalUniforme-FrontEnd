import React, { Component, Fragment } from "react";
import StatefulMultiSelect from "@khanacademy/react-multi-select";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import Mapa from "components/Mapa";
import "./style.scss";
import { getLojasCredenciadas, getUniformes } from "services/uniformes.service";
import Select from "components/Select";
import { ORDENAR_OPCOES } from "./constants";
import { LoadingCircle } from "components/LoadingCircle";
import { QUANTIDADE_POR_PAGINA } from "components/Paginacao/constants";
import { Paginacao } from "components/Paginacao";
import { sortByParam, acrescentaTotalUniformes, getBadges } from "./helper";
import { AutoComplete } from "components/Input/AutoComplete";
import { required } from "helpers/fieldValidators";
import { formatarParaMultiselect } from "../ProcurarFornecedores/helper";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";

export class MapaDeFornecedores extends Component {
  constructor() {
    super();
    this.state = {
      lojas: null,
      pagina: 1,
      lojaHover: null,
      consultarNovamente: false,
      uniformes: null,
      tipoUniformeSelecionadosState: [],
      latitude: null,
      longitude: null,
      endereco: null,
    };
  }

  async componentDidMount() {
    const {
      latitude,
      longitude,
      tipoUniformeSelecionados,
      endereco,
    } = this.props.location.state;
    getLojasCredenciadas(latitude, longitude).then((response) => {
      this.setState({
        lojas: sortByParam(
          acrescentaTotalUniformes(response.data, tipoUniformeSelecionados),
          "distancia"
        ),
        latitude,
        longitude,
        endereco,
        tipoUniformeSelecionadosState: tipoUniformeSelecionados,
      });
    });
    const uniformes = await getUniformes();
    this.setState({ uniformes });
  }

  getLojasNovoEndereco = () => {
    const { latitude, longitude, tipoUniformeSelecionadosState } = this.state;
    this.props.change("endereco.endereco", "");
    this.setState({ consultarNovamente: false, lojas: null, pagina: 1 });
    getLojasCredenciadas(latitude, longitude).then((response) => {
      this.setState({
        lojas: sortByParam(
          acrescentaTotalUniformes(
            response.data,
            tipoUniformeSelecionadosState
          ),
          "distancia"
        ),
        latitude,
        longitude,
      });
    });
  };

  onSelectedChanged = (tipoUniformeSelecionadosState) => {
    this.setState({
      tipoUniformeSelecionadosState,
    });
  };

  handleAddressChange = (values) => {
    this.setState({
      latitude: values.latitude,
      longitude: values.longitude,
      endereco: values.endereco,
    });
  };

  setLojaHover(loja) {
    if (loja) this.setState({ lojaHover: loja.id });
    else this.setState({ lojaHover: null });
  }

  onSelectChanged(value) {
    const { lojas } = this.state;
    this.setState({ lojas: sortByParam(lojas, value) });
  }

  collapseLoja(id) {
    let lojas = this.state.lojas;
    lojas.forEach((loja) => {
      if (loja.id !== id) loja.ativo = false;
    });
    lojas.find((loja) => loja.id === id).ativo = !lojas.find(
      (loja) => loja.id === id
    ).ativo;
    this.setState({ lojas });
  }

  render() {
    const {
      latitude,
      longitude,
      endereco,
      lojas,
      pagina,
      lojaHover,
      consultarNovamente,
      tipoUniformeSelecionadosState,
      uniformes,
    } = this.state;
    return (
      <PaginaComCabecalhoRodape>
        <div className={`w-100 lojas-mais-proximas mt-5 ${!lojas && "opaco"}`}>
          <div className="container">
            <div className="col-lg-12 d-flex mb-lg-0">
              <h3 className="text-white">Lojas mais próximas</h3>
              <button
                size="lg"
                disabled={!lojas}
                className="btn btn-outline-primary pl-4 pr-4"
                onClick={() =>
                  this.props.history.push({
                    pathname: "/familia",
                  })
                }
              >
                <strong>voltar</strong>
              </button>
            </div>
          </div>
        </div>
        {!lojas && <LoadingCircle />}
        <div className={`w-100 bg-white h-100 ${!lojas && "opaco"}`}>
          <div className="container">
            <div className="row">
              {!lojas && (
                <div className="col-lg-6 col-sm-12 lojas">
                  Carregando lojas...
                </div>
              )}
              {lojas && lojas.length === 0 && !consultarNovamente && (
                <div className="text-dark col-lg-6 col-sm-12 lojas">
                  Infelizmente <strong>não há lojas</strong> credenciadas para
                  fornecimento do uniforme próximas da {endereco}.
                  <div className="pt-3 text-center">
                    <button
                      size="lg"
                      disabled={!lojas}
                      className="btn btn-outline-primary pl-4 pr-4"
                      onClick={() =>
                        this.setState({ consultarNovamente: true })
                      }
                    >
                      <strong>Consultar novamente</strong>
                    </button>
                  </div>
                </div>
              )}
              {consultarNovamente && (
                <div className="col-lg-6 col-sm-12 lojas">
                  <div className="text-dark pt-4">
                    Para encontrar as lojas fornecedoras de uniformes mais
                    próximas a você, basta informar abaixo seu endereço e quais
                    itens do uniforme você procura.
                  </div>
                  <form>
                    <div className="row pt-5">
                      <div className="field-endereco col-12">
                        <Field
                          component={AutoComplete}
                          label="Escreva o logradouro e número que você quer consultar *"
                          name="endereco.endereco"
                          required
                          validate={required}
                          esconderAsterisco
                          handleChange={this.handleAddressChange}
                          {...this.props}
                        />
                      </div>
                      <div className="field-uniforme col-12">
                        <label
                          htmlFor={"tipo_uniforme"}
                          className={`multiselect`}
                        >
                          Selecione itens do uniforme *
                        </label>
                        <Field
                          component={StatefulMultiSelect}
                          name="tipo_uniforme"
                          selected={tipoUniformeSelecionadosState}
                          options={formatarParaMultiselect(uniformes)}
                          onSelectedChanged={(values) =>
                            this.onSelectedChanged(values)
                          }
                          disableSearch={true}
                          overrideStrings={{
                            selectSomeItems: "Selecione",
                            allItemsAreSelected:
                              "Todos os itens estão selecionados",
                            selectAll: "Todos",
                          }}
                        />
                      </div>
                      <div className="btn-consultar text-center pt-3 col-12">
                        <button
                          size="lg"
                          className="btn btn-light pl-4 pr-4"
                          onClick={() => this.getLojasNovoEndereco()}
                        >
                          <strong>Consultar</strong>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              {lojas && lojas.length > 0 && !consultarNovamente && (
                <div className="text-dark col-lg-6 col-sm-12 lojas">
                  Essas são as <span>{lojas && lojas.length} lojas </span>
                  credenciadas que vendem os seguintes itens do uniforme escolar
                  (Bermuda, blusão de moletom, calça, camiseta, jaqueta, meia e
                  sapato) mais próximas da {endereco}.
                  <div className="row">
                    <div className="col-6 offset-6 col-sm-6 offset-sm-6 col-md-4 offset-md-8 pt-3">
                      <Select
                        options={ORDENAR_OPCOES}
                        naoDesabilitarPrimeiraOpcao
                        onChange={(event) =>
                          this.onSelectChanged(event.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="tabela-lojas">
                    <div className="tabela-header row">
                      <div className="col-12 col-sm-7">Nome</div>
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
                              <div
                                onMouseEnter={() => this.setLojaHover(loja)}
                                onMouseLeave={() => this.setLojaHover(null)}
                                className="row td"
                              >
                                <div className="col-7 font-weight-bold">
                                  <div className="row p-0">
                                    <div className="col-1 my-auto">
                                      <i
                                        onClick={() =>
                                          this.collapseLoja(loja.id)
                                        }
                                        className={`fas fa-${
                                          loja.ativo ? "minus" : "plus"
                                        }`}
                                      />
                                    </div>
                                    <div className="col-10">
                                      {loja.nome_fantasia.toUpperCase()}
                                      <div className="clique-mensagem">
                                        Clique no + para dados de contato
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {loja.ativo && (
                                <Fragment>
                                  <div className="row">
                                    <div className="col-12">
                                      <strong>Endereço: </strong>
                                      {loja.endereco}, {loja.numero} <br />
                                      {loja.bairro} - CEP: {loja.cep}
                                      <br />
                                      <div className="row">
                                        <div className="col-12 col-sm-6">
                                          <strong>Telefone: </strong>
                                          {loja.telefone}
                                        </div>
                                        <div className="col-12 col-sm-6">
                                          <strong>E-mail: </strong>
                                          {loja.email}
                                        </div>
                                        {loja.site && (
                                          <div className="col-12">
                                            <strong>Site: </strong>
                                            <a href={loja.site}>{loja.site}</a>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <table className="tabela-precos">
                                    <thead>
                                      <tr className="row">
                                        <th className="col-12">Item</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {loja.proponente.ofertas_de_uniformes
                                        .filter((uniforme) =>
                                          tipoUniformeSelecionadosState.includes(
                                            uniforme.item.split(" ")[0]
                                          )
                                        )
                                        .map((uniforme, key) => {
                                          return (
                                            <tr className="row" key={key}>
                                              <td className="col-12">
                                                {uniforme.item}
                                              </td>
                                            </tr>
                                          );
                                        })}
                                    </tbody>
                                  </table>
                                </Fragment>
                              )}
                            </div>
                          );
                        })}
                    {lojas && (
                      <div>
                        <Paginacao
                          onChange={(pagina) => this.setState({ pagina })}
                          total={lojas.length}
                        />
                      </div>
                    )}
                    <div className="pt-3 pb-3 text-center">
                      <button
                        size="lg"
                        disabled={!lojas}
                        className="btn btn-outline-primary pl-4 pr-4"
                        onClick={() =>
                          this.setState({ consultarNovamente: true })
                        }
                      >
                        <strong>Consultar novamente</strong>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-lg-6 col-sm-12 mapa-completo">
                {lojas ? (
                  <Mapa
                    lojaHover={lojaHover}
                    lojas={lojas}
                    tipoUniformeSelecionados={tipoUniformeSelecionadosState}
                    latitude={latitude}
                    longitude={longitude}
                  />
                ) : (
                  <div className="pt-4">Carregando mapa...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </PaginaComCabecalhoRodape>
    );
  }
}

MapaDeFornecedores = reduxForm({
  form: "MapaFornecedoresForm",
})(MapaDeFornecedores);

export default MapaDeFornecedores;
