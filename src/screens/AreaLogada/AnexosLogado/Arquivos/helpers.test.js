import { verificarSeFaltamArquivos } from "./helpers";

const tiposDocumentos = [
  { id: 1, nome: "Documento 1", obrigatorio: true },
  { id: 2, nome: "Documento 2", obrigatorio: false }
];

const montarEmpresa = ({
  lojas = [
    {
      uuid: "loja-1",
      foto_fachada: "fachada-1",
      comprovante_endereco: "comp-1"
    }
  ],
  arquivosAnexos = [{ tipo_documento: { id: 1 }, arquivo: "anexo-1" }]
} = {}) => ({
  lojas,
  arquivos_anexos: arquivosAnexos
});

describe("AreaLogada/AnexosLogado/Arquivos/helpers", () => {
  it("nao bloqueia envio quando todos os arquivos obrigatorios estao anexados", () => {
    const empresa = montarEmpresa();

    expect(verificarSeFaltamArquivos(empresa, tiposDocumentos)).toBeFalsy();
  });

  it("bloqueia envio quando alguma loja nao tem foto da fachada", () => {
    const empresa = montarEmpresa({
      lojas: [
        { uuid: "loja-1", foto_fachada: null, comprovante_endereco: "comp-1" }
      ]
    });

    expect(verificarSeFaltamArquivos(empresa, tiposDocumentos)).toBeTruthy();
  });

  it("bloqueia envio quando alguma loja nao tem comprovante de endereco", () => {
    const empresa = montarEmpresa({
      lojas: [
        {
          uuid: "loja-1",
          foto_fachada: "fachada-1",
          comprovante_endereco: null
        }
      ]
    });

    expect(verificarSeFaltamArquivos(empresa, tiposDocumentos)).toBeTruthy();
  });

  it("bloqueia envio quando loja nao tem nem foto nem comprovante", () => {
    const empresa = montarEmpresa({
      lojas: [
        {
          uuid: "loja-1",
          foto_fachada: null,
          comprovante_endereco: null
        }
      ]
    });

    expect(verificarSeFaltamArquivos(empresa, tiposDocumentos)).toBeTruthy();
  });

  it("bloqueia envio quando nao ha nenhum arquivo anexo", () => {
    const empresa = montarEmpresa({ arquivosAnexos: [] });

    expect(verificarSeFaltamArquivos(empresa, tiposDocumentos)).toBeTruthy();
  });

  it("bloqueia envio quando falta documento obrigatorio de um dos tipos", () => {
    const empresa = montarEmpresa({
      arquivosAnexos: [{ tipo_documento: { id: 2 }, arquivo: "anexo-2" }]
    });

    expect(verificarSeFaltamArquivos(empresa, tiposDocumentos)).toBeTruthy();
  });
});
