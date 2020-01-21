import React, { Fragment, useState, useMemo, useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
// import BasePage from "components/Base/BasePage";
import { Form, reduxForm } from "redux-form";
import DadosEmpresa from "./DadosEmpresa";
import TipoFornecimento from "./TipoFornecimento";
import BandeiraAnexo from "./BandeiraAnexo";
import LojaFisica from "./LojaFisica";
import { validaPayload } from "./helper";
import { Imovel } from "../../services/Imovel.service";

export let CadastroEmpresa = props => {
  const initialValue = {
    endereco: "",
    telefone: "",
    cidade: "",
    uf: "",
    bairro: "",
    cep: ""
  };
  const [loja, setLoja] = useState([initialValue]);

  useEffect(() => {}, [loja]);

  const addLoja = index => {
    loja.push({ endereco: "", telefone: "" });
    setLoja([...loja]);
  };

  const delLoja = index => {
    let lista = [];
    loja.forEach((value, key) => {
      if (key !== index) {
        lista.push(value);
      }
    });
    setLoja(lista);
  };

  const onUpdateLoja = (valor, chave) => {
    // validaPayload(valor)
    loja[chave] = valor;
    setLoja([...loja]);
  };

  const contadorLoja = useMemo(() => loja.length, [loja]);

  const onSubmit = async values => {
    console.log(loja);
    console.log(values);
    // const result = await Imovel(values);
  };

  const { handleSubmit, pristine, submitting, reset } = props;

  return (
    <Fragment>
      <div id="conteudo" className="w-100 desenvolvimento-escolar">
        <div className="container pt-5 pb-5">
          <Row>
            <Col>
              <h1>Cadastro de Empresa</h1>
            </Col>
          </Row>

          <Form onSubmit={handleSubmit(onSubmit)}>
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
                    <Button block onClick={() => addLoja(contadorLoja)}>
                      <i className="fas fa-plus-circle" /> Novo Endereço
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={6} xl={6}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      Meios de Recebimentos / Documentos Anexos
                    </Card.Title>
                    <BandeiraAnexo />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg={6} xl={6} className="d-flex justify-content-start mt-4">
                <Button onClick={reset} type="reset" variant="outline-danger">
                  Limpar
                </Button>
              </Col>
              <Col lg={6} xl={6} className="d-flex justify-content-end mt-4">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={pristine || submitting}
                >
                  Enviar
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

CadastroEmpresa = reduxForm({
  // a unique name for the form
  form: "CadastroLojaForm"
})(CadastroEmpresa);

export default CadastroEmpresa;
