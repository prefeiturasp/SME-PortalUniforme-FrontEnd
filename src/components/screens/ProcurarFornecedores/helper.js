export const formatarParaMultiselect = lista => {
  return lista.map(element => {
    return {
      value: element.nome.split(" ")[0],
      label: element.nome.split(" ")[0]
    };
  });
};
