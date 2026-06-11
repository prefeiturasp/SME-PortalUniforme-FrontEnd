import React from "react";
import { mount } from "enzyme";

import LojaFisica from "./LojaFisica";

describe("CadastroEmpresa/LojaFisica", () => {
  it("renderiza o campo de comprovante de endereco", () => {
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

    expect(wrapper.text()).toContain(
      "Comprovante de endereço do ponto de venda"
    );
  });

  it("exibe link do comprovante quando props.comprovante_endereco eh URL", () => {
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
        comprovante_endereco="https://example.com/comprovante.pdf"
      />
    );

    expect(wrapper.text()).toContain("Visualizar arquivo");
    expect(wrapper.find("a[href='https://example.com/comprovante.pdf']")).toHaveLength(1);
  });
});