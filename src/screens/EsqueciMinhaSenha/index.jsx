import React, { useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Form, Field } from "react-final-form";
import Botao from "components/Botao";
import { BUTTON_STYLE, BUTTON_TYPE } from "components/Botao/constants";
import { useHistory } from "react-router-dom";
import { required } from "helpers/fieldValidators";
import { InputText } from "components/Input/InputText";
import logoSME from "img/logo-sme.svg";
import { recuperaSenha } from "services/perfil.service";
import { toastError } from "components/Toast/dialogs";
import "./style.scss";

export const EsqueciMinhaSenha = () => {
  const [renderRecuperacaoOK, setRenderRecuperacaoOK] = useState(false);
  const [emailRecuperacao, setEmailRecuperacao] = useState(null);

  const history = useHistory();

  const onSubmit = (values) => {
    recuperaSenha(values.email).then((resp) => {
      if (resp.status === HTTP_STATUS.OK) {
        setEmailRecuperacao(resp.data.email);
        setRenderRecuperacaoOK(true);
      } else {
        toastError("Erro ao tentar recuperar senha.");
      }
    });
  };

  return (
    <div>
      <div className="login-bg" />
      <div className="right-half">
        <div className="container my-auto">
          <div className="logo-sigpae">
            Login - Fornecedor de Materiais Escolares
          </div>
          {!renderRecuperacaoOK && (
            <div className="form">
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
                    <h3 className="mt-3 font-weight-bold text-center">
                      Recuperação de Senha
                    </h3>
                    <p className="texto-simples mt-4">
                      Digite abaixo seu e-mail para que você possa recuperar sua
                      senha.
                    </p>
                    <Field
                      component={InputText}
                      esconderAsterisco
                      label="E-mail"
                      name="email"
                      placeholder={"Seu e-mail"}
                      required
                      type="text"
                      validate={required}
                    />
                    <Botao
                      className="mt-3 col-12"
                      style={BUTTON_STYLE.BLUE}
                      texto="Enviar"
                      type={BUTTON_TYPE.SUBMIT}
                    />
                  </form>
                )}
              />
            </div>
          )}
          {renderRecuperacaoOK && (
            <div>
              E-mail com recuperação de senha enviado com sucesso para:{" "}
              {emailRecuperacao}
              <div className="pt-3 text-center">
                <Botao
                  texto="voltar para o login"
                  style={BUTTON_STYLE.BLUE}
                  type={BUTTON_TYPE.BUTTON}
                  onClick={() => history.push("/login")}
                />
              </div>
            </div>
          )}
          <div className="logo-prefeitura">
            <img src={logoSME} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
