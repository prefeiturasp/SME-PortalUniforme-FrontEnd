import {
  getBloqueioEnvioDocumentosParaAnalise,
} from "./documentosParaAnalise";

describe("helpers/documentosParaAnalise", () => {
  it("bloqueia envio enquanto houver upload em andamento", () => {
    expect(
      getBloqueioEnvioDocumentosParaAnalise({
        faltamArquivos: false,
        algumUploadEmAndamento: true,
        envioEmAndamento: false,
      })
    ).toBe(
      "Conclua os uploads em andamento para enviar os documentos para análise."
    );
  });

  it("bloqueia envio quando faltam documentos obrigatorios", () => {
    expect(
      getBloqueioEnvioDocumentosParaAnalise({
        faltamArquivos: true,
        algumUploadEmAndamento: false,
        envioEmAndamento: false,
      })
    ).toBe(
      "Anexe todos os documentos obrigatórios para habilitar o envio para análise."
    );
  });

  it("bloqueia envio quando o fluxo exige ao menos um kit", () => {
    expect(
      getBloqueioEnvioDocumentosParaAnalise({
        faltamArquivos: false,
        algumUploadEmAndamento: false,
        envioEmAndamento: false,
        exigirKit: true,
        quantidadeKits: 0,
      })
    ).toBe(
      "É preciso fornecer ao menos um kit antes de enviar os documentos para análise."
    );
  });

  it("permite envio quando nao ha bloqueios", () => {
    expect(
      getBloqueioEnvioDocumentosParaAnalise({
        faltamArquivos: false,
        algumUploadEmAndamento: false,
        envioEmAndamento: false,
      })
    ).toBeNull();
  });
});