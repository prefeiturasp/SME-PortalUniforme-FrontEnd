import React, { Fragment, useState, useMemo, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import BasePage from "components/Base/BasePage";
import { Form, reduxForm } from "redux-form";
import DadosEmpresa from "./DadosEmpresa";
import TipoFornecimento from "./TipoFornecimento";
import BandeiraAnexo from "./BandeiraAnexo";
import LojaFisica from "./LojaFisica";

export const CadastroEmpresa = props => {
  const [loja, setLoja] = useState([{ endereco: "", telefone: "" }]);

  useEffect(()=>{

  },[loja])

  const addLoja = index => {
    loja.push({ endereco: "", telefone: "" });
    setLoja([...loja]);
  };

  const delLoja = index => {
    let lista = []
    loja.forEach((value, key) => {
      if(key !== index){
        lista.push(value) 
      }
    })
    setLoja(lista);
  };

  const onUpdateLoja = (valor, chave) => {
    loja[chave] = valor;
    setLoja([...loja]);
  };

  const contadorLoja = useMemo(() => loja.length, [loja]);

  const onSubmit = values => {};

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
                      {loja.map((value, key) => (
                        <>
                          <LojaFisica
                            chave={key}
                            endereco={value.endereco}
                            telefone={value.telefone}
                            onUpdate={onUpdateLoja}
                          />
                          <Button
                            disabled={contadorLoja <= 1 ? true : false}
                            variant="outline-danger"
                            block
                            onClick={() => delLoja(key)}
                            className="mb-1"
                          >
                            <i className="fas fa-trash" />
                          </Button>
                        </>
                      ))}
                      <Button block onClick={() => addLoja(contadorLoja + 1)}>
                        <i className="fas fa-plus-circle" /> Novo Endereço
                      </Button>
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
