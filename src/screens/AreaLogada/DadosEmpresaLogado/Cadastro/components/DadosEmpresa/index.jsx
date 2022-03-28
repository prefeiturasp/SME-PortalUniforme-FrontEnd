import React, { useState } from "react";
import HTTP_STATUS from "http-status-codes";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { InputText } from "components/Input/InputText";
import formatString from "format-string-by-pattern";
import {
  composeValidators,
  required,
  validaCEP,
  validaTelefoneOuCelular,
  validaEmail,
  somenteAlfanumericos,
  validaCNPJ,
} from "helpers/fieldValidators";
import { toastError } from "components/Toast/dialogs";
import { getEnderecoPorCEP } from "services/cep.service";
import { ESTADOS } from "../../constants";
import Select from "components/Select";

export const DadosEmpresa = ({ empresa, form, values }) => {
  const [
    APIForaDoArOuCEPNaoEncontrado,
    setAPIForaDoArOuCEPNaoEncontrado,
  ] = useState(false);

  return (
    <div>
      <h2>Dados da Empresa</h2>
      <div className="row">
        <div className="col-sm-6 col-12">
          <Field
            component={InputText}
            parse={formatString("99.999.999/9999-99")}
            label="CNPJ"
            name="cnpj"
            required
            validate={composeValidators(required, validaCNPJ)}
            placeholder="Digite o CNPJ da Empresa"
            disabled={empresa}
          />
        </div>
        <div className="col-sm-6 col-12">
          <Field
            component={InputText}
            label="Razão Social"
            name="razao_social"
            maxlength={255}
            required
            validate={composeValidators(required)}
            placeholder="Digite a Razão Social da Empresa"
            disabled={empresa}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Field
            component={InputText}
            parse={formatString("12345-678")}
            label="CEP"
            name="end_cep"
            required
            validate={composeValidators(required, validaCEP)}
            placeholder="Digite o CEP"
            disabled={empresa}
          />
          <OnChange name="end_cep">
            {async (value, previous) => {
              if (value.length === 9 && !empresa) {
                const response = await getEnderecoPorCEP(value);
                if (response.status === HTTP_STATUS.OK) {
                  if (response.data.resultado === "0") {
                    toastError("CEP não encontrado");
                    setAPIForaDoArOuCEPNaoEncontrado(true);
                    form.change("end_logradouro", "");
                    form.change("end_uf", "");
                    form.change("end_cidade", "");
                    form.change("end_bairro", "");
                  } else {
                    setAPIForaDoArOuCEPNaoEncontrado(false);
                    form.change(
                      "end_logradouro",
                      response.data.tipo_logradouro +
                        " " +
                        response.data.logradouro
                    );
                    form.change("end_uf", response.data.uf);
                    form.change("end_cidade", response.data.cidade);
                    form.change("end_bairro", response.data.bairro);
                  }
                } else {
                  setAPIForaDoArOuCEPNaoEncontrado(true);
                }
              }
            }}
          </OnChange>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Field
            component={InputText}
            label="Endereço"
            name="end_logradouro"
            maxlength={100}
            required
            validate={required}
            disabled={empresa || !APIForaDoArOuCEPNaoEncontrado}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-10 col-12">
          <Field
            component={InputText}
            maxlength={100}
            label="Cidade"
            name="end_cidade"
            required
            validate={required}
            disabled={empresa || !APIForaDoArOuCEPNaoEncontrado}
          />
        </div>
        <div className="col-sm-2 col-12">
          <Field
            component={Select}
            name="end_uf"
            label="UF"
            options={ESTADOS}
            required
            validate={required}
            naoDesabilitarPrimeiraOpcao
            disabled={empresa || !APIForaDoArOuCEPNaoEncontrado}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Field
            label="Nome completo"
            name="responsavel"
            component={InputText}
            maxlength={255}
            type="text"
            placeholder="Nome completo"
            required
            validate={required}
            disabled={empresa}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 col-12">
          <Field
            component={InputText}
            placeholder={"Telefone"}
            label="Telefone"
            parse={
              values.telefone && values.telefone.length + 1 <= 14
                ? formatString("(99) 9999-9999")
                : formatString("(99) 99999-9999")
            }
            name="telefone"
            required
            type="text"
            disabled={empresa}
          />
        </div>
        <div className="col-sm-6 col-12">
          <Field
            component={InputText}
            placeholder={"E-mail"}
            label="E-mail"
            name="email"
            maxlength={255}
            type="text"
            validate={composeValidators(required, validaEmail)}
            required
            disabled={empresa}
          />
        </div>
      </div>
    </div>
  );
};
