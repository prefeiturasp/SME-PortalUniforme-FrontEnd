import { maiorQueLimite } from "./Cadastro/components/TabelaPrecos/helpers";

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

export const formataPayloadLojasPrecos = (values, tiposDeUniforme) => {
  let ofertas_de_uniformes = [];
  tiposDeUniforme.forEach((tipoDeUniforme) => {
    tipoDeUniforme.uniformes.forEach((uniforme) => {
      if (values[uniforme.nome]) {
        ofertas_de_uniformes.push({
          nome: uniforme.nome,
          valor: parseFloat(values[uniforme.nome].replace(",", ".")),
        });
      }
    });
  });
  values.ofertas_de_uniformes = ofertas_de_uniformes;
  return values;
};

export const validaTabelaPrecos = (values, tiposDeUniforme, limites) => {
  let erro = false;
  if (
    tiposDeUniforme.filter((tipoDeUniforme) => values[tipoDeUniforme.id])
      .length === 0
  ) {
    erro = "É necessário fornecer ao menos um grupo de uniformes escolares";
    return erro;
  }
  tiposDeUniforme.forEach((tipoDeUniforme) => {
    if (maiorQueLimite(tipoDeUniforme, values, limites)) {
      erro = `O valor máximo para os itens em ${
        tipoDeUniforme.nome
      } é R$ ${maiorQueLimite(tipoDeUniforme, values, limites)}`;
      return erro;
    }
  });
  return erro;
};