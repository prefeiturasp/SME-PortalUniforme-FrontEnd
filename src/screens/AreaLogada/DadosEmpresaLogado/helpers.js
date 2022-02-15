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
  let categorias = [];
  empresa.ofertas_de_uniformes.forEach((oferta) => {
    if (!categorias.includes(oferta.uniforme_categoria)) {
      categorias.push(oferta.uniforme_categoria);
    }
  });
  categorias.forEach((categoria) => {
    empresa[categoria] = true;
  });
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

  // Formata comprovante de endereços de cada loja
  values.lojas.forEach(loja =>{

    if(loja.comprovante_endereco[0])
      loja.comprovante_endereco = loja.comprovante_endereco[0].arquivo
    else
      delete loja.comprovante_endereco
    
  })
  return values;
};

export const validaTabelaPrecos = (values, tiposDeUniforme, limites) => {
  let erro = false;
  let erros = []
  tiposDeUniforme
    .filter((tipo) => tipo.uniformes.length > 0)
    .forEach((tipoDeUniforme) => {
      if (maiorQueLimite(tipoDeUniforme, values, limites)) {
        erros.push(tipoDeUniforme)
      }
    });
  if (erros.length > 0) {
    if (erros.length > 1) {
      erro = 'O valor máximo para as categorias excede o limite.'
      return erro;
    } else {
      erro = `O valor máximo para os itens em ${
        erros[0].nome
      } é R$ ${maiorQueLimite(erros[0], values, limites)}`;
      return erro;
    }
  }

  return erro;
};
