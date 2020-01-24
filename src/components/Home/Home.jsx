import React, {Component, Fragment} from "react";
import BlocoTexto from "components/BlocoTexto";
import imgSalaAula from "img/fotos-mobiliarios-novos-encaminhados-pela-sme-tratada.jpg";
import imgMAlunosComUniforme from "img/duas-criancas-de-uniforme.png";

import './home.scss'

export default class Home extends Component {
    constructor() {
        super();
        this.irParaFormulario = this.irParaFormulario.bind(this);
    }

    irParaFormulario() {
        let path = `/cadastro`;
        this.props.history.push(path);
    }

    render() {
        return (
            <Fragment>
                <div className="w-100 oferta-imoveis position-relative">
                    <div className="container">
                        <div className="conteudo">
                            <div className="col-lg-8 col-sm-12 col-xl-6">
                                <h1>
                                    Contribua com a educação do nosso município e torne-se um fornecedor de uniformes
                                    escolares.
                                </h1>
                                <p>
                                    Leia o regulamento, veja se sua loja está de acordo com os critérios nessários para
                                    o credenciamento e faça a diferença na educação de nossos estudantes.
                                </p>
                                <button
                                    className="btn btn-primary pl-5 pr-5"
                                    onClick={this.irParaFormulario}
                                >
                                    Saiba mais
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="conteudo" className="w-100 home">
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-lg-6 mb-lg-0">
                                <img
                                    src={imgSalaAula}
                                    alt="Acompanhamento no desenvolvimento escolar"
                                    className="img-fluid rounded"
                                />
                            </div>
                            <div className="col-lg-6">
                                <BlocoTexto title="O que é necessário para ser fornecedor?">
                                    <div className="justify-content-lg-end justify-content-center">
                                        <p className='mb-1'>Conforme a Instrução Normativa nº xxx. o fornecedor deve:</p>
                                        <ul className="lista-home ml-0 pl-0 mb-2">
                                            <li>Ser pessoa Jurídica;</li>
                                            <li>Possuir toda a documentação necessária conforme Art. 40 do Decreto Municipal 44.279/2003;</li>
                                            <li>Comercializar os uniformes (peças têxteis, calçado ou ambos) na padronização conforme Edital;</li>
                                            <li>Possuir stand de vendas ou loja física na cidade de São Paulo.</li>
                                        </ul>
                                        <p className="mb-2">Veja todas as condições necessárias abaixo:</p>
                                        <p><a className="links-intrucoes" href="#!" onClick={(e) => {
                                            e.preventDefault()
                                        }}> <strong>[Link da Instrução Normativa Nº xxxx] (Em Breve)</strong></a></p>
                                        <p><a className="links-intrucoes"
                                              href="http://legislacao.prefeitura.sp.gov.br/leis/decreto-44279-de-24-de-dezembro-de-2003"><strong>[Link Dec. Municipal 44.279/2003]</strong></a>
                                        </p>
                                        <p><a className="links-intrucoes" href="#!" onClick={(e) => {
                                            e.preventDefault()
                                        }}><strong>[Link Edital] (Em Breve)</strong></a></p>
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
                                        <li>Camiseta</li>
                                        <li>Bermuda</li>
                                        <li>Calça</li>
                                        <li>Jaqueta</li>
                                        <li>Blusa de moleton</li>
                                        <li>Meia</li>
                                        <li>Tênis</li>
                                    </ul>
                                </BlocoTexto>

                            </div>
                            <div className="col-lg-6 col-sm-12 d-flex justify-content-lg-end justify-content-center">
                                <img
                                    src={imgMAlunosComUniforme}
                                    alt="Duas crianças com uniforme da rede municipal de ensino"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-100 mb-5 mt-5">
                    <div className="container">
                        <BlocoTexto title="O que acontece depois de se cadastrar?">
                            <p>Você receberá um número de protocolo para identificação da solicitação. Caso esteja
                                dentro dos critérios, será notificado com o resultado da análise da área técnica quanto
                                à possibilidade de fornecimento dos uniformes escolares.</p>
                        </BlocoTexto>
                    </div>
                </div>

                <div className="w-100 sociedade-governo text-white text-center mt-5">
                    <div className="container">

                        <div className="col-lg-12 mb-4 mb-lg-0">
                            <h3 className="mb-4">
                                Possui as condições necessárias? Então cadastre-se e se torne um fornecedor.
                            </h3>
                            <p className="mb-0">
                                <button
                                    className="btn btn-primary pl-4 pr-4"
                                    onClick={this.irParaFormulario}
                                >
                                    Cadastrar fornecedor
                                </button>
                            </p>
                        </div>

                    </div>
                </div>

            </Fragment>

        )

    }
}
