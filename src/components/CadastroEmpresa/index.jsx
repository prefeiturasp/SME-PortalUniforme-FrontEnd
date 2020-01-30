import React, { Fragment, useState, useMemo, useEffect } from "react";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import { Form, reduxForm, Field } from "redux-form";
import DadosEmpresa from "./DadosEmpresa";
import TipoFornecimento from "./TipoFornecimento";
import BandeiraAnexo from "./BandeiraAnexo";
import LojaFisica from "./LojaFisica";
import { validaOfertaUniforme, parsePayload } from "./helper";
import {
  cadastrarEmpresa,
  getUniformes,
  verificaCnpj
} from "services/uniformes.service";
import { getMeiosRecebimento } from "services/bandeiras.service";
import { FileUpload } from "components/Input/FileUpload";
import { required } from "helpers/fieldValidators";
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
  const [produtos, setProdutos] = useState([]);
  const [fornecimento, setFornecimento] = useState([]);
  const [bandeiras, setBandeiras] = useState([]);
  const [pagamento, setPagamento] = useState([]);
  const [alerta, setAlerta] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [limparFornecimento, setLimparFornecimento] = useState(false);

  const limparListaLojas = () => {
    setLoja([initialValue]);
  };
  useEffect(() => {
    const carregaUniformes = async () => {
      const uniformes = await getUniformes();
      setProdutos(uniformes);
    };
    const carregaFormaPagamento = async () => {
      const formaPagamento = await getMeiosRecebimento();
      setPagamento(formaPagamento);
    };
    carregaUniformes();
    carregaFormaPagamento();
  }, [limparFornecimento]);

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

  const onUpdateUniforme = (valor, chave) => {
    fornecimento[chave] = valor;
    setFornecimento([...fornecimento]);
  };

  const addBandeira = value => {
    bandeiras.push(value);
    setBandeiras([...bandeiras]);
  };

  const delBandeira = value => {
    const key = bandeiras.indexOf(value);
    if (key) {
      bandeiras.splice(key, 1);
      setBandeiras(bandeiras);
    }
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

  const onSubmit = async payload => {
    let cnpjStatus = await verificaCnpj(payload.cnpj);

    if (cnpjStatus && cnpjStatus.cnpj_cadastrado === "Sim") {
      window.scrollTo(0, 0);
      showMessage(
        "Esse CNPJ já está inscrito no programa de fornecimento de uniformes."
      );
      return;
    }

    if (cnpjStatus && cnpjStatus.cnpj_valido === "Não") {
      window.scrollTo(0, 0);
      showMessage("O CNPJ informado não é um CNPJ válido.");
      return;
    }

    const novoFornecimento = filtrarFornecimento(fornecimento);

    if (validaMeiosRecebimentos(bandeiras)) {
      if (validaUniformes(novoFornecimento)) {
        payload["lojas"] = loja;
        payload["meios_de_recebimento"] = bandeiras;
        payload["ofertas_de_uniformes"] = novoFornecimento;

        try {
          const response = await cadastrarEmpresa(payload);

          if (response.status === 201) {
            props.reset();
            limparListaLojas();
            showSucess();
          } else {
            window.scrollTo(0, 0);
            showMessage(
              "Houve um erro ao efetuar a sua inscrição. Tente novamente mais tarde."
            );
          }
        } catch (error) {
          if (error.response.data.email) {
            window.scrollTo(0, 0);
            showMessage(
              "Esse e-mail já está inscrito no programa de fornecimento de uniformes."
            );
          } else {
            window.scrollTo(0, 0);
            showMessage(
              "Houve um erro ao efetuar a sua inscrição. Tente novamente mais tarde."
            );
          }
        }
      }
    }
  };

  const filtrarFornecimento = payload => {
    const novoPayload = payload.filter((value, key) => {
      if (value !== undefined) {
        if (Object.keys(value).length > 0) {
          return value;
        }
      }
    });
    return novoPayload;
  };

  const showSucess = () => {
    setSucesso(true);
    limparListaLojas();
    setLimparFornecimento(true);
    window.scrollTo(0, 0);
    setTimeout(() => {
      setSucesso(false);
      setMensagem("");
    }, 10000);
  };

  const validaUniformes = payload => {
    if (payload.length > 0) {
      if (validaOfertaUniforme(payload)) {
        window.scrollTo(0, 0);
        showMessage(
          "Por favor, selecione um Tipo de Fornecimento com o valor correspondente"
        );
        return false;
      }
    } else {
      window.scrollTo(0, 0);
      showMessage(
        "Por favor, selecione um Tipo de Fornecimento com o valor correspondente"
      );

      return false;
    }
    return true;
  };

  const validaMeiosRecebimentos = payload => {
    if (payload.length === 0) {
      window.scrollTo(0, 0);
      showMessage("Por favor, selecione um Meio de Recebimento");
      return false;
    }
    return true;
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
                      <hr />
                      <DadosEmpresa />
                    </Card.Body>
                  </Card>
                </Row>
                <Row>
                  <Card className="w-100 mr-2 mt-2">
                    <Card.Body>
                      <Card.Title>
                        Informações ponto de venda físico ou stand de vendas
                      </Card.Title>
                      <hr />
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
                      <hr />
                      {produtos
                        ? produtos.map((value, key) => {
                            return (
                              <TipoFornecimento
                                produto={value.nome}
                                index={value.id}
                                chave={key}
                                onUpdate={onUpdateUniforme}
                                limpar={limparFornecimento}
                                setLimpar={setLimparFornecimento}
                              />
                            );
                          })
                        : null}
                    </Card.Body>
                  </Card>
                </Row>
                <Row>
                  <Card className="w-100 mt-2 ml-2">
                    <Card.Body>
                      <Card.Title>Meios de Recebimentos</Card.Title>
                      <hr />
                      {pagamento
                        ? pagamento.map((value, key) => {
                            return (
                              <BandeiraAnexo
                                label={value.nome}
                                chave={key}
                                valor={value.id}
                                onUpdate={addBandeira}
                                onRemove={delBandeira}
                              />
                            );
                          })
                        : null}
                    </Card.Body>
                  </Card>
                </Row>
                <Row>
                  <Card className="w-100 mt-2 ml-2">
                    <Card.Body>
                      <Card.Title>Documentos Anexos</Card.Title>
                      <hr />
                      <Field
                        component={FileUpload}
                        name="arquivos_anexos"
                        id="anexos_loja"
                        accept="file/pdf"
                        className="form-control-file"
                        label="Anexos / Documentos"
                        required
                        validate={required}
                      />
                    </Card.Body>
                  </Card>
                </Row>
              </Col>
            </Row>
            <Row className="mt-4">
              <div className="form-group">
                <div class="form-check">
                  <Field
                    component={"input"}
                    name="declaracao"
                    className="form-check-input"
                    required
                    type="checkbox"
                    id={5}
                  />
                  <label title="" class="form-check-label">
                    Declaro que as informações acima prestadas são verdadeiras.
                  </label>
                </div>
              </div>
            </Row>
            <Row>
              <div className="form-group">
                <div class="form-check">
                  <Field
                    component={"input"}
                    name="condicoes"
                    className="form-check-input"
                    required
                    type="checkbox"
                    id={5}
                  />
                  <label title="" class="form-check-label">
                    Li e concordo com os termos e condições apresentados neste
                    portal.
                  </label>
                </div>
              </div>
            </Row>
            <Row></Row>
            <Row>
              <Col lg={6} xl={6} className="d-flex justify-content-start mt-4">
                <Button
                  onClick={() => {
                    reset();
                    limparListaLojas();
                    setLimparFornecimento(true);
                    window.scrollTo(0, 0);
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
                  type="submit"
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
