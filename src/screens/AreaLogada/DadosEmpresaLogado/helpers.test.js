import { formataPayloadLojasPrecos } from "./helpers";

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
});