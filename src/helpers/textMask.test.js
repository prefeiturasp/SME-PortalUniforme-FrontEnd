import { fieldCPF_CNPJ } from "helpers/textMask";

describe("test fieldCPF_CNPJ", () => {
  it("fieldCPF_CNPJ Format CPF", () => {
    expect(fieldCPF_CNPJ("12345678912")).toBe("123.456.789-12");
  });

  it("fieldCPF_CNPJ Format CNPJ", () => {
    expect(fieldCPF_CNPJ("58578683000149")).toBe("58.578.683/0001-49");
  });
});
