import { readerFile, validarCNPJ, compactarCNPJ, formatarCNPJ } from "helpers/utils";

describe("test readerFile", () => {
  it("converte file to base64", async () => {
    const file = new File(["dummy content"], "example.png", {
      type: "image/png"
    });

    await readerFile(file).then(v => {
      expect(v.arquivo).toContain("png");
    });
  });
});

describe("test validarCNPJ", () => {
  it("aceita CNPJ numerico legado valido", () => {
    expect(validarCNPJ("58.578.683/0001-49")).toBe(true);
  });

  it("aceita CNPJ alfanumerico valido", () => {
    expect(validarCNPJ("12.ABC.345/01DE-35")).toBe(true);
  });

  it("rejeita CNPJ alfanumerico com DV invalido", () => {
    expect(validarCNPJ("12.ABC.345/01DE-67")).toBe(false);
  });

  it("rejeita CNPJ numerico legado invalido", () => {
    expect(validarCNPJ("58.578.683/0001-40")).toBe(false);
  });
});

describe("test compactarCNPJ", () => {
  it("remove mascara e converte para maiusculo", () => {
    expect(compactarCNPJ("12.ABC.345/01DE-35")).toBe("12ABC34501DE35");
  });
});

describe("test formatarCNPJ", () => {
  it("formata CNPJ numerico com mascara", () => {
    expect(formatarCNPJ("58578683000149")).toBe("58.578.683/0001-49");
  });

  it("formata CNPJ alfanumerico com mascara", () => {
    expect(formatarCNPJ("12abc34501de35")).toBe("12.ABC.345/01DE-35");
  });
});
