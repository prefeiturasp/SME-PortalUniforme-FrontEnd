import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";

class NotFoundPage extends Component {
  render() {
    return (
      <PaginaComCabecalhoRodape>
        <div className="text-center">
          <div className="error mx-auto" data-text="404">
            404
          </div>
          <p className="lead text-gray-800 mb-5">Página não encontrada</p>
          <Link to="/">← Voltar para a página inicial</Link>
        </div>
      </PaginaComCabecalhoRodape>
    );
  }
}

export default NotFoundPage;
