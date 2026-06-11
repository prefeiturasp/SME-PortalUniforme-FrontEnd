import React from "react";
import { mount } from "enzyme";

import LojaFisica from "./LojaFisica";

describe("CadastroEmpresa/LojaFisica", () => {
  it("renderiza campos basicos", () => {
    const wrapper = mount(
      <LojaFisica
        bairro="Centro"
        cep="01000-000"
        chave={0}
        cidade="São Paulo"
        complemento=""
        endereco="Rua A"
        nome_fantasia="Loja Teste"
        numero="10"
        onUpdate={jest.fn()}
        site=""
        telefone="11999999999"
        uf="SP"
      />
    );

    expect(wrapper.text()).toContain("Nome Fantasia");
    expect(wrapper.text()).toContain("CEP");
    expect(wrapper.text()).toContain("Endereço");
  });
});
