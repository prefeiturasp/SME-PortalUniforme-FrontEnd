import React, {
  Fragment,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import moment from "moment";
import HTTP_STATUS from "http-status-codes";
import { Button, Alert } from "react-bootstrap";
import { valide } from "helpers/fieldValidators";
import { Form, reduxForm, Field } from "redux-form";
import DadosEmpresa from "./DadosEmpresa";
import TiposFornecimentos from "./TiposFornecimentos";
import "./style.scss";
import LojaFisica from "./LojaFisica";
import { validaOfertaUniforme, validaFormulario, getError } from "./helper";
import { toastSuccess, toastError } from "components/Toast/dialogs";
import {
  cadastrarEmpresa,
  getTiposDocumentos,
  getTiposFornecimentos,
  verificaCnpj,
  busca_url_edital,
  getEmpresa,
  setAnexo,
  deleteAnexo,
  setFachadaLoja,
  concluirCadastro,
  getLimites,
  verificaEmail,
} from "services/uniformes.service";
import { FileUpload } from "components/Input/FileUpload";
import ArquivoExistente from "./ArquivoExistente";
import { PaginaComCabecalhoRodape } from "components/PaginaComCabecalhoRodape";
export let CadastroEmpresa = (props) => {
  const initialValue = {
    nome_fantasia: undefined,
    endereco: undefined,
    numero: undefined,
    complemento: undefined,
    telefone: undefined,
    cidade: undefined,
    uf: undefined,
    bairro: undefined,
    cep: undefined,
  };

  const [empresa, setEmpresa] = useState(null);
  const [erroGetEmpresa, setErroGetEmpresa] = useState(false);
  const [algumUploadEmAndamento, setAlgumUploadEmAndamento] = useState(false);
  const [faltaArquivos, setFaltaArquivos] = useState(true);
  const [loja, setLoja] = useState([initialValue]);
  const [fornecimento, setFornecimento] = useState([]);
  const [bandeiras] = useState([]);
  const [uuid, setUuid] = useState(null);
  const [alerta, setAlerta] = useState(false);
  const [sucesso] = useState(false);
  const [tiposDocumentos, setTiposDocumentos] = useState([]);
  const [tiposFornecimentos, setTiposFornecimentos] = useState([]);
  const [limparFornecimento, setLimparFornecimento] = useState(false);
  const [arquivosAnexos] = useState([]);
  const [tab, setTab] = useState("cadastro");
  const [mensagem, setMensagem] = useState("");
  const [limite, setLimite] = useState([]);
  const [limites, setLimites] = useState(null);
  const [edital, setEdital] = useState({ url: "", label: "edital" });
  const [editalClick, setEditalClick] = useState(null);
  const [datasValidades, setDatasValidades] = useState({});

  const limparListaLojas = () => {
    setLoja([initialValue]);
  };
  useEffect(() => {
    const carregaTiposDocumentos = async () => {
      const documentos = await getTiposDocumentos();
      setTiposDocumentos(documentos);
    };
    const carregaEmpresa = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const uuid = urlParams.get("uuid");
      if (uuid) {
        setTab("anexos");
        getEmpresa(uuid).then((response) => {
          if (response.status === HTTP_STATUS.OK) {
            setEmpresaEFaltaArquivos(response.data);
            setUuid(uuid);
          } else {
            setErroGetEmpresa(true);
          }
        });
      }
    };
    const carregaTiposFornecimentos = async () => {
      const fornecimentos = await getTiposFornecimentos();
      setTiposFornecimentos(fornecimentos);
    };
    carregaTiposDocumentos().then((_) => {
      carregaEmpresa();
    });

    const carregaLimites = async () => {
      const limites = await getLimites();
      setLimites(limites);
    };
    carregaLimites();
    carregaTiposFornecimentos();
    setEditalClick(
      !edital.url
        ? (e) => {
            downloadEdital(e);
          }
        : null
    );

    get_edital_link();
  }, [limparFornecimento]);

  const setEmpresaEFaltaArquivos = (empresa) => {
    setEmpresa(empresa);
    props.change("cnpj", empresa.cnpj);
    props.change("razao_social", empresa.razao_social);
    props.change("end_logradouro", empresa.end_logradouro);
    props.change("end_cidade", empresa.end_cidade);
    props.change("end_uf", empresa.end_uf);
    props.change("end_cep", empresa.end_cep);
    props.change("email", empresa.email);
    props.change("telefone", empresa.telefone);
    props.change("responsavel", empresa.responsavel);
    setLoja(empresa.lojas);
    verificarSeFaltamArquivos(empresa);
  };

  const useForceUpdate = () => {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick((tick) => tick + 1);
    }, []);
    return update;
  };

  const forceUpdate = useForceUpdate();

  const verificarSeFaltamArquivos = (empresa) => {
    let aindaFaltaDocumentoObrigatorio = false;
    tiposDocumentos.forEach((tipoDocumento) => {
      if (
        tipoDocumento.obrigatorio &&
        !empresa.arquivos_anexos.find(
          (arquivo) => arquivo.tipo_documento.id === tipoDocumento.id
        )
      )
        aindaFaltaDocumentoObrigatorio = true;
    });
    let aindaFaltamArquivos =
      empresa.lojas.find((loja) => loja.foto_fachada === null) ||
      empresa.arquivos_anexos.length === 0 ||
      aindaFaltaDocumentoObrigatorio;
    setFaltaArquivos(aindaFaltamArquivos);
  };

  const addLoja = () => {
    loja.push(initialValue);
    setLoja([...loja]);
  };

  const downloadEdital = (e) => {
    //e.preventDefault()
    if (edital.url) {
      const link = document.createElement("a");
      link.href = edital.url;
      link.target = "_blank";
      link.click();
    }
  };

  const switchTab = (tab) => {
    if (uuid) {
      setTab(tab);
    }
  };

  const delLoja = (index) => {
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

  const maiorQueLimite = (eMaior, idTipo) => {
    if (eMaior && !limite.includes(idTipo)){
      setLimite([...limite, idTipo])
    }
    else if(!eMaior && limite.includes(idTipo)){
      setLimite(limite.filter(limite => limite !== idTipo));
    }
    
  };

  const onUpdateUniforme = (valor, chave) => {
    fornecimento[chave] = valor;
    setFornecimento([...fornecimento]);
  };

  const contadorLoja = useMemo(() => loja.length, [loja]);

  const showMessage = (mensagem) => {
    setMensagem(mensagem);
    setAlerta(true);
    setTimeout(() => {
      setAlerta(false);
      setMensagem("");
    }, 10000);
  };

  const get_edital_link = async () => {
    let url = "";
    try {
      url = await busca_url_edital();
    } catch (e) {}
    setEdital({ ...edital, url });
  };

  const onSubmit = async (payload) => {
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

    let emailStatus = await verificaEmail(payload.email);
    if (emailStatus && emailStatus.email_cadastrado === "Sim") {
      window.scrollTo(0, 0);
      showMessage(
        "Esse E-mail já está inscrito no programa de fornecimento de uniformes."
      );
      return;
    }

    if (limite.length) {
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
      const erro = validaFormulario(payload);
      if (erro) {
        toastError(erro);
      } else {
        if (
          window.confirm(
            "Deseja mesmo enviar essas informações? Após o envio essas informações não poderão ser alteradas. Certifique-se que tudo foi informado corretamente e que você adicionou todas as suas lojas."
          )
        ) {
          try {
            const response = await cadastrarEmpresa(payload);
            if (response.status === HTTP_STATUS.CREATED) {
              props.reset();
              limparListaLojas();
              window.location.search += `?uuid=${response.data.uuid}`;
            } else {
              toastError(getError(response.data));
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
    }
  };

  const filtrarFornecimento = (payload) => {
    return payload.filter(
      (value) => value !== undefined && Object.keys(value).length > 0
    );
  };

  const validaUniformes = (payload) => {
    if (payload.length > 0) {
      if (validaOfertaUniforme(payload)) {
        window.scrollTo(0, 0);
        showMessage("Por favor, selecione um Tipo de Fornecimento com o valor correspondente");
        return false;
      }
    } else {
      window.scrollTo(0, 0);
      showMessage("Por favor, selecione um Tipo de Fornecimento com o valor correspondente");

      return false;
    }
    return true;
  };

  const uploadAnexo = async (e, tipo, key) => {
    const arquivoAnexo = {
      ...e[0],
      tipo_documento: tipo.id,
      proponente: uuid,
      data_validade: datasValidades[key],
    };
    let tiposDocumentos_ = tiposDocumentos;
    tiposDocumentos_[key].uploadEmAndamento = true;
    setTiposDocumentos(tiposDocumentos_);
    setAlgumUploadEmAndamento(true);
    forceUpdate();
    setAnexo(arquivoAnexo).then((response) => {
      if (response.status === HTTP_STATUS.CREATED) {
        toastSuccess("Arquivo salvo com sucesso!");
        let tiposDocumentos_ = tiposDocumentos;
        tiposDocumentos_[key].uploadEmAndamento = false;
        setTiposDocumentos(tiposDocumentos_);
        setAlgumUploadEmAndamento(false);
        getEmpresa(uuid).then((empresa) => {
          setEmpresaEFaltaArquivos(empresa.data);
        });
      } else {
        toastError("Erro ao dar upload no arquivo");
        let tiposDocumentos_ = tiposDocumentos;
        tiposDocumentos_[key].uploadEmAndamento = false;
        setTiposDocumentos(tiposDocumentos_);
        setAlgumUploadEmAndamento(false);
      }
    });
  };

  const uploadFachadaLoja = async (e, uuidLoja, key) => {
    if (!e[0].arquivo.includes("image/")) {
      toastError("Formato de arquivo inválido");
    } else {
      const arquivoAnexo = {
        foto_fachada: e[0].arquivo,
      };
      let empresa_ = empresa;
      empresa_.lojas[key].uploadEmAndamento = true;
      setEmpresa(empresa_);
      setAlgumUploadEmAndamento(true);
      forceUpdate();
      setFachadaLoja(arquivoAnexo, uuidLoja).then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Arquivo salvo com sucesso!");
          let empresa_ = empresa;
          empresa_.lojas[key].uploadEmAndamento = false;
          setEmpresa(empresa_);
          setAlgumUploadEmAndamento(false);
          getEmpresa(uuid).then((empresa) => {
            setEmpresaEFaltaArquivos(empresa.data);
          });
        } else {
          toastError("Erro ao dar upload no arquivo");
          let empresa_ = empresa;
          empresa_.lojas[key].uploadEmAndamento = false;
          setEmpresa(empresa_);
          setAlgumUploadEmAndamento(false);
        }
      });
    }
  };

  const deleteFachadaLoja = async (uuidLoja) => {
    if (window.confirm("Deseja remover este anexo?")) {
      const arquivoAnexo = {
        foto_fachada: null,
      };
      setFachadaLoja(arquivoAnexo, uuidLoja).then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Arquivo excluído com sucesso!");
          getEmpresa(uuid).then((empresa) => {
            setEmpresaEFaltaArquivos(empresa.data);
          });
        } else {
          toastError("Erro ao dar excluir no arquivo");
        }
      });
    }
  };

  const removeAnexo = async (uuidAnexo) => {
    if (window.confirm("Deseja remover este anexo?")) {
      deleteAnexo(uuidAnexo).then((response) => {
        if (response.status === HTTP_STATUS.NO_CONTENT) {
          toastSuccess("Arquivo removido com sucesso!");
          getEmpresa(uuid).then((empresa) => {
            setEmpresaEFaltaArquivos(empresa.data);
          });
        } else {
          toastError("Erro ao remover arquivo");
        }
      });
    }
  };

  const finalizarCadastro = () => {
    if (faltaArquivos) {
      toastError(
        "É preciso anexar todos os arquivos obrigatórios para finalizar seu cadastro"
      );
    } else {
      concluirCadastro(uuid).then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          window.location.href = "/confirmacao-cadastro";
        } else {
          toastError("Erro ao finalizar cadastro");
        }
      });
    }
  };

  const labelTemplate = (tipo) => {
    return <div dangerouslySetInnerHTML={{ __html: tipo.nome }} />;
  };

  const { handleSubmit, pristine, submitting, reset } = props;

  return (
    <PaginaComCabecalhoRodape>
      {erroGetEmpresa ? (
        <div className="p-5 text-center">Erro ao carregar empresa.</div>
      ) : window.document.documentMode ? (
        <div className="p-5 text-center">
          Página não suportada em Internet Explorer
        </div>
      ) : (
        <div id="conteudo" className="desenvolvimento-escolar">
          <div className="container pt-3 pb-5">
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
                    tab === "cadastro"
                      ? "active"
                      : uuid
                      ? "enabled"
                      : "inactive"
                  }`}
                >
                  CADASTRO
                </div>
                <div
                  onClick={() => switchTab("anexos")}
                  className={`tab col-6 ml-2 ${
                    tab === "anexos" ? "active" : uuid ? "enabled" : "inactive"
                  }`}
                >
                  ANEXOS
                </div>
              </div>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {tab === "cadastro" && (
                <Fragment>
                  <div className="row mb-2">
                    <div className="col-md-6 col-xs-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title">Dados da Empresa</div>
                          <DadosEmpresa empresa={empresa} />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-xs-12">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title">
                            Preços máximos por item (fornecimento)
                          </div>
                          <div className="pt-3 undertitle">
                            Tipo de Fornecimento
                          </div>
                          <hr className="pb-3" />
                          {limites && tiposFornecimentos ? (
                            tiposFornecimentos
                              .filter((tipo) => tipo.uniformes.length > 0)
                              .map((tipo, key) => {
                                return (
                                  <TiposFornecimentos
                                    key={key}
                                    empresa={empresa}
                                    tipo={tipo}
                                    onUpdate={onUpdateUniforme}
                                    limites={limites}
                                    maiorQueLimite={maiorQueLimite}
                                  />
                                );
                              })
                          ) : (
                            <div>Erro ao carregar tipos de fornecimentos</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card mt-2">
                    <div className="card-body">
                      <div className="card-title">
                        Informações sobre ponto de venda físico ou stand de
                        vendas
                      </div>
                      {loja.map((value, key) => (
                        <div key={key}>
                          <LojaFisica
                            id={key}
                            key={key}
                            empresa={empresa}
                            chave={key}
                            nome_fantasia={value.nome_fantasia}
                            cep={empresa && value.cep}
                            bairro={empresa && value.bairro}
                            numero={empresa && value.numero}
                            cidade={empresa && "São Paulo"}
                            uf={empresa && "SP"}
                            complemento={empresa && value.complemento}
                            endereco={empresa && value.endereco}
                            telefone={empresa && value.telefone}
                            site={empresa && value.site}
                            comprovante_endereco={empresa && value.comprovante_endereco}
                            onUpdate={onUpdateLoja}
                          />
                          {!empresa && (
                            <Button
                              disabled={contadorLoja <= 1 ? true : false}
                              variant="outline-danger"
                              block
                              onClick={() => delLoja(key)}
                              className="mb-1"
                            >
                              <i className="fas fa-trash" />
                            </Button>
                          )}
                          {empresa && key !== loja.length - 1 && <hr />}
                        </div>
                      ))}
                      {!empresa && (
                        <Button block onClick={() => addLoja(contadorLoja)}>
                          <i className="fas fa-plus-circle" /> Novo Endereço
                        </Button>
                      )}
                    </div>
                  </div>
                  {!uuid && (
                    <Fragment>
                      <div className="form-group pt-3">
                        <div className="form-check">
                          <Field
                            component={"input"}
                            name="declaracao"
                            className="form-check-input"
                            required
                            type="checkbox"
                          />
                          <label title="" className="form-check-label">
                            Declaro que as informações acima prestadas são
                            verdadeiras.
                          </label>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-check">
                          <Field
                            component={"input"}
                            name="condicoes"
                            className="form-check-input"
                            required
                            type="checkbox"
                          />
                          <label title="" className="form-check-label">
                            Li e concordo com os termos e condições apresentados
                            no
                            <a
                              className="links-intrucoes"
                              href={edital.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={editalClick}
                            >
                              <strong> {edital.label}.</strong>
                            </a>
                          </label>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="form-check">
                          <Field
                            component={"input"}
                            name="declaracao2"
                            className="form-check-input"
                            required
                            type="checkbox"
                          />
                          <label title="" className="form-check-label">
                            Declaro que fornecerei os itens pelos valores
                            máximos indicados acima
                          </label>
                        </div>
                      </div>
                    </Fragment>
                  )}
                </Fragment>
              )}
              {tab === "anexos" && (
                <Fragment>
                  <div className="card w-100 mt-2">
                    <div className="card-body">
                      <div className="card-title">
                        Fachadas das Lojas/dos Estandes
                      </div>
                      {empresa &&
                        empresa.lojas.map((loja, key) => {
                          return !loja.foto_fachada ? (
                            <div
                              className={`${
                                algumUploadEmAndamento &&
                                !loja.uploadEmAndamento
                                  ? "set-opacity"
                                  : undefined
                              } `}
                            >
                              <Field
                                component={FileUpload}
                                name={`arqs_${key}`}
                                disabled={algumUploadEmAndamento}
                                id={`${key}`}
                                key={key}
                                accept="image/*"
                                acceptCustom="image/png, image/jpg, image/jpeg"
                                className="form-control-file"
                                label={`${loja.nome_fantasia} - ${loja.endereco}`}
                                required
                                validate={valide(true)}
                                multiple={false}
                                onChange={(e) => {
                                  if (e.length > 0) {
                                    uploadFachadaLoja(e, loja.uuid, key);
                                  }
                                }}
                              />
                              {loja.uploadEmAndamento && (
                                <span className="font-weight-bold">
                                  {`Upload de documento em andamento. `}
                                  <span className="red-word">Aguarde</span>
                                  <span className="blink">...</span>
                                </span>
                              )}
                            </div>
                          ) : (
                            <div>
                              <ArquivoExistente
                                label={`${loja.nome_fantasia} - ${loja.endereco}`}
                                arquivo={loja.foto_fachada}
                                lojaUuid={loja.uuid}
                                proponenteStatus={empresa && empresa.status}
                                removeAnexo={deleteFachadaLoja}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="card w-100 mt-2">
                    <div className="card-body">
                      <div className="card-title">Documentos Anexos</div>
                      {tiposDocumentos ? (
                        tiposDocumentos.map((tipo, key) => {
                          return empresa &&
                            empresa.arquivos_anexos.find(
                              (arquivo) => arquivo.tipo_documento.id === tipo.id
                            ) ? (
                            <div>
                              <ArquivoExistente
                                label={labelTemplate(tipo)}
                                arquivo={empresa.arquivos_anexos.find(
                                  (arquivo) =>
                                    arquivo.tipo_documento.id === tipo.id
                                )}
                                proponenteStatus={empresa && empresa.status}
                                removeAnexo={removeAnexo}
                              />
                            </div>
                          ) : empresa && empresa.status === "INSCRITO" ? (
                            <div className="no-file-end-signup pt-3">
                              <div className="label">{labelTemplate(tipo)}</div>
                              <div>
                                Seu cadastro foi finalizado e você não pode mais
                                enviar este anexo.
                              </div>
                            </div>
                          ) : (
                            <div
                              className={`${
                                algumUploadEmAndamento &&
                                !tipo.uploadEmAndamento
                                  ? "set-opacity"
                                  : undefined
                              } `}
                            >
                              <Field
                                component={FileUpload}
                                name={`arqs_${key}`}
                                disabled={
                                  algumUploadEmAndamento ||
                                  (tipo.tem_data_validade &&
                                    (!datasValidades[key] ||
                                      moment(datasValidades[key]).diff(
                                        moment(),
                                        "days"
                                      ) < 9))
                                }
                                id={`${key}`}
                                key={key}
                                accept=".pdf, .png, .jpg, .jpeg, .zip"
                                acceptCustom="image/png, image/jpg, image/jpeg, application/zip, application/pdf"
                                className="form-control-file"
                                label={labelTemplate(tipo)}
                                resetarFile={tipo.resetarFile}
                                required={tipo.obrigatorio}
                                validate={valide(tipo.obrigatorio)}
                                multiple={false}
                                onChange={(e) => {
                                  if (e.length > 0) {
                                    uploadAnexo(e, tipo, key);
                                  }
                                }}
                              />
                              <div className="row">
                                <div className="col-6">
                                  <div className="campos-permitidos">
                                    {tipo.tem_data_validade && (
                                      <div>
                                        <strong>
                                          Insira a data de validade do documento
                                          para habilitar o botão de upload.{" "}
                                          <br /> Validade mínima: 10 dias
                                          corridos
                                        </strong>
                                      </div>
                                    )}
                                    Formatos permitidos: .png, .jpg, .jpeg,
                                    .zip, .pdf
                                    <br />
                                    Tamanho máximo: 5 MB
                                  </div>
                                  {tipo.tem_data_validade && (
                                    <div className="data-validade">
                                      <label className="pr-3">
                                        <span>* </span>Data de validade do
                                        documento:
                                      </label>
                                      <Field
                                        component="input"
                                        name={`data_validade_${key}`}
                                        min={moment()
                                          .add(10, "days")
                                          .format("YYYY-MM-DD")}
                                        type="date"
                                        onChange={(e) =>
                                          setDatasValidades({
                                            ...datasValidades,
                                            [key]: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                  )}
                                </div>
                                {empresa &&
                                  empresa.arquivos_anexos.find(
                                    (arquivo) =>
                                      arquivo.tipo_documento.id === tipo.id
                                  ) &&
                                  ["REPROVADO", "VENCIDO"].includes(
                                    empresa.arquivos_anexos.find(
                                      (arquivo) =>
                                        arquivo.tipo_documento.id === tipo.id
                                    ).status
                                  ) && (
                                    <div className="col-6">
                                      <div>
                                        <div className="font-weight-bold">
                                          Por favor, atualize o documento.
                                        </div>
                                        <span className="font-weight-bold">
                                          Status:{" "}
                                        </span>
                                        {
                                          empresa.arquivos_anexos.find(
                                            (arquivo) =>
                                              arquivo.tipo_documento.id ===
                                              tipo.id
                                          ).status
                                        }
                                      </div>
                                      <div>
                                        <span className="font-weight-bold">
                                          Justificativa:{" "}
                                        </span>
                                        {empresa.arquivos_anexos.find(
                                          (arquivo) =>
                                            arquivo.tipo_documento.id ===
                                            tipo.id
                                        ).justificativa || "Sem justificativa"}
                                      </div>
                                      {empresa.arquivos_anexos.find(
                                        (arquivo) =>
                                          arquivo.tipo_documento.id === tipo.id
                                      ).data_validade && (
                                        <div>
                                          {moment(
                                            empresa.arquivos_anexos.find(
                                              (arquivo) =>
                                                arquivo.tipo_documento.id ===
                                                tipo.id
                                            ).data_validade
                                          ).diff(moment(), "days") +
                                            1 >=
                                            0 && (
                                            <div>
                                              <strong>
                                                Documento vence em:{" "}
                                              </strong>
                                              {moment(
                                                empresa.arquivos_anexos.find(
                                                  (arquivo) =>
                                                    arquivo.tipo_documento
                                                      .id === tipo.id
                                                ).data_validade
                                              ).diff(moment(), "days") + 1}{" "}
                                              dias
                                            </div>
                                          )}
                                          {moment(
                                            empresa.arquivos_anexos.find(
                                              (arquivo) =>
                                                arquivo.tipo_documento.id ===
                                                tipo.id
                                            ).data_validade
                                          ).diff(moment(), "days") +
                                            1 <
                                            0 && (
                                            <div>
                                              <strong>
                                                Documento vencido a:{" "}
                                              </strong>
                                              {Math.abs(
                                                moment(
                                                  empresa.arquivos_anexos.find(
                                                    (arquivo) =>
                                                      arquivo.tipo_documento
                                                        .id === tipo.id
                                                  ).data_validade
                                                ).diff(moment(), "days") + 1
                                              )}{" "}
                                              dias
                                            </div>
                                          )}
                                        </div>
                                      )}
                                      <a
                                        target="blank"
                                        href={
                                          empresa.arquivos_anexos.find(
                                            (arquivo) =>
                                              arquivo.tipo_documento.id ===
                                              tipo.id
                                          ).arquivo.arquivo ||
                                          empresa.arquivos_anexos.find(
                                            (arquivo) =>
                                              arquivo.tipo_documento.id ===
                                              tipo.id
                                          ).arquivo
                                        }
                                      >
                                        Visualizar arquivo
                                      </a>
                                    </div>
                                  )}
                              </div>
                              {tipo.uploadEmAndamento && (
                                <span className="font-weight-bold">
                                  {`Upload de documento em andamento. `}
                                  <span className="red-word">Aguarde</span>
                                  <span className="blink">...</span>
                                </span>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div>
                          Erro ao carregar Tipos de Documentos para anexar.
                        </div>
                      )}
                    </div>
                  </div>
                </Fragment>
              )}
              {tab === "cadastro" && !uuid && (
                <div className="row">
                  <div className="col-6 d-flex justify-content-start mt-4">
                    <Button
                      onClick={() => {
                        reset();
                        limparListaLojas();
                        window.scrollTo(0, 0);
                      }}
                      type="reset"
                      variant="outline-danger"
                    >
                      Limpar
                    </Button>
                  </div>
                  <div className="col-6 d-flex justify-content-end mt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={pristine || submitting}
                    >
                      Enviar
                    </Button>
                  </div>
                </div>
              )}
              {tab === "anexos" && empresa && empresa.status === "EM_PROCESSO" && (
                <div className="row">
                  <div className="col-12 text-right mt-4">
                    <Button
                      onClick={() => finalizarCadastro()}
                      type="reset"
                      variant="primary"
                    >
                      Finalizar
                    </Button>
                  </div>
                </div>
              )}
            </Form>
          </div>
        </div>
      )}
    </PaginaComCabecalhoRodape>
  );
};

CadastroEmpresa = reduxForm({
  form: "CadastroLojaForm",
  enableReinitialize: true,
})(CadastroEmpresa);

export default CadastroEmpresa;
