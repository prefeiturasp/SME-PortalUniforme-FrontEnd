import React, { Component } from "react";
import { Botao } from "../Botao";
import { BUTTON_STYLE, BUTTON_TYPE, BUTTON_ICON } from "../Botao/constants";
import { Header } from "../Header";
import { Link } from "react-router-dom";
import { Sidebar } from "../Sidebar";
import "./style.scss";

export default class PaginaHeaderSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: null,
      toggled: false,
      nome_instituicao: null,
      registro_funcional: null
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ toggled: !this.state.toggled });
  }

  render() {
    const { nome, nome_instituicao, registro_funcional, toggled } = this.state;
    const { children, titulo, botaoVoltar, voltarPara } = this.props;
    return (
      <div id="wrapper">
        <Header toggled={toggled} />
        <Sidebar
          nome={nome}
          toggle={this.toggle}
          toggled={toggled}
          registro_funcional={registro_funcional}
          nome_instituicao={nome_instituicao}
        />
        <div id="content-wrapper">
          <div
            className={`content-wrapper-div ${toggled &&
              "toggled"} d-flex flex-column p-4 mt-5`}
          >
            <h1 className="page-title">
              {titulo}
              {botaoVoltar && (
                <Link
                  to={{
                    pathname:
                      this.props.location && this.props.location.state
                        ? this.props.location.state.prevPath
                        : voltarPara,
                    state: { botaoVoltar: true }
                  }}
                >
                  <Botao
                    texto="voltar"
                    titulo="voltar"
                    type={BUTTON_TYPE.BUTTON}
                    style={BUTTON_STYLE.BLUE}
                    icon={BUTTON_ICON.ARROW_LEFT}
                    className="float-right"
                  />
                </Link>
              )}
            </h1>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
