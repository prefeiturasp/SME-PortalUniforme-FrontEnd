import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Form } from "react-final-form";
import { getProponente } from "services/cadastro.service";
import { toastError } from "components/Toast/dialogs";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import { Arquivos } from "./Arquivos";
import { LoadingCircle } from "components/LoadingCircle";
import { formataEmpresa } from "../DadosEmpresaLogado/helpers";
import "./style.scss";

export const AnexosLogado = () => {
  const [empresa, setEmpresa] = useState(null);

  const onSubmit = (values) => {
    console.log(values);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const carregaEmpresa = async () => {
      getProponente(localStorage.getItem("uuid")).then((response) => {
        if (response.status === HTTP_STATUS.OK) {
          setEmpresa(formataEmpresa(response.data));
        } else {
          toastError("Erro ao carregar dados da empresa");
        }
      });
    };
    carregaEmpresa();
  }, []);

  return (
    <div className="anexos-logado">
      <PaginaHeaderSidebar>
        <Form
          onSubmit={onSubmit}
          initialValues={{
            ...empresa,
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              {empresa ? (
                <Arquivos
                  values={values}
                  empresa={empresa}
                  setEmpresa={setEmpresa}
                  logado={true}
                />
              ) : (
                <LoadingCircle />
              )}
            </form>
          )}
        />
      </PaginaHeaderSidebar>
    </div>
  );
};
