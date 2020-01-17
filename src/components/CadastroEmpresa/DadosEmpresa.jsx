import React, { Fragment } from "react";
import { InputText } from "components/Input/InputText";
import { required } from "helpers/fieldValidators";
import { Field } from "redux-form";
import { fieldCNPJ, fieldCep, fieldTel } from "helpers/textMask";
import { Row, Col } from "react-bootstrap";

const DadosEmpresa = props => {
  return (
    <Fragment>
      <Field
        customChange={fieldCNPJ}
        component={InputText}
        label="CNPJ"
        name="empresa.cnpj"
        required
        validate={required}
        autoFocus
        maxLength="18"
        placeholder="Digite seu CNPJ"
      />
      <Field
        component={InputText}
        label="Razão Social"
        name="empresa.razao_social"
        required
        validate={required}
        placeholder="Digite a Razão Social"
      />
      <Row>
        <Col lg={6} xl={6}>
          <Field
            {...fieldCep}
            component={InputText}
            label="CEP"
            name="empresa.cep"
            required
            validate={required}
          />
        </Col>
        <Col lg={6} xl={6}>
          <Field
            component={InputText}
            label="UF"
            name="empresa.uf"
            required
            validate={required}
            maxLength={3}
            placeholder="UF"
          />
        </Col>
      </Row>
      <Field
        component={InputText}
        label="Endereço"
        name="empresa.endereco"
        required
        validate={required}
        placeholder="Linha única para logradouro, número e complemento"
      />

      <Field
        component={InputText}
        label="Cidade"
        name="empresa.cidade"
        required
        validate={required}
        placeholder="Digite a cidade da empresa"
      />
       <Field
        component={InputText}
        label="Nome Responsável"
        name="responsavel.nome"
        required
        validate={required}
        placeholder="Digite o nome do resposável da empresa"
      />
      <Field
        {...fieldTel}
        component={InputText}
        label="Telefone"
        name="responsavel.telefone"
        required
        validate={required}
        placeholder="Digite o nome do resposável da empresa"
      />
      <Field
        component={InputText}
        label="E-mail"
        name="responsavel.email"
        required
        validate={required}
        placeholder="Digite o e-mail do responsável"
      />
    </Fragment>
  );
};

export default DadosEmpresa;
