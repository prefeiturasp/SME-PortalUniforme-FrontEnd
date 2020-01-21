import React from "react";
import {Route, Switch} from 'react-router-dom';
import Home from '../Home/Home'
import { CadastroEmpresa } from "components/CadastroEmpresa";

export default props => (
    <div id="main">
        <Switch>
            <Route path="/" exact component = {Home}/>
            <Route path="/cadastro" component ={CadastroEmpresa}/>
        </Switch>

    </div>
)