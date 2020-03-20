import React, { Component, Fragment } from "react";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";
import BlocoTexto from "components/BlocoTexto";
import imgPecasUniforme from "img/pecas-uniforme.png";
import { getUniformes } from "services/uniformes.service";
import {
  busca_url_edital,
  busca_url_instrucao_normativa
} from "../../../services/uniformes.service";
import { AutoComplete } from "components/Input/AutoComplete";
import "./style.scss";
import { required } from "helpers/fieldValidators";

export class ProcurarFornecedores extends Component {
  constructor() {
    super();
    this.state = {
      uniformes: [],
      edital: {
        url: "",
        label: ""
      },
      instrucaoNormativa: {
        url: "",
        label: ""
      }
    };

    this.irParaFormulario = this.irParaFormulario.bind(this);
    this.editalClick = !this.state.edital.url
      ? e => {
          this.downloadEdital(e);
        }
      : null;
    this.get_edital_link();

    this.instrucaoNormativaClick = !this.state.instrucaoNormativa.url
      ? e => {
          this.downloadInstrucaoNormativa(e);
        }
      : null;
    this.get_instrucao_normativa_link();
  }

  async componentDidMount() {
    const uniformes = await getUniformes();
    this.setState({ uniformes });
  }

  get_edital_link = async () => {
    let edital = {};
    try {
      const url = await busca_url_edital();
      edital = {
        url: url,
        label: "[Link Edital]"
      };
    } catch (e) {
      edital = {
        url: "",
        label: "[Link Edital] (Em Breve)"
      };
    }
    this.setState({ edital: edital });
  };

  get_instrucao_normativa_link = async () => {
    let instrucaoNormativa = {};
    try {
      const url = await busca_url_instrucao_normativa();
      instrucaoNormativa = {
        url: url,
        label: "[Link Instrução Normativa]"
      };
    } catch (e) {
      instrucaoNormativa = {
        url: "",
        label: "[Link Instrução Normativa] (Em Breve)"
      };
    }
    this.setState({ instrucaoNormativa });
  };

  downloadEdital = e => {
    e.preventDefault();
    if (this.state.edital.url) {
      const link = document.createElement("a");
      link.href = this.state.edital.url;
      link.target = "_blank";
      link.click();
    }
  };

  downloadInstrucaoNormativa = e => {
    e.preventDefault();
    if (this.state.instrucaoNormativa.url) {
      const link = document.createElement("a");
      link.href = this.state.instrucaoNormativa.url;
      link.target = "_blank";
      link.click();
    }
  };

  irParaFormulario() {
    let path = `/cadastro`;
    this.props.history.push(path);
  }

  render() {
    const { uniformes } = this.state;
    return (
      <Fragment>
        <div className="busca-mapa">
          <div className="title">
            Encontre a loja credenciada mais próxima de você
          </div>
          <div className="subtitle">
            Para encontrar as lojas fornecedoras dos uniformes mais próximas a
            você, basta informar <br /> abaixo seu endereço e quais itens do
            uniforme você procura.
          </div>
          <form>
            <Field
              component={AutoComplete}
              label="Endereço"
              name="endereco.endereco"
              required
              validate={required}
              handleChange={this.handleAddressChange}
              {...this.props}
            />
          </form>
        </div>
        <div id="conteudo" className="w-100 home">
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-6">
                <BlocoTexto title="Por que o modelo de compra de uniforme mudou?">
                  <div className="justify-content-lg-end justify-content-center">
                    O uniforme escolar, em geral, era comprado de forma
                    centralizada pela Prefeitura e distribuído aos estudantes
                    nas escolas. Esse modelo de compra tinha como desvantagens
                    dificuldades em encontrar fornecedores que oferecessem
                    produtos de qualidade aliados a bom preço, seguindo as
                    regras do processo de compra pública (chamado de licitação).
                    Outro fator complicador era de os estudantes não poderem
                    provar o uniforme antes da compra (causando problemas na
                    escolha do tamanho adequado para cada peça) e a complexa
                    logística de distribuição (que aumentava o risco de atraso
                    na entrega).
                  </div>
                </BlocoTexto>
              </div>
              <div className="col-lg-6 mb-lg-0">
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe
                    title="Vídeo sobre o Portal do Uniforme"
                    src="https://www.youtube.com/embed/R591jitkIOw"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-100 cidade-precisa">
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-6 col-sm-12 d-flex justify-content-lg-end justify-content-center">
                <img
                  src={imgPecasUniforme}
                  alt="Peças do uniforme escolar"
                  className="img-fluid"
                />
              </div>
              <div className="col-lg-6 col-sm-12 mb-lg-0">
                <BlocoTexto title="Quais foram as mudanças?">
                  As famílias terão mais liberdade de escolha! O kit padrão do
                  uniforme escolar é composto por:
                  <ul className="lista-home pt-2 ml-0 pl-0">
                    {uniformes &&
                      uniformes.map(uniforme => {
                        return <li key={uniforme.id}>{uniforme.nome}</li>;
                      })}
                  </ul>
                </BlocoTexto>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          Agora, cada família poderá compor o kit da forma que for mais adequada
          a cada estudante, consideradas suas necessidades específicas e
          respeitado o padrão das peças aprovado pela Secretaria Municipal de
          Educação e o valor limite de R$ 215 disponibilizado. <br /> A compra
          será feita diretamente pelas famílias nas lojas credenciadas, a partir
          de um sistema de crédito. O(a) responsável legal pelo estudante não
          receberá diretamente os R$ 215 do kit do uniforme escolar na sua
          conta, mas sim terá direito a gastar esse valor adquirindo o uniforme
          escolar nas lojas autorizadas (e são elas que farão a prestação de
          contas à Prefeitura).
        </div>
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-6">
              <BlocoTexto title="Ajude a Prefeitura a garantir a qualidade do uniforme">
                <div className="justify-content-lg-end justify-content-center">
                  As lojas credenciadas para a venda do uniforme escolar
                  precisam seguir o padrão estabelecido pela Secretaria
                  Municipal de Educação, tanto no que diz respeito aos modelos,
                  cores, quanto à qualidade do material. Para saber como
                  conferir se os produtos vendidos estão de fato cumprindo com
                  todas as exigências, veja as dicas neste vídeo:
                </div>
              </BlocoTexto>
            </div>
            <div className="col-lg-6 mb-lg-0">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  title="Vídeo sobre o Portal do Uniforme"
                  src="https://www.youtube.com/embed/R591jitkIOw"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-3">
          <BlocoTexto title="Problemas na compra do uniforme">
            <div className="justify-content-lg-end justify-content-center">
              Em caso de problemas como possíveis falhas na confecção das peças,
              entre em contato com a loja onde produto foi adquirido. Para
              situações sem solução direta com o lojista, informe à Prefeitura
              nos Canais de Atendimento do SP 156 ou recorra a qualquer órgão de
              defesa do consumidor.
            </div>
          </BlocoTexto>
          <div className="text-center pt-3 pb-3">
            <button
              size="lg"
              className="btn btn-primary pl-4 pr-4"
              onClick={this.irParaFormulario}
            >
              <strong>Avise sobre problemas</strong>
            </button>
          </div>
        </div>
        <div className="w-100 sociedade-governo text-white text-center mt-5">
          <div className="container">
            <div className="col-lg-12 mb-4 mb-lg-0">
              <h3 className="mb-4">Não perca tempo, solicite já o uniforme!</h3>
              <p className="mb-0">
                <button
                  size="lg"
                  className="btn btn-light pl-4 pr-4"
                  onClick={this.irParaFormulario}
                >
                  <strong>Solicite o uniforme</strong>
                </button>
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

ProcurarFornecedores = reduxForm({
  // a unique name for the form
  form: "ProcurarFornecedoresForm"
})(ProcurarFornecedores);

export default ProcurarFornecedores;
