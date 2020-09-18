import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
import React, { Fragment } from "react";
import { Row, Alert, Col } from "react-bootstrap";

const Confirmacao = (props) => {
  return (
    <PaginaComCabecalhoRodape>
      <Row>
        <Col className="d-flex justify-content-center p-5">
          <Alert key={1} variant={"success"} className="w-50">
            <div className="text-weight-bold">
              <strong>
                <p align="center">Recebemos sua inscrição.</p>
              </strong>
              <p>
                A área técnica da Secretaria Municipal de Educação analisará o
                seu cadastro e enviará parecer por email.{" "}
              </p>
              <p>Favor aguardar nosso contato.</p>
            </div>
          </Alert>
        </Col>
      </Row>
    </PaginaComCabecalhoRodape>
  );
};

export default Confirmacao;
