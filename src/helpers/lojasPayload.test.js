import { montarPayloadAtualizaLojas } from "./lojasPayload";

describe("helpers/lojasPayload", () => {
  it("monta payload de atualizacao com comprovante apenas para a loja alterada", () => {
    const payload = montarPayloadAtualizaLojas(
      {
        uuid: "proponente-1",
        cnpj: "12.ABC.345/01DE-35",
        razao_social: "Empresa Teste",
        end_logradouro: "Rua Teste",
        end_cidade: "São Paulo",
        end_uf: "SP",
        end_cep: "01000-000",
        telefone: "(11) 99999-9999",
        email: "teste@example.com",
        responsavel: "Responsavel Teste",
        ofertas_de_uniformes: [
          {
            nome: "Uniforme Padrão",
            preco: "1.01",
          },
        ],
        lojas: [
          {
            uuid: "loja-1",
            nome_fantasia: "Loja 1",
            cep: "01000-000",
            endereco: "Rua A",
            bairro: "Centro",
            numero: "10",
            complemento: "",
            telefone: "(11) 99999-9999",
            site: "",
          },
          {
            uuid: "loja-2",
            nome_fantasia: "Loja 2",
            cep: "02000-000",
            endereco: "Rua B",
            bairro: "Bairro",
            numero: "20",
            complemento: "Sala 1",
            telefone: "(11) 98888-7777",
            site: "site.test",
          },
        ],
      },
      "loja-2",
      "comprovante_endereco",
      "data:application/pdf/pdf;base64,ABC"
    );

    expect(payload.ofertas_de_uniformes).toEqual([
      {
        nome: "Uniforme Padrão",
        valor: 1.01,
      },
    ]);
    expect(payload.lojas[0].comprovante_endereco).toBeNull();
    expect(payload.lojas[1].comprovante_endereco).toBe(
      "data:application/pdf/pdf;base64,ABC"
    );
    expect(payload.lojas[1].cidade).toBe("São Paulo");
    expect(payload.lojas[1].uf).toBe("SP");
  });
});