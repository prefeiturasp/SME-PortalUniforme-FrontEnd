import {
  DOCUMENTO_ACCEPT_CUSTOM,
  FACHADA_ACCEPT_CUSTOM,
  isAcceptedFile,
} from "./fileUpload";

describe("helpers/fileUpload", () => {
  it("aceita pdf para anexos gerais", () => {
    const file = new File(["dummy content"], "documento.pdf", {
      type: "application/pdf",
    });

    expect(isAcceptedFile(file, DOCUMENTO_ACCEPT_CUSTOM)).toBe(true);
  });

  it("rejeita imagem para anexos gerais", () => {
    const file = new File(["dummy content"], "documento.png", {
      type: "image/png",
    });

    expect(isAcceptedFile(file, DOCUMENTO_ACCEPT_CUSTOM)).toBe(false);
  });

  it("aceita jpg para fachada", () => {
    const file = new File(["dummy content"], "fachada.jpg", {
      type: "image/jpeg",
    });

    expect(isAcceptedFile(file, FACHADA_ACCEPT_CUSTOM)).toBe(true);
  });

  it("rejeita pdf para fachada", () => {
    const file = new File(["dummy content"], "fachada.pdf", {
      type: "application/pdf",
    });

    expect(isAcceptedFile(file, FACHADA_ACCEPT_CUSTOM)).toBe(false);
  });
});