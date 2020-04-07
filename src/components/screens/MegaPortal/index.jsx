import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { reduxForm } from "redux-form";
import imgFamilia from "img/landing-familia.png";
import imgLoja from "img/landing-loja.png";
import imgDesenhoCriancas from "img/desenho-alunos-mobile.png";
import BlocoTexto from "components/BlocoTexto";
import "./style.scss";

export class MegaPortal extends Component {
  render() {
    return (
      <Fragment>
        <div className="w-100 uniforme-escolar position-relative">
          <div className="container">
            <div className="conteudo">
              <div className="div-banner col-lg-8 col-sm-12 col-xl-6">
                <h1>
                  O uniforme escolar mudou para um modelo com padrão de
                  qualidade superior, respeitando aspectos como conforto,
                  durabilidade e resistência.
                </h1>
                <p>
                  Em 2020, os kits de uniforme continuarão com a mesma
                  composição, mas, com inovações na forma de fornecimento.
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
        <div id="conteudo" className="pt-5 w-100 home">
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
                    className="btn btn-primary col-12 pl-4 pr-4"
                  >
                    <strong>Estudantes/famílias</strong>
                  </button>
                </Link>
              </div>
            </div>
            <div className="area-fabricantes col-12 offset-sm-1 col-sm-5">
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
      </Fragment>
    );
  }
}

MegaPortal = reduxForm({
  // a unique name for the form
  form: "MegaPortalForm",
})(MegaPortal);

export default withRouter(MegaPortal);
