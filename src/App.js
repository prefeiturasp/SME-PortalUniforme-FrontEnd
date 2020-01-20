import React, { Component } from "react";
import Routes from './components/Routes'
import Rodape from "./components/Rodape/Rodape";
import MenuAcessibilidade from "./components/MenuSuperior/MenuAcessibilidade";
import MenuPrincipal from "./components/MenuSuperior/MenuPrincipal";

// Style
import "./styles/styles.scss";
import "./App.scss";

import ReactGA from "react-ga";
ReactGA.initialize("UA-153279384-1");
ReactGA.pageview(window.location.pathname + window.location.search);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alterarFonte:
        (localStorage.getItem("alterarFonte") &&
          localStorage.getItem("alterarFonte") === "true") ||
        false,
      alterarContraste:
        (localStorage.getItem("alterarContraste") &&
          localStorage.getItem("alterarContraste") === "true") ||
        false,
      focusBuscaAtributo: false
    };
    this.alterarFonte = this.alterarFonte.bind(this);
    this.alterarContraste = this.alterarContraste.bind(this);
    this.focusBusca = this.focusBusca.bind(this);
  }

  focusBusca() {
    this.setState({ focusBuscaAtributo: true });
  }

  alterarFonte() {
    const alterarFonte =
      localStorage.getItem("alterarFonte") !== null
        ? localStorage.getItem("alterarFonte") !== "true"
        : true;
    localStorage.setItem("alterarFonte", alterarFonte);
    this.setState({ alterarFonte });
  }

  alterarContraste() {
    const alterarContraste =
      localStorage.getItem("alterarContraste") !== null
        ? localStorage.getItem("alterarContraste") !== "true"
        : true;
    localStorage.setItem("alterarContraste", alterarContraste);
    this.setState({ alterarContraste });
  }

  render() {
    const { alterarFonte, alterarContraste, focusBuscaAtributo } = this.state;
    return (
        <section role="main" className={`${alterarFonte && "fonte-maior"} ${alterarContraste && "alto-contraste"}`}>
          <MenuAcessibilidade alterarFonte={this.alterarFonte} alterarContraste={this.alterarContraste}/>
          <MenuPrincipal/>
          <Routes/>
          <Rodape/>
        </section>

        );
  }
}
