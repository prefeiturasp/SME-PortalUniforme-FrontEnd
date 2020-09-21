import React from "react";
import HTTP_STATUS from "http-status-codes";
import PaginaHeaderSidebar from "components/PaginaHeaderSidebar";
import { Field, Form } from "react-final-form";
import { required } from "helpers/validators";
import Botao from "components/Botao";
import InputText from "components/Input/InputText";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import "./style.scss";
import { atualizarSenhaLogado } from "services/perfil.service";
import { toastSuccess, toastError } from "components/Toast/dialogs";
import { getError } from "helpers/helpers";

export const AlterarSenha = () => {
  const onSubmit = (values) => {
    atualizarSenhaLogado(localStorage.getItem("uuid"), values).then(
      (response) => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Senha atualizada com sucesso");
        } else {
          toastError(getError(response.data));
        }
      }
    );
  };

  return (
    <div className="alterar-senha">
      <PaginaHeaderSidebar>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <h2>Altere sua senha</h2>
              <Field
                component={InputText}
                esconderAsterisco
                label="Senha atual"
                name="senha_atual"
                placeholder={"******"}
                required
                type="password"
                validate={required}
              />
              <Field
                component={InputText}
                esconderAsterisco
                label="Nova senha"
                name="senha1"
                placeholder={"******"}
                required
                type="password"
                validate={required}
                pattern="(?=.*\d)(?=.*[a-z]).{8,}"
                title="Pelo menos 8 caracteres, uma letra e um número"
                helpText="Pelo menos 8 caracteres, uma letra e um número"
              />
              <Field
                component={InputText}
                esconderAsterisco
                label="Confirmar nova senha"
                name="senha2"
                placeholder={"******"}
                required
                type="password"
                validate={required}
              />
              <Botao
                className="mt-3 offset-4 col-4"
                style={BUTTON_STYLE.BLUE}
                texto="Alterar senha"
                type={BUTTON_TYPE.SUBMIT}
              />
            </form>
          )}
        />
      </PaginaHeaderSidebar>
    </div>
  );
};
