import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import { CadastroEmpresa } from "components/CadastroEmpresa";
import Confirmacao from "components/CadastroEmpresa/Confirmacao";
import ProcurarFornecedores from "components/screens/ProcurarFornecedores";
import MapaDeFornecedores from "components/screens/MapaDeFornecedores";

export default props => (
  <div id="main">
    <Switch>
      <Route path="/" exact render={props => <Home {...props} />} />
      <Route
        path="/cadastro"
        render={props => <CadastroEmpresa {...props} />}
      />
      <Route
        path="/procurar-fornecedores"
        render={props => <ProcurarFornecedores {...props} />}
      />
      <Route
        path="/mapa-de-fornecedores"
        render={props => <MapaDeFornecedores {...props} />}
      />
      <Route
        path="/confirmacao-cadastro"
        render={props => <Confirmacao {...props} />}
      />
    </Switch>
  </div>
);
