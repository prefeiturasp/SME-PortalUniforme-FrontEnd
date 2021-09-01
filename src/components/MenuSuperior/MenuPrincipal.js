import React from "react";
import { Link } from "react-router-dom";
import logoEducacaoSP from "../../img/educacao_sp.png";
import "./menu-principal.scss";
import endPoint from "../../constants/endPonts.constants";

class MenuPrincipal extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-4 mb-4">
          <div className="col-lg-3 col-sm-12 d-flex justify-content-lg-start justify-content-center align-items-end mb-4 mb-lg-0">
            <h1 className="m-0">
              <a href="https://educacao.sme.prefeitura.sp.gov.br/">
                <img
                  src={logoEducacaoSP}
                  alt="Escola Aberta"
                  className="img-fluid"
                />
              </a>
            </h1>
          </div>
          <div
            id="menu-principal"
            className="col-lg-9 col-sm-12 d-flex links-menu align-items-end justify-content-lg-end justify-content-center pr-lg-0 mb-xs-4"
          >
            {window.location.pathname === "/" && (
              <ul className="nav nav-tabs border-0">
                <li className="nav-item">
                  <Link
                    className="nav-link text-secondary mb-1 pb-0"
                    to="/familia"
                  >
                    Área de estudantes/famílias
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link text-secondary mb-1 pb-0"
                    to="/fornecedor"
                  >
                    Área de fabricantes/fornecedores
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-secondary mb-1 pb-0"
                    to="/fornecedor/lojas-credenciadas"
                  >
                    Lojas credenciadas
                  </Link>
                </li>
              </ul>
            )}
            {["/fornecedor", "/cadastro"].includes(
              window.location.pathname
            ) && (
              <ul className="nav nav-tabs border-0">
                <li className="nav-item">
                  <Link
                    className="nav-link text-secondary mb-1 pb-0"
                    to="/fornecedor"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-secondary mb-1 pb-0"
                    to="/cadastro"
                  >
                    Cadastre sua Loja
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-secondary mb-1 pb-0"
                    to="/login"
                  >
                    Área restrita
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-secondary mb-1 pb-0"
                    href="https://educacao.sme.prefeitura.sp.gov.br/perguntas-frequentes-dos-interessados-em-se-cadastrar-para-vender-uniforme-escolar-as-familias/"
                  >
                    Ainda com dúvidas? Acesse o nosso FAQ
                  </a>
                </li>
              </ul>
            )}
            {["/familia", "/mapa-de-fornecedores"].includes(
              window.location.pathname
            ) && (
              <ul className="nav nav-tabs border-0">
                <li className="nav-item">
                  <a
                    className="nav-link text-secondary mb-1 pb-0"
                    href="https://sp156.prefeitura.sp.gov.br/portal/servicos/informacao?servico=3616"
                  >
                    Avise sobre Problemas
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-secondary mb-1 pb-0"
                    href="https://educacao.sme.prefeitura.sp.gov.br/perguntas-frequentes-sobre-o-uniforme-escolar/"
                  >
                    Dúvidas? Veja a lista com perguntas frequentes
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-secondary mb-1 pb-0"
                    href={endPoint.CONSULTA_CADASTRO_URL}
                  >
                    Consulte seu cadastro
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-secondary mb-1 pb-0"
                    href="https://forms.office.com/r/Q1Qawispz4"
                  >
                    Avalie sua compra
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MenuPrincipal;
