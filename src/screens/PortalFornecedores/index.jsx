import React, { Component } from "react";
import BlocoTexto from "components/BlocoTexto";
import imgFachadaLoja from "img/fachada-loja.png";
import imgPecasUniforme from "img/pecas-uniforme.png";
import imgDesenhoFornecedor from "img/desenho-fornecedor.png";
import imgEMEFViniciusDeMoraes from "img/emef_vinicius_de_moraes.jpg";
import imgEMEFNeirAugusto from "img/emef_neir_augusto.jpg";
import { getUniformesPorCategoria } from "services/uniformes.service";
import {
  busca_url_edital,
  busca_url_instrucao_normativa,
} from "../../services/uniformes.service";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import "./style.scss";

export default class PortalFornecedores extends Component {
  constructor() {
    super();
    this.state = {
      categorias: [],
      edital: {
        url: "",
        label: "",
      },
      instrucaoNormativa: {
        url: "",
        label: "",
      },
    };

    this.irParaFormulario = this.irParaFormulario.bind(this);
    this.editalClick = !this.state.edital.url
      ? (e) => {
          this.downloadEdital(e);
        }
      : null;
    this.get_edital_link();

    this.instrucaoNormativaClick = !this.state.instrucaoNormativa.url
      ? (e) => {
          this.downloadInstrucaoNormativa(e);
        }
      : null;
    this.get_instrucao_normativa_link();
  }

  async componentDidMount() {
    const categorias = await getUniformesPorCategoria();
    this.setState({ categorias });
  }

  get_edital_link = async () => {
    let edital = {};
    try {
      const url = await busca_url_edital();
      edital = {
        url: url,
        label: "[Link Edital]",
      };
    } catch (e) {
      edital = {
        url: "",
        label: "[Link Edital] (Em Breve)",
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
        label: "[Link Instrução Normativa]",
      };
    } catch (e) {
      instrucaoNormativa = {
        url: "",
        label: "[Link Instrução Normativa] (Em Breve)",
      };
    }
    this.setState({ instrucaoNormativa });
  };

  downloadEdital = (e) => {
    e.preventDefault();
    if (this.state.edital.url) {
      const link = document.createElement("a");
      link.href = this.state.edital.url;
      link.target = "_blank";
      link.click();
    }
  };

  downloadInstrucaoNormativa = (e) => {
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
    const { categorias } = this.state;
    return (
      <PaginaComCabecalhoRodape>
        <div className="w-100 oferta-imoveis position-relative">
          <div className="container">
            <div className="conteudo">
              <div className="col-lg-8 col-sm-12 col-xl-6">
                <h1>
                Contribua com a educação do nosso município e torne-se um 
                fornecedor de uniformes escolares.
                </h1>
                <p>
                  Leia o regulamento, veja se sua loja está de acordo com os 
                  critérios necessários para o credenciamento e faça a 
                  diferença na educação de nossos estudantes. <br />
                  Além disso, você poderá comercializar os uniformes sem pagar 
                  nenhuma taxa para a empresa que gerencia as transações 
                  financeiras!
                </p>
                <img
                  src={imgDesenhoFornecedor}
                  width="100%"
                  alt="Fornecedor"
                  className="desenho-fornecedor img-fluid rounded"
                />
                <a
                  className="saiba-mais btn btn-primary pl-5 pr-5"
                  href="#conteudo"
                >
                  Saiba Mais
                </a>
              </div>
            </div>
          </div>
        </div>

        <div id="conteudo" className="w-100 home">
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-6 mb-lg-0 mt-5">
                <img
                  src={imgFachadaLoja}
                  alt="Fachada de uma lojinha de roupas"
                  className="img-fluid rounded"
                />
                <img
                  className="pt-3"
                  src={imgEMEFViniciusDeMoraes}
                  alt="EMEF Vinicius de Moraes"
                  width="100%"
                />
              </div>
              <div className="col-lg-6">
                <BlocoTexto title="O que é necessário para ser fornecedor?">
                  <div className="justify-content-lg-end justify-content-center">
                    <p className="mb-1">
                      Para ser credenciado, o comerciante deve:
                    </p>
                    <ul className="lista-home ml-0 pl-0 mb-2">
                      <li>Ser pessoa Jurídica com objeto social compatível ao fornecimento; </li>
                      <li>
                        Possuir toda a documentação válida conforme as condições
                        do
                        <a
                          href={this.state.edital.url}
                          onClick={this.editalClick}
                        >
                          <strong> Edital</strong>
                        </a>
                        ;
                      </li>
                      <li>
                        Conhecer e concordar com as regras previstas no{" "}
                        <a
                          href={this.state.edital.url}
                          onClick={this.editalClick}
                        >
                          <strong> Edital </strong>
                        </a>
                        de Credenciamento;
                      </li>
                      <li>
                        Responsabilizar-se por todas as informações fornecidas;
                      </li>
                      <li>
                        Possuir stand de vendas ou loja física na cidade de São
                        Paulo;
                      </li>
                      <li>
                        Emitir Nota Fiscal Eletrônica ou Cupom Fiscal 
                        Eletrônico no CPF do(a) responsável legal pelo(a) aluno(a); 
                      </li>
                      <li>
                        Comprometer-se em fornecer os itens com a qualidade
                        exigida nas especificações técnicas;
                      </li>
                      <li>Estar ciente das hipóteses de descredenciamento;</li>
                      <li>Estar ciente das penalidades previstas;</li>
                    </ul>
                    <p className="mb-2">
                      Veja todas as condições necessárias abaixo:
                    </p>
                    <p>
                      <a
                        href={this.state.instrucaoNormativa.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={this.instrucaoNormativaClick}
                      >
                        <strong>{this.state.instrucaoNormativa.label}</strong>
                      </a>
                    </p>
                    <p>
                      <a
                        href="http://legislacao.prefeitura.sp.gov.br/leis/decreto-44279-de-24-de-dezembro-de-2003"
                      >
                        <strong>[Link Dec. Municipal 44.279/2003]</strong>
                      </a>
                    </p>
                    <p>
                      <a
                        href={this.state.edital.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={this.editalClick}
                      >
                        <strong>{this.state.edital.label}</strong>
                      </a>
                    </p>
                  </div>
                </BlocoTexto>
              </div>
            </div>
          </div>
        </div>

        <div className="w-100 cidade-precisa">
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-6 col-sm-12">
                <BlocoTexto title="Quais itens compõem o kit padrão de uniforme escolar sugerido pela Secretaria Municipal de Educação?">
                  <div className="row">
                    {categorias &&
                      categorias
                        .filter((categoria) => categoria.itens.length > 0)
                        .map((categoria) => {
                          return (
                            <div className="col-12">
                              <ul className="lista-home">
                                {categoria.itens.map((item) => {
                                  return <li key={item.nome}>{item.nome}</li>;
                                })}
                              </ul>
                            </div>
                          );
                        })}
                  </div>
                </BlocoTexto>
              </div>
              <div className="col-lg-6 col-sm-12 d-flex justify-content-lg-end justify-content-center">
                <img
                  src={imgPecasUniforme}
                  alt="Peças do uniforme escolar"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-3">
        Cada família poderá compor o kit da forma que for mais adequada a cada estudante, consideradas suas necessidades 
        específicas e respeitado o padrão das peças aprovadas pela Secretaria Municipal de Educação e o valor limite 
        disponibilizado por estudante. 
        </div>
        <div className="w-100 mb-5 mt-5">
          <div className="container">
            <BlocoTexto title="O que acontece depois de se cadastrar?">
              <p>
                Você receberá um número de protocolo para identificação da
                solicitação. Caso esteja dentro dos critérios, será notificado
                com o resultado da análise da área técnica quanto à
                possibilidade de fornecimento dos uniformes escolares.
              </p>
            </BlocoTexto>
            <img
              className="pt-3"
              src={imgEMEFNeirAugusto}
              alt="EMEF Vinicius de Moraes"
              width="100%"
            />
          </div>
        </div>
        <div className="w-100 faq text-center mt-5">
          <div className="container">
            <div className="col-lg-12 mb-4 mb-lg-0">
              <h3 className="text-white mb-4">
                Ainda com dúvidas? Acesse o nosso FAQ
              </h3>
              <a
                className="pb-0"
                href="https://educacao.sme.prefeitura.sp.gov.br/perguntas-frequentes-dos-interessados-em-se-cadastrar-para-vender-uniforme-escolar-as-familias/"
              >
                <button size="lg" className="btn btn-light pl-4 pr-4">
                  <strong>FAQ</strong>
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="w-100 sociedade-governo text-center">
          <div className="container">
            <div className="col-lg-12 mb-4 mb-lg-0">
              <h3 className="text-white mb-4">
                Possui as condições necessárias? Então cadastre-se e se torne um
                fornecedor.
              </h3>
              <p className="mb-0">
                <button
                  size="lg"
                  className="btn btn-light pl-4 pr-4"
                  onClick={this.irParaFormulario}
                >
                  <strong>Cadastre sua Loja</strong>
                </button>
              </p>
            </div>
          </div>
        </div>
      </PaginaComCabecalhoRodape>
    );
  }
}
