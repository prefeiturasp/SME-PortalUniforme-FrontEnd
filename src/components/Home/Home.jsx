import React, { Component, Fragment } from 'react'
import BlocoTexto from 'components/BlocoTexto'
import imgFachadaLoja from 'img/fachada-loja.png'
import imgPecasUniforme from 'img/pecas-uniforme.png'
import { getUniformes } from 'services/uniformes.service'
import {
  busca_url_edital,
  busca_url_instrucao_normativa
} from '../../services/uniformes.service'

import './home.scss'

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      uniformes: [],
      edital: {
        url: '',
        label: ''
      },
      instrucaoNormativa: {
        url: '',
        label: ''
      }
    }

    this.irParaFormulario = this.irParaFormulario.bind(this)
    this.editalClick = !this.state.edital.url
      ? e => {
          this.downloadEdital(e)
        }
      : null
    this.get_edital_link()

    this.instrucaoNormativaClick = !this.state.instrucaoNormativa.url
      ? e => {
          this.downloadInstrucaoNormativa(e)
        }
      : null
    this.get_instrucao_normativa_link()
  }

  async componentDidMount() {
    const uniformes = await getUniformes()
    this.setState({ uniformes })
  }

  get_edital_link = async () => {
    let edital = {}
    try {
      const url = await busca_url_edital()
      edital = {
        url: url,
        label: '[Link Edital]'
      }
    } catch (e) {
      edital = {
        url: '',
        label: '[Link Edital] (Em Breve)'
      }
    }
    this.setState({ edital: edital })
  }

  get_instrucao_normativa_link = async () => {
    let instrucaoNormativa = {}
    try {
      const url = await busca_url_instrucao_normativa()
      instrucaoNormativa = {
        url: url,
        label: '[Link Instrução Normativa]'
      }
    } catch (e) {
      instrucaoNormativa = {
        url: '',
        label: '[Link Instrução Normativa] (Em Breve)'
      }
    }
    this.setState({ instrucaoNormativa })
  }

  downloadEdital = e => {
    e.preventDefault()
    if (this.state.edital.url) {
      const link = document.createElement('a')
      link.href = this.state.edital.url
      link.target="_blank"
      link.click()
    }
  }

  downloadInstrucaoNormativa = e => {
    e.preventDefault()
    if (this.state.instrucaoNormativa.url) {
      const link = document.createElement('a')
      link.href = this.state.instrucaoNormativa.url
      link.target="_blank"
      link.click()
    }
  }

  irParaFormulario() {
    let path = `/cadastro`
    this.props.history.push(path)
  }

  render() {
    const { uniformes } = this.state
    return (
      <Fragment>
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
                  critérios necessários para o credenciamento e faça a diferença
                  na educação de nossos estudantes.
                </p>
                <a className="btn btn-primary pl-5 pr-5" href="#conteudo">
                  Saiba Mais
                </a>
              </div>
            </div>
          </div>
        </div>

        <div id="conteudo" className="w-100 home">
          <div className="container">
            <div className="row mt-5">
              <div className="col-lg-6 mb-lg-0">
                <img
                  src={imgFachadaLoja}
                  alt="Fachada de uma lojinha de roupas"
                  className="img-fluid rounded"
                />
              </div>
              <div className="col-lg-6">
                <BlocoTexto title="O que é necessário para ser fornecedor?">
                  <div className="justify-content-lg-end justify-content-center">
                    <p className="mb-1">
                      Para ser credenciado, o comerciante deve:
                    </p>
                    <ul className="lista-home ml-0 pl-0 mb-2">
                      <li>Ser pessoa Jurídica;</li>
                      <li>
                        Possuir toda a documentação válida conforme as condições
                        do
                        <a
                          className="links-intrucoes"
                          href={this.state.edital.url}
                          onClick={this.editalClick}
                        >
                          <strong> Edital</strong>
                        </a>
                        ;
                      </li>
                      <li>
                        Conhecer e concordar com as regras previstas no{' '}
                        <a
                          className="links-intrucoes"
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
                      <li>Fornecer os itens pelo valor máximo determinado;</li>
                      <li>Emitir Nota Fiscal Eletrônica;</li>
                      <li>
                        Comprometer-se em fornecer os itens com a qualidade
                        exigida nas especificações técnicas;
                      </li>
                      <li>Estar ciente das hipóteses de descredenciamento;</li>
                      <li>Estar ciente das penalidades previstas;</li>
                      <li>
                      Concordar com a taxa de 0,8% sobre o valor das transações a serem realizadas pela operadora do “meio de pagamento”.
                      </li>
                    </ul>
                    <p className="mb-2">
                      Veja todas as condições necessárias abaixo:
                    </p>
                    <p>
                      <a
                        className="links-intrucoes"
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
                        className="links-intrucoes"
                        href="http://legislacao.prefeitura.sp.gov.br/leis/decreto-44279-de-24-de-dezembro-de-2003"
                      >
                        <strong>[Link Dec. Municipal 44.279/2003]</strong>
                      </a>
                    </p>
                    <p>
                      <a
                        className="links-intrucoes"
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
              <div className="col-lg-6 col-sm-12 mb-lg-0">
                <BlocoTexto title="Quais itens compõem o uniforme da rede municipal de ensino?">
                  <ul className="lista-home ml-0 pl-0">
                    {uniformes &&
                      uniformes.map(uniforme => {
                        return <li key={uniforme.id}>{uniforme.nome}</li>
                      })}
                  </ul>
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
          </div>
        </div>

        <div className="w-100 sociedade-governo text-white text-center mt-5">
          <div className="container">
            <div className="col-lg-12 mb-4 mb-lg-0">
              <h3 className="mb-4">
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
      </Fragment>
    )
  }
}
