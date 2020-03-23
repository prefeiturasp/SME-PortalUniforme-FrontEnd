export const formatarParaMultiselect = lista => {
    return lista.map(element => {
      return { value: element.id, label: element.nome.split(" ")[0] };
    });
  };
  