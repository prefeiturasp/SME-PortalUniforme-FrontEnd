import React, { useEffect, useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { Cadastro } from "./Cadastro";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import { getProponente, atualizaLojas } from "services/cadastro.service";
import { toastError, toastSuccess } from "components/Toast/dialogs";
import { LoadingCircle } from "components/LoadingCircle";
import "./style.scss";
import {
  formataEmpresa,
  formataPayloadLojasPrecos,
  validaTabelaPrecos,
} from "./helpers";
import { getLimites, getTiposFornecimentos } from "services/uniformes.service";
import { getError } from "helpers/utils";

export const DadosEmpresaLogado = () => {
  const [empresa, setEmpresa] = useState(null);
  const [tiposDeUniforme, setTiposDeUniforme] = useState(null);
  const [limites, setLimites] = useState(null);

  const onSubmit = (values) => {
    const erro = validaTabelaPrecos(values, tiposDeUniforme, limites);
    if (erro) {
      toastError(erro);
    } else {
      let continuar = true;
      if (empresa.status === "CREDENCIADO") {
        continuar = window.confirm(
          "Você está com status CREDENCIADO. Ao alterar suas informações, seu status passará para ALTERADO para que suas informações sejam reavalidadas. Deseja prosseguir?"
        );
      }
      if (continuar) {
        atualizaLojas(
          localStorage.getItem("uuid"),
          formataPayloadLojasPrecos(values, tiposDeUniforme)
        )
          .then((response) => {
            if (response.status === HTTP_STATUS.OK) {
              toastSuccess("Loja(s) atualizada(s) com sucesso");
              setEmpresa(formataEmpresa(response.data));
            } else {
              toastError(getError(response.data));
            }
          })
          .catch(() => {
            toastError("Erro ao atualizar dados da loja");
          });
      }
    }
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
    getTiposFornecimentos().then((response) => {
      setTiposDeUniforme(response);
    });
    getLimites().then((response) => {
      setLimites(response);
    });
    carregaEmpresa();
  }, []);

  return (
    <div className={`dados-empresa-logado`}>
      {!empresa && <LoadingCircle />}
      <PaginaHeaderSidebar>
        <div className={`${!empresa ? "opaco" : undefined}`}>
          <Form
            onSubmit={onSubmit}
            mutators={{
              ...arrayMutators,
            }}
            initialValues={{
              ...empresa,
            }}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                {" "}
                <Cadastro
                  values={values}
                  empresa={empresa}
                  form={form}
                  logado={true}
                  tiposDeUniforme={tiposDeUniforme}
                  limites={limites}
                />
              </form>
            )}
          />
        </div>
      </PaginaHeaderSidebar>
    </div>
  );
};
