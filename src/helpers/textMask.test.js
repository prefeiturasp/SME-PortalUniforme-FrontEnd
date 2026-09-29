import { fieldCPF_CNPJ, fieldCNPJ } from "helpers/textMask";

describe("test fieldCPF_CNPJ", () => {
  it("fieldCPF_CNPJ Format CPF", () => {
    expect(fieldCPF_CNPJ("12345678912")).toBe("123.456.789-12");
  });

  it("fieldCPF_CNPJ Format CNPJ", () => {
    expect(fieldCPF_CNPJ("58578683000149")).toBe("58.578.683/0001-49");
  });

  it("fieldCNPJ formata CNPJ alfanumerico em maiusculo", () => {
    expect(fieldCNPJ("12abc34501de35")).toBe("12.ABC.345/01DE-35");
  });

  it("fieldCPF_CNPJ mantem compatibilidade com CNPJ alfanumerico", () => {
    expect(fieldCPF_CNPJ("ab123cd456ef80")).toBe("AB.123.CD4/56EF-80");
  });
});
