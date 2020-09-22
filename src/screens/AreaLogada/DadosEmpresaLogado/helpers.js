const addCidadeEstadoSP = (empresa) => {
  empresa.lojas.map((loja) => {
    loja.cidade = "São Paulo";
    loja.uf = "SP";
    return loja;
  });
  return empresa;
};

export const formataEmpresa = (empresa) => {
  empresa = addCidadeEstadoSP(empresa);
  return empresa;
};
