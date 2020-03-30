export const lojaForneceMalharia = loja => {
  return (
    loja.proponente.ofertas_de_uniformes.find(
      oferta => oferta.uniforme_categoria === "MALHARIA"
    ) !== undefined
  );
};

export const lojaForneceCalcado = loja => {
  return (
    loja.proponente.ofertas_de_uniformes.find(
      oferta => oferta.uniforme_categoria === "CALCADO"
    ) !== undefined
  );
};

export const acrescentaTotalUniformes = (lojas, uniformesSelecionados) => {
  let total = 0.0;
  let lojas_ = [];
  lojas.forEach(loja => {
    total = 0.0;
    loja.proponente.ofertas_de_uniformes
      .filter(uniforme =>
        uniformesSelecionados.includes(uniforme.item.split(" ")[0])
      )
      .forEach(uniforme => {
        total += parseFloat(uniforme.preco);
      });
    loja.total_uniformes = total
      .toFixed(2)
      .toString()
      .replace(".", ",");
    if (loja.total_uniformes !== "0,00") {
      lojas_.push(loja);
    }
  });
  return lojas_;
};

export const sortByParam = (lista, param) => {
  return lista.sort((a, b) => {
    if (param === "distancia") {
      if (parseFloat(a[param]) < parseFloat(b[param])) return -1;
      else if (parseFloat(a[param]) > parseFloat(b[param])) return 1;
      return 0;
    } else {
      if (a[param].toUpperCase() < b[param].toUpperCase()) return -1;
      else if (a[param].toUpperCase() > b[param].toUpperCase()) return 1;
      return 0;
    }
  });
};
