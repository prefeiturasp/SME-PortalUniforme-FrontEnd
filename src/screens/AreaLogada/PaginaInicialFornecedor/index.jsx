import React, { useState, useEffect } from "react";
import HTTP_STATUS from "http-status-codes";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import { getProponente } from "services/cadastro.service";
import { toastError } from "components/Toast/dialogs";
import { LoadingCircle } from "components/LoadingCircle";
import { getStatus } from "helpers/helpers";
import "./style.scss";

export const PaginaInicialFornecedor = () => {
  const [empresa, setEmpresa] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const carregaEmpresa = async () => {
      getProponente(localStorage.getItem("uuid")).then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setEmpresa(response.data);
        } else {
          toastError("Erro ao carregar dados da empresa");
        }
      });
    };
    carregaEmpresa();
  }, []);

  return (
    <div className="pagina-inicial">
      <PaginaHeaderSidebar>
        {empresa ? (
          <div>
            <div className="card">
              <div className="card-body">
                <strong>Status: </strong>
                {getStatus(empresa.status)}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6">
                <div className="card avisos">
                  <div className="card-body">
                    <h2>Avisos</h2>
                    {empresa.observacao || "Sem observações."}
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card avisos">
                  <div className="card-body">
                    <h2>Irregularidades nos anexos</h2>
                    {empresa.arquivos_anexos.filter((arquivo) =>
                      ["REPROVADO", "VENCIDO"].includes(arquivo.status)
                    ).length === 0 && (
                      <div>Não há irregularidades nos documentos anexos.</div>
                    )}
                    {empresa.arquivos_anexos.filter((arquivo) =>
                      ["REPROVADO", "VENCIDO"].includes(arquivo.status)
                    ).length > 0 &&
                      empresa.arquivos_anexos
                        .filter((arquivo) =>
                          ["REPROVADO", "VENCIDO"].includes(arquivo.status)
                        )
                        .map((arquivo) => {
                          return (
                            <div className="arquivos-irregulares mb-3">
                              <div className="doc-nome">
                                <span>Documento:</span>{" "}
                                {arquivo.tipo_documento.nome}
                              </div>
                              <div className="doc-status">
                                <span>Status:</span> {arquivo.status}
                              </div>
                              {arquivo.status === "VENCIDO" && (
                                <div className="doc-data">
                                  <span>Vencido em:</span>{" "}
                                  {arquivo.data_validade
                                    ? arquivo.data_validade
                                        .split("-")
                                        .reverse()
                                        .join("/")
                                    : "Sem data de validade"}
                                </div>
                              )}
                              <div className="doc-justificativa">
                                <span>Justificativa:</span>{" "}
                                {arquivo.justificativa || "Sem justificativa"}
                              </div>
                            </div>
                          );
                        })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <LoadingCircle />
        )}
      </PaginaHeaderSidebar>
    </div>
  );
};
