export const ARQUIVO_SALVO_COM_SUCESSO = "Arquivo salvo com sucesso";

export const BOTAO_ENVIAR_DOCUMENTOS_PARA_ANALISE =
  "Enviar documentos para análise";

export const BOTAO_ENVIANDO_DOCUMENTOS_PARA_ANALISE =
  "Enviando documentos para análise...";

export const getBloqueioEnvioDocumentosParaAnalise = ({
  faltamArquivos,
  algumUploadEmAndamento,
  envioEmAndamento,
  exigirKit = false,
  quantidadeKits = 0,
}) => {
  if (envioEmAndamento) {
    return "Envio dos documentos para análise em andamento. Aguarde...";
  }

  if (algumUploadEmAndamento) {
    return "Conclua os uploads em andamento para enviar os documentos para análise.";
  }

  if (exigirKit && quantidadeKits < 1) {
    return "É preciso fornecer ao menos um kit antes de enviar os documentos para análise.";
  }

  if (faltamArquivos) {
    return "Anexe todos os documentos obrigatórios para habilitar o envio para análise.";
  }

  return null;
};