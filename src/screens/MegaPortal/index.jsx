import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { reduxForm } from "redux-form";
import imgFamilia from "img/landing-familia.png";
import imgLoja from "img/landing-loja.png";
import imgDesenhoCriancas from "img/desenho-alunos-mobile.png";
import BlocoTexto from "components/BlocoTexto";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import { BannerConsultaCadastro } from "components/BannerConsultaCadastro" 
import endPoint from "../../constants/endPonts.constants";
import "./style.scss";

export class MegaPortal extends Component {
  render() {
    return (
      <PaginaComCabecalhoRodape>
        <BannerConsultaCadastro/>
        <div className="w-100 uniforme-escolar position-relative">
          <div className="container">
            <div className="conteudo">
              <div className="col-lg-8 col-sm-12 col-xl-6">
                <h3>
                  Agora os responsáveis pelos estudantes
                  da Rede Municipal de São Paulo recebem
                  o crédito para comprar o uniforme escolar
                  diretamente nas lojas credenciadas 
                </h3>
                <p class="titulo-lista">
                  Para isso, basta que: <br/>
                </p>
                <ol class="lista">
                  <li>O CPF do(a) responsável esteja registrado no cadastro do(a) estudante. É possível consultar a situação cadastral na página <a href={endPoint.CONSULTA_CADASTRO_URL} target="blank">consulteseucadastro.sme.prefeitura.sp.gov.br</a> e em caso de ajustes, o(a) responsável deverá solicitar a atualização para escola, conforme o caso.</li>
                  <li>Instalar o aplicativo <strong>Kit Escolar DUEPAY</strong> no celular ou tablet e criar a conta com mesmo CPF de responsável que consta no cadastro do(a) estudante. </li>
                </ol>
                <p class="rodape-lista">
                  Após a liberação do crédito, o(a) responsável já pode realizar a compra do uniforme escolar nas lojas credenciadas (<a href="https://portaldeuniformes.sme.prefeitura.sp.gov.br/familia" target="blank">consulte aqui as lojas mais próximas do endereço desejado</a>).
                </p>
              </div>
              <img
                src={imgDesenhoCriancas}
                width="100%"
                alt="Familia"
                className="desenho-criancas img-fluid rounded"
              />
            </div>
          </div>
        </div>
        <div id="conteudo" className="container-menu pt-5 w-100">
          <div className="container">
            <BlocoTexto title="Para obter mais informações, acesse a seção que atenda seu perfil"></BlocoTexto>
          </div>
        </div>
        <div className="container">
          <div className="row mt-5 mb-5">
            <div className="col-12 col-sm-5">
              <img
                src={imgFamilia}
                width="100%"
                alt="Familia"
                className="img-fluid rounded"
              />
              <div className="pt-5">
                <BlocoTexto
                  className="fs-29"
                  title="Área de estudantes/famílias"
                >
                  <div className="justify-content-lg-end justify-content-center">
                    Obtenha informações sobre o kit de uniforme escolar para as
                    crianças e estudantes da cidade de São Paulo
                  </div>
                </BlocoTexto>
              </div>
              <div className="pt-3">
                <Link to="/familia">
                  <button
                    size="lg"
                    className="btn btn-primary col-12 pl-4 pr-4 mb-2"
                  >
                    <strong>Estudantes/famílias</strong>
                  </button>
                </Link>
                <a href={endPoint.CONSULTA_CADASTRO_URL} target="blank">
                  <button
                    size="lg"
                    className="btn btn-primary col-12 pl-4 pr-4"
                  >
                    <strong>Consulta de Cadastro</strong>
                  </button>
                </a>
              </div>
            </div>
            <div className="area-fabricantes col-12 offset-sm-2 col-sm-5">
              <img
                src={imgLoja}
                width="100%"
                alt="Loja de uniformes"
                className="img-fluid rounded"
              />
              <div className="pt-5">
                <BlocoTexto
                  className="fs-29"
                  title="Área de fabricantes/fornecedores"
                >
                  <div className="justify-content-lg-end justify-content-center">
                    Venha contribuir com o fornecimento dos uniformes escolares
                    para as crianças e estudantes da cidade de São Paulo
                  </div>
                </BlocoTexto>
              </div>
              <div className="pt-3">
                <Link to="/fornecedor">
                  <button
                    size="lg"
                    className="btn btn-primary col-12 pl-4 pr-4"
                  >
                    <strong>Fabricantes/fornecedores</strong>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PaginaComCabecalhoRodape>
    );
  }
}

MegaPortal = reduxForm({
  // a unique name for the form
  form: "MegaPortalForm",
})(MegaPortal);

export default withRouter(MegaPortal);
