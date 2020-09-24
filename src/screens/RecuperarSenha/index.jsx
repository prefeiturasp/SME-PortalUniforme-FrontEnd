import React from "react";
import HTTP_STATUS from "http-status-codes";
import { HeaderLogo } from "components/HeaderLogo";
import { Field, Form } from "react-final-form";
import { required } from "helpers/fieldValidators";
import { InputText } from "components/Input/InputText";
import Botao from "components/Botao";
import { useHistory } from "react-router-dom";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import { atualizarSenha } from "services/perfil.service";
import { toastSuccess, toastError } from "components/Toast/dialogs";
import { getError } from "helpers/helpers";

export const RecuperarSenha = () => {
  const history = useHistory();

  const onSubmit = (values) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const confirmationKey = urlParams.get("confirmationKey");
    atualizarSenha(id, confirmationKey, values).then((response) => {
      if (response.status === HTTP_STATUS.OK) {
        toastSuccess("Senha atualizada com sucesso");
        setTimeout(() => {
          history.push("/login");
        }, 1500);
      } else {
        toastError(getError(response.data));
      }
    });
  };

  return (
    <div className="text-center">
      <HeaderLogo />
      <div className="container mt-3">
        <div className="row">
          <div className="col-6 offset-3">
            <Form
              onSubmit={onSubmit}
              render={({
                handleSubmit,
                form,
                submitting,
                pristine,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <h2>Altere sua senha</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
};
