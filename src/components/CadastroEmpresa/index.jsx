import React, { Fragment } from "react";
import { Row, Col, Card } from "react-bootstrap";
import BasePage from "components/Base/BasePage";
import { Form, reduxForm, FieldArray } from "redux-form";
import DadosEmpresa from "./DadosEmpresa";
import TipoFornecimento from "./TipoFornecimento";
import BandeiraAnexo from "./BandeiraAnexo";
import LojaFisica from "./LojaFisica";

export const CadastroEmpresa = props => {
    const onSubmit = values => {

    }

  return (
    <Fragment>
      <BasePage>
        <div id="conteudo" className="w-100 desenvolvimento-escolar">
          <div className="container pt-5 pb-5">
            <Row>
              <Col>
                <h1>Cadastro de Empresa</h1>
              </Col>
            </Row>
            <Form onSubmit={onSubmit}>
              <Row className="mb-2">
                <Col lg={6} xl={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Dados da Empresa</Card.Title>
                      <DadosEmpresa />
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={6} xl={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Tipo de Fornecimento</Card.Title>
                      <TipoFornecimento />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col lg={6} xl={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Loja(s) Física(s)</Card.Title>
                      <LojaFisica />
                      {/* <FieldArray name="lojas" component={LojaFisica} /> */}
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={6} xl={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Bandeira(s) / Anexo(s)</Card.Title>
                      <BandeiraAnexo />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </BasePage>
    </Fragment>
  );
};

export default reduxForm({
  // a unique name for the form
  form: "CadastroEmpresaForm"
})(CadastroEmpresa);
