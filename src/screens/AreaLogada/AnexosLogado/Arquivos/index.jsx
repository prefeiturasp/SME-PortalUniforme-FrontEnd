import React, { useState, useEffect, useCallback } from "react";
import HTTP_STATUS from "http-status-codes";
import moment from "moment";
import { Field } from "react-final-form";
import { FileUpload } from "components/Input/FileUpload";
import { required } from "helpers/fieldValidators";
import { ArquivoExistente } from "./ArquivoExistente";
import { htmlTextToDiv } from "helpers/helpers";
import Botao from "components/Botao";
import { BUTTON_TYPE, BUTTON_STYLE } from "components/Botao/constants";
import { toastSuccess, toastError } from "components/Toast/dialogs";
import {
  getProponente,
  concluirCadastro,
  atualizaLojas,
} from "services/cadastro.service";
import { verificarSeFaltamArquivos } from "./helpers";
import { OnChange } from "react-final-form-listeners";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/nova-light/theme.css";
import "./style.scss";
import { formataEmpresa } from "screens/AreaLogada/DadosEmpresaLogado/helpers";
import {
  DOCUMENTO_ACCEPT,
  DOCUMENTO_ACCEPT_CUSTOM,
  DOCUMENTO_HELPER_TEXT,
  FACHADA_ACCEPT,
  FACHADA_ACCEPT_CUSTOM,
  FACHADA_HELPER_TEXT,
  TAMANHO_MAXIMO_UPLOAD,
} from "helpers/fileUpload";
import {
  ARQUIVO_SALVO_COM_SUCESSO,
  BOTAO_ENVIANDO_DOCUMENTOS_PARA_ANALISE,
  BOTAO_ENVIAR_DOCUMENTOS_PARA_ANALISE,
  getBloqueioEnvioDocumentosParaAnalise,
} from "helpers/documentosParaAnalise";
import { montarPayloadAtualizaLojas } from "helpers/lojasPayload";
import {
  deleteAnexo,
  getTiposDocumentos,
  setAnexo,
  setArquivoLoja,
} from "services/uniformes.service";

export const Arquivos = ({ empresa, setEmpresa, values, logado }) => {
  const [algumUploadEmAndamento, setAlgumUploadEmAndamento] = useState(false);
  const [tiposDocumentos, setTiposDocumentos] = useState(null);
  const [faltamArquivos, setFaltamArquivos] = useState(true);
  const [envioEmAndamento, setEnvioEmAndamento] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadDocumentos = async () => {
      const response = await getTiposDocumentos();
      setTiposDocumentos(response);
    };
    loadDocumentos();
  }, []);

  useEffect(() => {
    if (tiposDocumentos) {
      setEmpresaEFaltaArquivos(empresa);
    }
  });

  const useForceUpdate = () => {
    const [, setTick] = useState(0);
    const update = useCallback(() => {
      setTick((tick) => tick + 1);
    }, []);
    return update;
  };

  const forceUpdate = useForceUpdate();

  const setEmpresaEFaltaArquivos = (empresa) => {
    setEmpresa(formataEmpresa(empresa));
    setFaltamArquivos(verificarSeFaltamArquivos(empresa, tiposDocumentos));
  };

  const bloqueioEnvioDocumentosParaAnalise =
    getBloqueioEnvioDocumentosParaAnalise({
      faltamArquivos,
      algumUploadEmAndamento,
      envioEmAndamento,
      exigirKit: true,
      quantidadeKits: empresa && empresa.kits ? empresa.kits.length : 0,
    });

  const uploadFachadaLoja = async (e, uuidLoja, key) => {
    const arquivoAnexo = {
      foto_fachada: e[0].arquivo,
    };
    let empresa_ = {
      ...empresa,
      lojas: empresa.lojas.map((lojaAtual, index) =>
        index === key
          ? { ...lojaAtual, uploadEmAndamento: true }
          : lojaAtual
      ),
    };
    setEmpresa(empresa_);
    setAlgumUploadEmAndamento(true);
    forceUpdate();
    setArquivoLoja(arquivoAnexo, uuidLoja).then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess(ARQUIVO_SALVO_COM_SUCESSO);
        let empresa_ = {
          ...empresa,
          lojas: empresa.lojas.map((lojaAtual, index) =>
            index === key
              ? { ...lojaAtual, uploadEmAndamento: false }
              : lojaAtual
          ),
        };
        setEmpresa(empresa_);
        setAlgumUploadEmAndamento(false);
        getProponente(empresa.uuid).then((empresa) => {
          setEmpresaEFaltaArquivos(empresa.data);
        });
      } else {
        toastError("Erro ao dar upload no arquivo");
        let empresa_ = {
          ...empresa,
          lojas: empresa.lojas.map((lojaAtual, index) =>
            index === key
              ? { ...lojaAtual, uploadEmAndamento: false }
              : lojaAtual
          ),
        };
        setEmpresa(formataEmpresa(empresa_));
        setAlgumUploadEmAndamento(false);
      }
    });
  };

  const uploadComprovanteLoja = async (e, uuidLoja, key) => {
    const payload = montarPayloadAtualizaLojas(
      empresa,
      uuidLoja,
      "comprovante_endereco",
      e[0].arquivo
    );
    let empresa_ = {
      ...empresa,
      lojas: empresa.lojas.map((lojaAtual, index) =>
        index === key
          ? { ...lojaAtual, uploadEmAndamento: true }
          : lojaAtual
      ),
    };
    setEmpresa(empresa_);
    setAlgumUploadEmAndamento(true);
    forceUpdate();
    atualizaLojas(empresa.uuid, payload).then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess(ARQUIVO_SALVO_COM_SUCESSO);
        setEmpresaEFaltaArquivos(response.data);
        setAlgumUploadEmAndamento(false);
      } else {
        toastError("Erro ao dar upload no arquivo");
        let empresa_ = {
          ...empresa,
          lojas: empresa.lojas.map((lojaAtual, index) =>
            index === key
              ? { ...lojaAtual, uploadEmAndamento: false }
              : lojaAtual
          ),
        };
        setEmpresa(formataEmpresa(empresa_));
        setAlgumUploadEmAndamento(false);
      }
    });
  };

  const deleteFachadaLoja = async (uuidLoja) => {
    if (window.confirm("Deseja remover este anexo?")) {
      const arquivoAnexo = {
        foto_fachada: null,
      };
      setArquivoLoja(arquivoAnexo, uuidLoja).then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Arquivo excluído com sucesso!");
          getProponente(empresa.uuid).then((empresa) => {
            setEmpresaEFaltaArquivos(empresa.data);
          });
        } else {
          toastError("Erro ao dar excluir no arquivo");
        }
      });
    }
  };

  const deleteComprovanteLoja = async (uuidLoja) => {
    if (window.confirm("Deseja remover este anexo?")) {
      const payload = montarPayloadAtualizaLojas(
        empresa,
        uuidLoja,
        "comprovante_endereco",
        null
      );
      atualizaLojas(empresa.uuid, payload).then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Arquivo excluído com sucesso!");
          setEmpresaEFaltaArquivos(response.data);
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
          getProponente(empresa.uuid).then((empresa) => {
            setEmpresaEFaltaArquivos(empresa.data);
          });
        } else {
          toastError("Erro ao remover arquivo");
        }
      });
    }
  };

  const uploadAnexo = async (e, tipo, key, values) => {
    const arquivoAnexo = {
      arquivo: e[0].arquivo,
      tipo_documento: tipo.id,
      proponente: empresa.uuid,
      data_validade: values[`data_validade_${key}`],
    };
    let tiposDocumentos_ = tiposDocumentos;
    tiposDocumentos_[key].uploadEmAndamento = true;
    setTiposDocumentos(tiposDocumentos_);
    setAlgumUploadEmAndamento(true);
    forceUpdate();
    setAnexo(arquivoAnexo).then((response) => {
      if (response.status === HTTP_STATUS.CREATED) {
        toastSuccess(ARQUIVO_SALVO_COM_SUCESSO);
        let tiposDocumentos_ = tiposDocumentos;
        tiposDocumentos_[key].uploadEmAndamento = false;
        setTiposDocumentos(tiposDocumentos_);
        setAlgumUploadEmAndamento(false);
        getProponente(empresa.uuid).then((empresa) => {
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

  const enviarDocumentosParaAnalise = () => {
    if (bloqueioEnvioDocumentosParaAnalise) {
      toastError(bloqueioEnvioDocumentosParaAnalise);
      return;
    }

    setEnvioEmAndamento(true);
    concluirCadastro(empresa.uuid).then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        window.location.href = "/confirmacao-cadastro";
      } else {
        setEnvioEmAndamento(false);
        toastError("Erro ao enviar documentos para análise");
      }
    });
  };

  return (
    <div className="arquivos">
      <div className="card w-100 mt-2">
        <div className="card-body">
          <div className="card-title">Fachadas das Lojas/dos Estandes</div>
          {empresa &&
            empresa.lojas.map((loja, key) => {
              return !loja.foto_fachada ? (
                <div
                  key={`fachada_${loja.uuid || key}`}
                  className={`${
                    algumUploadEmAndamento && !loja.uploadEmAndamento
                      ? "set-opacity"
                      : undefined
                  } `}
                >
                  <Field
                    component={FileUpload}
                    name={`loja_${key}`}
                    disabled={algumUploadEmAndamento}
                    id={`${key}`}
                    key={key}
                    accept={FACHADA_ACCEPT}
                    acceptCustom={FACHADA_ACCEPT_CUSTOM}
                    className="form-control-file"
                    label={`${loja.nome_fantasia} - ${loja.endereco}`}
                    required
                    validate={required}
                    multiple={false}
                  />
                  <div className="campos-permitidos">
                    {FACHADA_HELPER_TEXT}
                    <br />
                    {TAMANHO_MAXIMO_UPLOAD}
                  </div>
                  <OnChange name={`loja_${key}`}>
                    {async (value, previous) => {
                      if (value.length > 0) {
                        uploadFachadaLoja(value, loja.uuid, key);
                      }
                    }}
                  </OnChange>
                  {loja.uploadEmAndamento && (
                    <span className="font-weight-bold">
                      {`Upload de documento em andamento. `}
                      <span className="red-word">Aguarde</span>
                      <span className="blink">...</span>
                    </span>
                  )}
                </div>
              ) : (
                <div key={`fachada_${loja.uuid || key}`}>
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
          <div className="card-title">
            Comprovantes de Endereço dos Pontos de Venda
          </div>
          {empresa &&
            empresa.lojas.map((loja, key) => {
              return loja.comprovante_endereco ? (
                <div key={`comprovante_${loja.uuid || key}`}>
                  <ArquivoExistente
                    label={`${loja.nome_fantasia} - ${loja.endereco}`}
                    arquivo={loja.comprovante_endereco}
                    lojaUuid={loja.uuid}
                    proponenteStatus={empresa && empresa.status}
                    removeAnexo={deleteComprovanteLoja}
                  />
                </div>
              ) : empresa && empresa.status !== "EM_PROCESSO" && !logado ? (
                <div
                  key={`comprovante_${loja.uuid || key}`}
                  className="no-file-end-signup pt-3"
                >
                  <div className="label">{`${loja.nome_fantasia} - ${loja.endereco}`}</div>
                  <div>
                    Seu cadastro foi finalizado e você não pode mais enviar este
                    anexo.
                  </div>
                </div>
              ) : (
                <div
                  key={`comprovante_${loja.uuid || key}`}
                  className={`${
                    algumUploadEmAndamento && !loja.uploadEmAndamento
                      ? "set-opacity"
                      : undefined
                  } `}
                >
                  <Field
                    component={FileUpload}
                    name={`comprovante_loja_${key}`}
                    disabled={algumUploadEmAndamento}
                    id={`comprovante_${key}`}
                    key={`comprovante_${key}`}
                    accept={DOCUMENTO_ACCEPT}
                    acceptCustom={DOCUMENTO_ACCEPT_CUSTOM}
                    className="form-control-file"
                    label={`${loja.nome_fantasia} - ${loja.endereco}`}
                    multiple={false}
                  />
                  <div className="campos-permitidos">
                    {DOCUMENTO_HELPER_TEXT}
                    <br />
                    {TAMANHO_MAXIMO_UPLOAD}
                  </div>
                  <OnChange name={`comprovante_loja_${key}`}>
                    {async (value) => {
                      if (value && value.length > 0) {
                        uploadComprovanteLoja(value, loja.uuid, key);
                      }
                    }}
                  </OnChange>
                  {loja.uploadEmAndamento && (
                    <span className="font-weight-bold">
                      {`Upload de documento em andamento. `}
                      <span className="red-word">Aguarde</span>
                      <span className="blink">...</span>
                    </span>
                  )}
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
                  (arquivo) =>
                    arquivo.tipo_documento.id === tipo.id &&
                    !["REPROVADO", "VENCIDO"].includes(arquivo.status)
                ) ? (
                <div key={`documento_${tipo.id}`}>
                  <ArquivoExistente
                    label={htmlTextToDiv(tipo)}
                    arquivo={empresa.arquivos_anexos.find(
                      (arquivo) => arquivo.tipo_documento.id === tipo.id
                    )}
                    proponenteStatus={empresa && empresa.status}
                    removeAnexo={removeAnexo}
                    logado={logado}
                  />
                  <hr />
                </div>
              ) : empresa && empresa.status !== "EM_PROCESSO" && !logado ? (
                <div key={`documento_${tipo.id}`} className="no-file-end-signup pt-3">
                  <div className="label">{htmlTextToDiv(tipo)}</div>
                  <div>
                    Seu cadastro foi finalizado e você não pode mais enviar este
                    anexo.
                  </div>
                </div>
              ) : (
                <div
                  key={`documento_${tipo.id}`}
                  className={`${
                    algumUploadEmAndamento && !tipo.uploadEmAndamento
                      ? "set-opacity"
                      : undefined
                  } `}
                >
                  <Field
                    component={FileUpload}
                    name={`arqs_${key}`}
                    id={`${key}`}
                    key={key}
                    accept={DOCUMENTO_ACCEPT}
                    acceptCustom={DOCUMENTO_ACCEPT_CUSTOM}
                    className="form-control-file"
                    label={htmlTextToDiv(tipo)}
                    resetarFile={tipo.resetarFile}
                    required={tipo.obrigatorio}
                    validate={tipo.obrigatorio && required}
                    disabled={
                      algumUploadEmAndamento ||
                      (tipo.tem_data_validade &&
                        (!values[`data_validade_${key}`] ||
                          moment(values[`data_validade_${key}`]).diff(
                            moment(),
                            "days"
                          ) < 9))
                    }
                    multiple={false}
                  />
                  <div className="row">
                    <div className="col-6">
                      <div className="campos-permitidos">
                        {tipo.tem_data_validade && (
                          <div>
                            <strong>
                              Insira a data de validade do documento para
                              habilitar o botão de upload. <br /> Validade
                              mínima: 10 dias corridos
                            </strong>
                          </div>
                        )}
                        {DOCUMENTO_HELPER_TEXT}
                        <br />
                        {TAMANHO_MAXIMO_UPLOAD}
                      </div>
                      {tipo.tem_data_validade && (
                        <div className="data-validade">
                          <label className="pr-3">
                            <span>* </span>Data de validade do documento:
                          </label>
                          <Field
                            component="input"
                            name={`data_validade_${key}`}
                            min={moment()
                              .add(10, "days")
                              .format("YYYY-MM-DD")}
                            type="date"
                          />
                        </div>
                      )}
                      <OnChange name={`arqs_${key}`}>
                        {async (value, previous) => {
                          if (value.length > 0) {
                            uploadAnexo(value, tipo, key, values);
                          }
                        }}
                      </OnChange>
                    </div>
                    {empresa.arquivos_anexos.find(
                      (arquivo) => arquivo.tipo_documento.id === tipo.id
                    ) &&
                      ["REPROVADO", "VENCIDO"].includes(
                        empresa.arquivos_anexos.find(
                          (arquivo) => arquivo.tipo_documento.id === tipo.id
                        ).status
                      ) && (
                        <div className="col-6">
                          <div>
                            <div className="font-weight-bold">
                              Por favor, atualize o documento.
                            </div>
                            <span className="font-weight-bold">Status: </span>
                            {
                              empresa.arquivos_anexos.find(
                                (arquivo) =>
                                  arquivo.tipo_documento.id === tipo.id
                              ).status
                            }
                          </div>
                          <div>
                            <span className="font-weight-bold">
                              Justificativa:{" "}
                            </span>
                            {empresa.arquivos_anexos.find(
                              (arquivo) => arquivo.tipo_documento.id === tipo.id
                            ).justificativa || "Sem justificativa"}
                          </div>
                          {empresa.arquivos_anexos.find(
                            (arquivo) => arquivo.tipo_documento.id === tipo.id
                          ).data_validade && (
                            <div>
                              {moment(
                                empresa.arquivos_anexos.find(
                                  (arquivo) =>
                                    arquivo.tipo_documento.id === tipo.id
                                ).data_validade
                              ).diff(moment(), "days") +
                                1 >=
                                0 && (
                                <div>
                                  <strong>Documento vence em: </strong>
                                  {moment(
                                    empresa.arquivos_anexos.find(
                                      (arquivo) =>
                                        arquivo.tipo_documento.id === tipo.id
                                    ).data_validade
                                  ).diff(moment(), "days") + 1}{" "}
                                  dias
                                </div>
                              )}
                              {moment(
                                empresa.arquivos_anexos.find(
                                  (arquivo) =>
                                    arquivo.tipo_documento.id === tipo.id
                                ).data_validade
                              ).diff(moment(), "days") +
                                1 <
                                0 && (
                                <div>
                                  <strong>Documento vencido a: </strong>
                                  {Math.abs(
                                    moment(
                                      empresa.arquivos_anexos.find(
                                        (arquivo) =>
                                          arquivo.tipo_documento.id === tipo.id
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
                                  arquivo.tipo_documento.id === tipo.id
                              ).arquivo.arquivo ||
                              empresa.arquivos_anexos.find(
                                (arquivo) =>
                                  arquivo.tipo_documento.id === tipo.id
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
                  <hr />
                </div>
              );
            })
          ) : (
            <div>Erro ao carregar Tipos de Documentos para anexar.</div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-right mt-3 mb-3">
          {empresa && empresa.status === "EM_PROCESSO" && (
            <>
              {bloqueioEnvioDocumentosParaAnalise && (
                <div className="font-weight-bold mb-2 text-left">
                  {bloqueioEnvioDocumentosParaAnalise}
                </div>
              )}
              <Botao
                type={BUTTON_TYPE.BUTTON}
                style={BUTTON_STYLE.BLUE}
                onClick={() => enviarDocumentosParaAnalise()}
                disabled={!!bloqueioEnvioDocumentosParaAnalise}
                texto={
                  envioEmAndamento
                    ? BOTAO_ENVIANDO_DOCUMENTOS_PARA_ANALISE
                    : BOTAO_ENVIAR_DOCUMENTOS_PARA_ANALISE
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
