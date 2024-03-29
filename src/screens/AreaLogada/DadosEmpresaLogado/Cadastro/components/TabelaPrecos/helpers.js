import { arredondaDuasCasas } from "helpers/helpers";

export const getPrecoVezesQuantidade = (values, uniforme) => {
  if (values[uniforme.nome]) {
    const valor =
      parseFloat(values[uniforme.nome].replace(",", ".")) * uniforme.quantidade;
    return valor
      .toFixed(2)
      .toString()
      .replace(".", ",");
  } else {
    return "0,00";
  }
};

export const getTotal = (tipoDeUniforme, values) => {
  let total = 0;
  tipoDeUniforme.uniformes.forEach((uniforme) => {
    if (values[uniforme.nome]) {
      total +=
        parseFloat(values[uniforme.nome].replace(",", ".")) *
        uniforme.quantidade;
    }
  });
  return total
    .toFixed(2)
    .toString()
    .replace(".", ",");
};

export const maiorQueLimite = (tipoDeUniforme, values, limites) => {
  let total = 0;
  tipoDeUniforme.uniformes.forEach((uniforme) => {
    if (values[uniforme.nome]) {
      total +=
        parseFloat(values[uniforme.nome].replace(",", ".")) *
        uniforme.quantidade;
    }
  });
  total = arredondaDuasCasas(total);
  const limite = limites.find(
    (limite) => limite.categoria_uniforme === tipoDeUniforme.id
  );
  if (!limite) return false;
  const preco_maximo = limite.preco_maximo;
  if (total > parseFloat(preco_maximo)) {
    return preco_maximo.replace(".", ",");
  } else return false;
};


export const limparValues = (form, tipoDeUniforme, values) => {
  if (tipoDeUniforme) {
    tipoDeUniforme.uniformes.forEach((uniforme) => {
      if (values[uniforme.nome]) {
        delete values[uniforme.nome];
        form.resetFieldState(uniforme.nome);
        
      }
    });
  }
};
