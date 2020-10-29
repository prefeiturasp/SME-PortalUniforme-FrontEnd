export const getBadges = (loja) => {
  let badges = [];
  loja.proponente.ofertas_de_uniformes.forEach((oferta) => {
    if (!badges.includes(oferta.uniforme_categoria_display)) {
      badges.push(oferta.uniforme_categoria_display);
    }
  });
  return badges.sort().reverse();
};

export const acrescentaTotalUniformes = (lojas, uniformesSelecionados) => {
  let total = 0.0;
  let lojas_ = [];
  lojas.forEach((loja) => {
    total = 0.0;
    loja.proponente.ofertas_de_uniformes
      .filter((uniforme) =>
        uniformesSelecionados.includes(uniforme.item.split(" ")[0])
      )
      .forEach((uniforme) => {
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

export const sortByDistance = (lista) => {
  return lista.sort((a, b) => {
    if (parseFloat(a["distancia"]) < parseFloat(b["distancia"])) return -1;
    else if (parseFloat(a["distancia"]) > parseFloat(b["distancia"])) return 1;
    return 0;
  });
};

export const sortByParam = (lista, param) => {
  return sortByDistance(lista)
    .splice(0, 10)
    .sort((a, b) => {
      if (param === "distancia" || param === "total_uniformes") {
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
