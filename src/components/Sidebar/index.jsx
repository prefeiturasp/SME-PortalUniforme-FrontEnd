import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { getRazaoSocial, getCNPJ } from "helpers/helpers";
import "./style.scss";
import "./sb-admin-2.css";
import { getAPIVersion, getFrontVersion } from "services/uniformes.service";

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      API_VERSION: null,
      FRONT_VERSION: null,
    };
  }

  async componentDidMount() {
    const response = await getAPIVersion();
    this.setState({ API_VERSION: response });
    const response2 = await getFrontVersion();
    this.setState({ FRONT_VERSION: response2 });
  }

  render() {
    const { API_VERSION, FRONT_VERSION } = this.state;
    const { toggle, toggled } = this.props;
    return (
      <div>
        <div className="mb-5" />
        <ul
          className={`navbar-nav bg-gradiente-sme sidebar sidebar-dark accordion pl-2 pt-5
          ${toggled && "toggled"}`}
          id="accordionSidebar"
        >
          <div className="sidebar-divider my-0" />
          <p onClick={() => toggle()} className="text-right c-pointer">
            <i
              className={
                toggled
                  ? `fas fa-chevron-circle-right`
                  : `fas fa-chevron-circle-left`
              }
            />
          </p>
          <div className="justify-content-center mx-auto align-items-center sidebar-brand-text mx-3 pt-2">
            <div className="nav-item">
              {!toggled && getRazaoSocial() && (
                <div className="sidebar-brand-text text-center">
                  <span className="d-none d-lg-inline text-bold text-white small border border-light rounded-pill p-1">
                    {getRazaoSocial()}
                  </span>
                  <br />
                  <span className="d-none d-lg-inline text-bold text-white small p-1">
                    {getCNPJ()}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="sidebar-wrapper div-submenu">
            <li className="nav-item">
              <NavLink className={`nav-link collapsed`} to="/adm-fornecedor">
                <i className="fas fa-list-alt" />
                <span>Avisos | Irregularidades</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link collapsed`}
                href="#teste"
                data-toggle="collapse"
                data-target="#collapseCadastro"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <i className="fas fa-user-edit" />
                <span>Cadastro</span>
              </Link>
              <div
                id="collapseCadastro"
                className={`collapse`}
                aria-labelledby="headingConfig"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <NavLink
                    activeClassName="active"
                    className="collapse-item"
                    to="/adm-fornecedor/dados-empresa"
                  >
                    Dados da empresa, lojas e preços
                  </NavLink>
                  <NavLink
                    activeClassName="active"
                    className="collapse-item"
                    to="/adm-fornecedor/anexos"
                  >
                    Anexos
                  </NavLink>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link collapsed`}
                href="#teste"
                data-toggle="collapse"
                data-target="#collapseConfig"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <i className="fas fa-cog" />
                <span>Configurações</span>
              </Link>
              <div
                id="collapseConfig"
                className={`collapse`}
                aria-labelledby="headingConfig"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <NavLink
                    activeClassName="active"
                    className="collapse-item"
                    to="/adm-fornecedor/alterar-senha"
                  >
                    Alterar senha
                  </NavLink>
                </div>
              </div>
            </li>
          </div>
          {!toggled && (
            <div className="text-center page-footer mt-auto justify-content-center mb-3 pb-2">
              <p>
                SME-SP-SGA - Distribuído sob <br />a Licença AGPL V3
              </p>
              <div className="sidebar-wrapper">
                <div className="text-center mx-auto justify-content-center p-2">
                  <span className="text-bold text-white small">
                    {FRONT_VERSION} (API: {API_VERSION})
                  </span>
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
    );
  }
}
