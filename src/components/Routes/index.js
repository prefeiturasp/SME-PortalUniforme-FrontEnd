import React from "react";
import {Route, Switch} from 'react-router-dom';
import Home from '../Home/Home'
import {CadastroImovel} from "../CadastroImovel";

export default props => (
    <div id="main">
        <Switch>
            <Route path="/" exact component ={Home}/>
            <Route path="/cadastro" component ={CadastroImovel}/>
        </Switch>

    </div>
)