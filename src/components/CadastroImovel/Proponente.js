import React, { Component } from "react";

import { Field } from "redux-form";
import { InputText } from "components/Input/InputText";
import { SelectText } from "components/Input/SelectText";
import { fieldCPF_CNPJ, fieldTel } from "helpers/textMask";
import { email } from "helpers/fieldValidators";
import { TIPO_PROPONENTE } from "constants/choices.constants";


export class Proponente extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Proponente</h4>
          <Field
            component={SelectText}
            options={TIPO_PROPONENTE}
            placeholder="Selecione um Tipo"
            label="Tipo"
            name="proponente.tipo"
          />
          <Field component={InputText} label="Nome" name="proponente.nome" />
          <Field
            customChange={fieldCPF_CNPJ}
            component={InputText}
            label="CPF/CNPJ"
            name="proponente.cpf_cnpj"
            maxLength="18"
          />
          <Field
            component={InputText}
            label="E-mail"
            name="proponente.email"
            validate={email}
          />
          <Field
            {...fieldTel}
            component={InputText}
            label="Telefone"
            name="proponente.telefone"
          />
        </div>
      </div>
    );
  }
}
