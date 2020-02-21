import React, { Fragment, useState, useMemo, useEffect } from "react";
import HTTP_STATUS from "http-status-codes";
import { Row, Col, Card, Button, Alert } from "react-bootstrap";
import { valide } from "helpers/fieldValidators";
import { Form, reduxForm, Field } from "redux-form";
import DadosEmpresa from "./DadosEmpresa";
import TiposFornecimentos from "./TiposFornecimentos";
import "./style.scss";
import LojaFisica from "./LojaFisica";
import { validaOfertaUniforme } from "./helper";
import { toastSuccess, toastError } from "../Toast/dialogs";
import {
  cadastrarEmpresa,
  getUniformes,
  getTiposDocumentos,
  getTiposFornecimentos,
  verificaCnpj,
  busca_url_edital,
  getEmpresa,
  setAnexo
} from "services/uniformes.service";
import { FileUpload } from "components/Input/FileUpload";
import ArquivoExistente from "./ArquivoExistente";
export let CadastroEmpresa = props => {
  const initialValue = {
    nome_fantasia: "",
    endereco: "",
    numero: "",
    complemento: "",
    telefone: "",
    cidade: "",
    uf: "",
    bairro: "",
    cep: ""
  };

  const [empresa, setEmpresa] = useState(null);
  const [loja, setLoja] = useState([initialValue]);
  const [produtos, setProdutos] = useState([]);
  const [fornecimento, setFornecimento] = useState([]);
  const [bandeiras, setBandeiras] = useState([]);
  const [uuid, setUuid] = useState(null);
  const [alerta, setAlerta] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [tiposDocumentos, setTiposDocumentos] = useState([]);
  const [tiposFornecimentos, setTiposFornecimentos] = useState([]);
  const [arquivosAnexos, setArquivosAnexos] = useState([]);
  const [tab, setTab] = useState("anexos");
  const [mensagem, setMensagem] = useState("");
  const [limparFornecimento, setLimparFornecimento] = useState(false);
  const [limite, setLimite] = useState(false);
  const [edital, setEdital] = useState({ url: "", label: "edital" });
  const [editalClick, setEditalClick] = useState(null);

  const limparListaLojas = () => {
    setLoja([initialValue]);
  };
  useEffect(() => {
    const carregaEmpresa = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const uuid = urlParams.get("uuid");
      if (uuid) {
        const empresa = await getEmpresa(uuid);
        setEmpresa(empresa.data);
        setUuid(uuid);
      }
    };
    const carregaUniformes = async () => {
      const uniformes = await getUniformes();
      setProdutos(uniformes);
    };
    const carregaTiposDocumentos = async () => {
      const documentos = await getTiposDocumentos();
      setTiposDocumentos(documentos);
    };
    const carregaTiposFornecimentos = async () => {
      const fornecimentos = await getTiposFornecimentos();
      setTiposFornecimentos(fornecimentos);
    };
    carregaEmpresa();
    carregaUniformes();
    carregaTiposDocumentos();
    carregaTiposFornecimentos();
    setEditalClick(
      !edital.url
        ? e => {
            downloadEdital(e);
          }
        : null
    );
    get_edital_link();
  }, [limparFornecimento]);

  const addLoja = () => {
    loja.push(initialValue);
    setLoja([...loja]);
  };

  const switchTab = tab => {
    if (uuid) {
      setTab(tab);
    }
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

  const maiorQueLimite = eMaior => {
    setLimite(eMaior);
  };

  const onUpdateUniforme = (valor, chave) => {
    fornecimento[chave] = valor;
    setFornecimento([...fornecimento]);
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

  const downloadEdital = e => {
    //e.preventDefault()
    if (edital.url) {
      const link = document.createElement("a");
      link.href = edital.url;
      link.target = "_blank";
      link.click();
    }
  };

  const get_edital_link = async () => {
    let url = "";
    try {
      url = await busca_url_edital();
    } catch (e) {}
    setEdital({ ...edital, url });
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

    if (limite) {
      window.scrollTo(0, 0);
      showMessage(
        "O seu valor está acima do permitido, por este motivo seu cadastro não será registrado."
      );
      return;
    }

    const novoFornecimento = filtrarFornecimento(fornecimento);

    if (validaUniformes(novoFornecimento)) {
      payload["lojas"] = loja;
      payload["meios_de_recebimento"] = bandeiras;
      payload["ofertas_de_uniformes"] = novoFornecimento;
      payload["arquivos_anexos"] = arquivosAnexos;
      payload["telefone"] = payload["telefone"].replace("_", "");
      delete payload["foto_fachada"];
      delete payload["arqs_anexos"];

      try {
        const response = await cadastrarEmpresa(payload);

        if (response.status === HTTP_STATUS.CREATED) {
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
    window.location.href = "/confirmacao-cadastro";
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

  const adicionaTipoDocumento = (e, tipo) => {
    const arquivo_anexo = {
      ...e[0],
      tipo_documento: tipo.id
    };
    let arquivos = arquivosAnexos;
    arquivos.push(arquivo_anexo);
    setArquivosAnexos(arquivos);
  };

  const uploadAnexo = async (e, tipo) => {
    const arquivoAnexo = {
      ...e[0],
      tipo_documento: tipo.id
    };
    setAnexo(arquivoAnexo).then(response => {
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Arquivo salvo com sucesso!");
        getEmpresa(uuid).then(empresa => {
          setEmpresa(empresa.data);
        });
      } else {
        toastError("Erro ao dar upload no arquivo");
      }
    });
  };

  const removeTipoDocumento = tipo => {
    const arquivos = arquivosAnexos.filter(item => {
      return item.tipo_documento !== tipo.id;
    });
    setArquivosAnexos(arquivos);
  };

  const labelTemplate = tipo => {
    return <div dangerouslySetInnerHTML={{ __html: tipo.nome }} />;
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
          <div className="tabs pb-5">
            <div className="row">
              <div
                onClick={() => switchTab("cadastro")}
                className={`tab col-6 ${
                  tab === "cadastro" ? "active" : "inactive"
                }`}
              >
                CADASTRO
              </div>
              <div
                onClick={() => switchTab("anexos")}
                className={`tab col-6 ${
                  tab === "anexos" ? "active" : "inactive"
                }`}
              >
                ANEXOS
              </div>
            </div>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {tab === "cadastro" && (
              <Fragment>
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
                                id={key}
                                key={key}
                                chave={key}
                                nome_fantasia={value.nome_fantasia}
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
                          {tiposFornecimentos
                            ? tiposFornecimentos.map((tipo, key) => {
                                return (
                                  <TiposFornecimentos
                                    key={key}
                                    tipo={tipo}
                                    onUpdate={onUpdateUniforme}
                                    maiorQueLimite={maiorQueLimite}
                                  />
                                );
                              })
                            : null}
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
                        Declaro que as informações acima prestadas são
                        verdadeiras.
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
                        Li e concordo com os termos e condições apresentados no
                        <a
                          className="links-intrucoes"
                          href={edital.url}
                          target="_blank"
                          onClick={editalClick}
                        >
                          <strong> {edital.label}.</strong>
                        </a>
                      </label>
                    </div>
                  </div>
                </Row>
              </Fragment>
            )}
            {tab === "anexos" && (
              <Fragment>
                <Row>
                  <Card className="w-100 mt-2 ml-2">
                    <Card.Body>
                      <Card.Title>Fachadas das Lojas/dos Estandes</Card.Title>
                      <hr />
                      {empresa &&
                        empresa.lojas.map((loja, key) => {
                          return (
                            <Field
                              component={FileUpload}
                              name={`arqs_${key}`}
                              id={`${key}`}
                              key={key}
                              accept="file/pdf"
                              className="form-control-file"
                              label={`${loja.nome_fantasia} - ${loja.endereco}`}
                              required
                              validate={valide(true)}
                              multiple={false}
                              onChange={e => {
                                if (e.length > 0) {
                                  adicionaTipoDocumento(e, loja);
                                } else {
                                  removeTipoDocumento(loja);
                                }
                              }}
                            />
                          );
                        })}
                    </Card.Body>
                  </Card>
                </Row>
                <Row>
                  <Card className="w-100 mt-2 ml-2">
                    <Card.Body>
                      <Card.Title>Documentos Anexos</Card.Title>
                      <hr />
                      {tiposDocumentos ? (
                        tiposDocumentos.map((tipo, key) => {
                          return !empresa ||
                            !empresa.arquivos_anexos.find(
                              arquivo => arquivo.tipo_documento === tipo.id
                            ) ? (
                            <Field
                              component={FileUpload}
                              name={`arqs_${key}`}
                              id={`${key}`}
                              key={key}
                              accept="file/pdf"
                              className="form-control-file"
                              label={labelTemplate(tipo)}
                              resetarFile={tipo.resetarFile}
                              required={tipo.obrigatorio}
                              validate={valide(tipo.obrigatorio)}
                              multiple={false}
                              onChange={e => {
                                if (e.length > 0) {
                                  uploadAnexo(e, tipo);
                                } else {
                                  removeTipoDocumento(tipo);
                                }
                              }}
                            />
                          ) : (
                            <div>
                              <ArquivoExistente
                                label={labelTemplate(tipo)}
                                arquivo={empresa.arquivos_anexos.find(
                                  arquivo => arquivo.tipo_documento === tipo.id
                                )}
                              />
                            </div>
                          );
                        })
                      ) : (
                        <div>
                          Erro ao carregar Tipos de Documentos para anexar.
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Row>
              </Fragment>
            )}
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
