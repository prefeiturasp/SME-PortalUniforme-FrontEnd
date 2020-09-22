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
