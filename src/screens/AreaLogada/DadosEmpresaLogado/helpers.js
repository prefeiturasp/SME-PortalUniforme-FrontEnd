const addCidadeEstadoSP = (empresa) => {
  empresa.lojas.map((loja) => {
    loja.cidade = "São Paulo";
    loja.uf = "SP";
    return loja;
  });
  return empresa;
};

const formataPrecos = (empresa) => {
  empresa["MALHARIA"] =
    empresa.ofertas_de_uniformes.find(
      (oferta) => oferta.uniforme_categoria === "MALHARIA"
    ) !== undefined;
  empresa["CALCADO"] =
    empresa.ofertas_de_uniformes.find(
      (oferta) => oferta.uniforme_categoria === "CALCADO"
    ) !== undefined;
  empresa.ofertas_de_uniformes.forEach((oferta) => {
    empresa[oferta.nome] = oferta.preco.replace(".", ",");
  });
  return empresa;
};

export const formataEmpresa = (empresa) => {
  empresa = addCidadeEstadoSP(empresa);
  empresa = formataPrecos(empresa);
  return empresa;
};
