import React, { Component } from "react";
import { Field } from "redux-form";
import { InputText } from "components/Input/InputText";
import { fieldTel, fieldCPF_CNPJ } from "helpers/textMask";
import { required, email } from "helpers/fieldValidators";

export class Proprietario extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Proprietário do Imóvel</h4>
          <Field
            component={InputText}
            label="Nome"
            name="contato.nome"
            required
            validate={required}
            autoFocus
          />
          <Field
            customChange={fieldCPF_CNPJ}
            component={InputText}
            label="CPF/CNPJ"
            name="contato.cpf_cnpj"
            required
            validate={required}
            maxLength="18"
          />
          <Field
            component={InputText}
            label="E-mail"
            name="contato.email"
            required
            validate={required && email}
          />
          <Field
            {...fieldTel}
            component={InputText}
            label="Telefone"
            name="contato.telefone"
            required
            validate={required}
          />
        </div>
      </div>
    );
  }
}
