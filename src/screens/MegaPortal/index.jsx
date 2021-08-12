import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { reduxForm } from "redux-form";
import imgFamilia from "img/landing-familia.png";
import imgLoja from "img/landing-loja.png";
import imgDesenhoCriancas from "img/desenho-alunos-mobile.png";
import BlocoTexto from "components/BlocoTexto";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import endPoint from "../../constants/endPonts.constants";
import "./style.scss";

export class MegaPortal extends Component {
  render() {
    return (
      <PaginaComCabecalhoRodape>
        <div className="w-100 uniforme-escolar position-relative">
          <div className="container">
            <div className="conteudo">
              <div className="col-lg-8 col-sm-12 col-xl-6">
                <h3>
                Agora os responsáveis pelos 
                estudantes da Rede Municipal de 
                São Paulo receberão o crédito para 
                comprar o uniforme escolar
                diretamente nas lojas credenciadas
                </h3>
                <p>
                Para isso, basta que: <br/>
                </p>
                <ol>
                  <li>Os dados do(a) responsável estejam completos no cadastro do(a) estudante. Para isso, é possível consultar a situação cadastral na página <a href={endPoint.CONSULTA_CADASTRO_URL} target="blank">consulteseucadastro.sme.prefeitura.sp.gov.br</a> e em caso de ajustes, o(a) responsável deverá solicitar a atualização para a DRE ou escola, conforme o caso.</li>
                  <li>Instalar o <a href="https://play.google.com/store/apps/details?id=com.mercadopago.wallet" target="blank">aplicativo da Mercado Pago</a> no celular ou tablet e criar a conta com mesmo CPF e e-mail de responsável que constam no cadastro do(a) estudante (<a href="https://educacao.sme.prefeitura.sp.gov.br/wp-content/uploads/2021/01/Guia-para-as-famílias.pdf" target="blank">veja o passo a passo aqui</a>).</li>
                  <li>Quando o crédito estiver liberado, a pessoa receberá uma notificação pelo próprio aplicativo (<a href="https://educacao.sme.prefeitura.sp.gov.br/wp-content/uploads/2021/02/Programa-Auxi%CC%81lio-Uniforme-Escolar_telas-do-aplicativo-da-Mercado-Pago.pdf" target="blank">veja aqui como esse aviso aparece</a>).</li>
                  <li>Aí o(a) responsável já pode realizar a compra do uniforme escolar nas lojas credenciadas (<a href="https://portaldeuniformes.sme.prefeitura.sp.gov.br/familia" target="blank">consulte aqui as lojas mais próximas do endereço desejado</a>).</li>
                </ol>
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
