import React, { Fragment, useState, useMemo, useEffect } from "react";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import { Form, reduxForm } from "redux-form";
import DadosEmpresa from "./DadosEmpresa";
import TipoFornecimento from "./TipoFornecimento";
import BandeiraAnexo from "./BandeiraAnexo";
import LojaFisica from "./LojaFisica";
import { validaOfertaUniforme, parsePayload } from "./helper";
import { cadastrarEmpresa } from "services/uniformes.service";

export let CadastroEmpresa = props => {
  const initialValue = {
    endereco: "",
    numero: "",
    complemento: "",
    telefone: "",
    cidade: "",
    uf: "",
    bairro: "",
    cep: ""
  };

  const [loja, setLoja] = useState([initialValue]);
  const [alerta, setAlerta] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const limparListaLojas = () => {
    setLoja([initialValue]);
  };
  useEffect(() => {}, [loja]);

  const addLoja = () => {
    loja.push(initialValue);
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
    loja[chave] = valor;
    setLoja([...loja]);
  };

  const contadorLoja = useMemo(() => loja.length, [loja]);

  const showMessage = mensagem => {
    setMensagem(mensagem);
    setAlerta(true);
    setTimeout(() => {
      setAlerta(false);
      setMensagem("");
    }, 10000);
  };

  const onSubmit = async values => {
    let payload = parsePayload(values);
    payload["lojas"] = loja;

    validaMeiosRecebimentos(payload);
    validaUniformes(payload);
    const response = await cadastrarEmpresa(payload);
    if (response.status === 201) {
      props.reset();
      limparListaLojas();
      showSucess();
    }
  };

  const showSucess = () => {
    setSucesso(true);
    window.scrollTo(0, 0);
    setTimeout(() => {
      window.location.reload()
    }, 15000);
  };

  const validaUniformes = payload => {
    if (payload.ofertas_de_uniformes.length > 0) {
      if (validaOfertaUniforme(payload.ofertas_de_uniformes)) {
        window.scrollTo(0, 0);
        showMessage(
          "Por favor, selecione um Tipo de Fornecimento com o valor correspondente"
        );
      }
    } else {
      window.scrollTo(0, 0);
      showMessage(
        "Por favor, selecione um Tipo de Fornecimento com o valor correspondente"
      );
    }
  };

  const validaMeiosRecebimentos = payload => {
    if (payload.meios_de_recebimento.length === 0) {
      window.scrollTo(0, 0);
      showMessage("Por favor, selecione um Meio de Recebimento");
    }
  };

  const { handleSubmit, pristine, submitting, reset } = props;

  return (
    <Fragment>
      <div id="conteudo" className="w-100 desenvolvimento-escolar">
        <div className="container pt-5 pb-5">
          {alerta ? (
            <Alert key={1} variant={"danger"}>
              <div className="text-weight-bold text-center">
                <strong>{mensagem}</strong>
              </div>
            </Alert>
          ) : null}

          {sucesso ? (
            <Alert key={1} variant={"success"}>
              <div className="text-weight-bold text-center">
                <strong>Cadastro realizado com sucesso.</strong>
              </div>
            </Alert>
          ) : null}

          <Row>
            <Col>
              <h1>Cadastro de Empresa</h1>
            </Col>
          </Row>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className="mb-2">
              <Col lg={6} xl={6}>
                <Row>
                  <Card className="w-100 mr-2">
                    <Card.Body>
                      <Card.Title>Dados da Empresa</Card.Title>
                      <DadosEmpresa />
                    </Card.Body>
                  </Card>
                </Row>
                <Row>
                  <Card className="w-100 mr-2 mt-2">
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
                </Row>
              </Col>
              <Col lg={6} xl={6}>
                <Row>
                  <Card className="w-100 ml-2">
                    <Card.Body>
                      <Card.Title>Tipo de Fornecimento</Card.Title>
                      <TipoFornecimento />
                    </Card.Body>
                  </Card>
                </Row>
                <Row>
                  <Card className="w-100 mt-2 ml-2">
                    <Card.Body>
                      <Card.Title>
                        Meios de Recebimentos / Documentos Anexos
                      </Card.Title>
                      <BandeiraAnexo />
                    </Card.Body>
                  </Card>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col lg={6} xl={6} className="d-flex justify-content-start mt-4">
                <Button
                  onClick={() => {
                    reset();
                    limparListaLojas();
                  }}
                  type="reset"
                  variant="outline-danger"
                >
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
