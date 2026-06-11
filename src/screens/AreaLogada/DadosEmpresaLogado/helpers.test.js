import { formataPayloadLojasPrecos, formataEmpresa } from "./helpers";

describe("AreaLogada/DadosEmpresaLogado/helpers", () => {
  it("serializa comprovante_endereco novo no payload de atualizacao", () => {
    const values = {
      lojas: [
        {
          nome_fantasia: "Loja A",
          comprovante_endereco: [
            {
              arquivo: "data:application/pdf/pdf;base64,ABC123",
            },
          ],
        },
      ],
    };

    const payload = formataPayloadLojasPrecos(values, []);

    expect(payload.lojas[0].comprovante_endereco).toBe(
      "data:application/pdf/pdf;base64,ABC123"
    );
  });

  it("omite comprovante_endereco quando loja so tem URL atual", () => {
    const values = {
      lojas: [
        {
          nome_fantasia: "Loja B",
          comprovante_endereco: "https://example.com/comprovante.pdf",
        },
      ],
    };

    const payload = formataPayloadLojasPrecos(values, []);

    expect(payload.lojas[0].comprovante_endereco).toBeUndefined();
  });

  it("preserva id da loja no payload", () => {
    const values = {
      lojas: [
        {
          id: 42,
          nome_fantasia: "Loja C",
        },
      ],
    };

    const payload = formataPayloadLojasPrecos(values, []);

    expect(payload.lojas[0].id).toBe(42);
  });

  it("formataEmpresa cria kits a partir de ofertas_de_uniformes", () => {
    const empresa = {
      ofertas_de_uniformes: [
        { nome: "Camiseta", preco: "10.00", uniforme_categoria: 1 },
      ],
      lojas: [],
    };

    const result = formataEmpresa(empresa);

    expect(result.kits).toEqual(empresa.ofertas_de_uniformes);
  });

  it("formataEmpresa cria kits vazio quando ofertas_de_uniformes eh vazio", () => {
    const empresa = {
      ofertas_de_uniformes: [],
      lojas: [],
    };

    const result = formataEmpresa(empresa);

    expect(result.kits).toEqual([]);
  });
});