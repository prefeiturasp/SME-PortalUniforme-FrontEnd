const normalizarValorOferta = (preco) =>
  parseFloat(String(preco || 0).replace(",", "."));

export const montarPayloadAtualizaLojas = (
  empresa,
  lojaUuid,
  campoArquivo,
  valorArquivo
) => ({
  uuid: empresa.uuid,
  cnpj: empresa.cnpj,
  razao_social: empresa.razao_social,
  end_logradouro: empresa.end_logradouro,
  end_cidade: empresa.end_cidade,
  end_uf: empresa.end_uf,
  end_cep: empresa.end_cep,
  telefone: empresa.telefone,
  email: empresa.email,
  responsavel: empresa.responsavel,
  ofertas_de_uniformes: (empresa.ofertas_de_uniformes || []).map((oferta) => ({
    nome: oferta.nome,
    valor: normalizarValorOferta(oferta.preco),
  })),
  lojas: (empresa.lojas || []).map((loja) => {
    const payloadLoja = {
      id: loja.id,
      uuid: loja.uuid,
      nome_fantasia: loja.nome_fantasia,
      cep: loja.cep,
      endereco: loja.endereco,
      bairro: loja.bairro,
      numero: loja.numero,
      complemento: loja.complemento || "",
      cidade: loja.cidade || "São Paulo",
      uf: loja.uf || "SP",
      telefone: loja.telefone,
      site: loja.site || "",
    };

    if (loja.uuid === lojaUuid) {
      payloadLoja[campoArquivo] = valorArquivo;
    }

    return payloadLoja;
  }),
});