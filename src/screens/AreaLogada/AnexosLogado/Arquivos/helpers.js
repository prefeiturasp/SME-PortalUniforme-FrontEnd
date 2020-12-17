export const verificarSeFaltamArquivos = (empresa, tiposDocumentos) => {
  let aindaFaltaDocumentoObrigatorio = false;
  tiposDocumentos.forEach((tipoDocumento) => {
    if (
      tipoDocumento.obrigatorio &&
      !empresa.arquivos_anexos.find(
        (arquivo) => arquivo.tipo_documento.id === tipoDocumento.id
      )
    )
      aindaFaltaDocumentoObrigatorio = true;
  });
  let aindaFaltamArquivos =
    empresa.lojas.find((loja) => loja.foto_fachada === null) ||
    empresa.arquivos_anexos.length === 0 ||
    aindaFaltaDocumentoObrigatorio;
  return aindaFaltamArquivos;
};
