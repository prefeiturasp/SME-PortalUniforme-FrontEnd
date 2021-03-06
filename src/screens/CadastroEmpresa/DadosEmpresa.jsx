import React, { Fragment } from "react";
import { InputText } from "components/Input/InputText";
import {
  required,
  validaUF,
  validaCNPJ,
  validaTelefone,
  validaCEP,
} from "helpers/fieldValidators";
import { Field } from "redux-form";
import { fieldCNPJ, fieldCep, fieldCel } from "helpers/textMask";
import { Row, Col } from "react-bootstrap";

const DadosEmpresa = (props) => {
  return (
    <Fragment>
      <Field
        customChange={fieldCNPJ}
        component={InputText}
        label="CNPJ"
        name="cnpj"
        disabled={props.empresa}
        required
        validate={[required, validaCNPJ]}
        autoFocus
        maxLength="18"
        placeholder="Digite seu CNPJ"
      />
      <Field
        component={InputText}
        disabled={props.empresa}
        label="Razão Social"
        name="razao_social"
        required
        validate={required}
        placeholder="Digite a Razão Social"
      />
      <Row>
        <Col lg={6} xl={6}>
          <Field
            {...fieldCep}
            disabled={props.empresa}
            component={InputText}
            label="CEP"
            name="end_cep"
            required
            validate={[required, validaCEP]}
            placeholder="Digite o CEP"
          />
        </Col>
        <Col lg={6} xl={6}>
          <Field
            component={InputText}
            disabled={props.empresa}
            label="UF"
            name="end_uf"
            required
            validate={[required, validaUF]}
            maxLength={2}
            placeholder="UF"
          />
        </Col>
      </Row>
      <Field
        component={InputText}
        disabled={props.empresa}
        label="Endereço"
        name="end_logradouro"
        required
        validate={required}
        placeholder="Linha única para logradouro, número e complemento"
      />

      <Field
        component={InputText}
        disabled={props.empresa}
        label="Cidade"
        name="end_cidade"
        required
        validate={required}
        placeholder="Digite a cidade da empresa"
      />
      <Field
        component={InputText}
        disabled={props.empresa}
        label="Nome do responsável"
        name="responsavel"
        required
        validate={required}
        placeholder="Digite o nome do responsável da empresa"
      />
      <Field
        {...fieldCel}
        component={InputText}
        disabled={props.empresa}
        label="Telefone"
        name="telefone"
        required
        validate={[required, validaTelefone]}
        placeholder="Digite o nome do resposável da empresa"
      />
      <Field
        component={InputText}
        disabled={props.empresa}
        label="E-mail"
        name="email"
        type="email"
        required
        validate={required}
        placeholder="Digite o e-mail do responsável"
      />
    </Fragment>
  );
};

export default DadosEmpresa;
