import React from "react";
import { mount } from "enzyme";
import { Form } from "react-final-form";

import { Loja } from "./index";

jest.mock("helpers/fieldValidators", () => ({
  composeValidators: jest.fn(() => undefined),
  required: jest.fn(() => undefined),
  validaCEP: jest.fn(() => undefined),
  validaRangeCEP: jest.fn(() => undefined),
  validaTelefoneOuCelular: jest.fn(() => undefined),
  validaTelefoneOuCelularLength: jest.fn(() => undefined),
}));

describe("DadosEmpresaLogado/Cadastro/components/DadosLoja", () => {
  it("nao renderiza o campo de comprovante de endereco", () => {
    const fields = {
      length: 1,
      remove: jest.fn(),
      update: jest.fn(),
      value: [
        {
          bairro: "Centro",
          cep: "01000-000",
          cidade: "São Paulo",
          complemento: "",
          endereco: "Rua A",
          nome_fantasia: "Loja Teste",
          numero: "10",
          site: "",
          telefone: "11999999999",
          uf: "SP",
        },
      ],
    };

    const wrapper = mount(
      <Form
        initialValues={{ lojas: fields.value }}
        onSubmit={jest.fn()}
        render={() => (
          <Loja
            empresa={{}}
            fields={fields}
            index={0}
            loja="lojas[0]"
            logado={true}
          />
        )}
      />
    );

    expect(wrapper.text()).not.toContain(
      "Comprovante de endereço do ponto de venda"
    );
  });
});