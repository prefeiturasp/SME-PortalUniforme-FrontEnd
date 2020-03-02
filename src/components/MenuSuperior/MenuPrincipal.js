import React from 'react'
import { Link } from 'react-router-dom'
import logoEducacaoSP from '../../img/educacao_sp.png'
import './menu-principal.scss'

class MenuPrincipal extends React.Component {
  constructor() {
    super()
    this.state = { mostraLinkHome: false }
  }

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
            <ul className="nav nav-tabs border-0">
              <li className="nav-item">
                <Link className="nav-link text-secondary mb-1 pb-0" to="/">
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
              {this.state.mostraLinkHome ? (
                <li className="nav-item">
                  <Link className="nav-link text-secondary mb-1 pb-0" to="/">
                    Consulte demanda
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MenuPrincipal
