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
