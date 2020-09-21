const STATUS_DICT = {
  INSCRITO: "Inscrição finalizada, em processo de credenciamento",
  CREDENCIADO: "Credenciado",
  EM_PROCESSO: "Em processo de inscrição, finalize o seu cadastro",
  PENDENTE: "Pendente credenciamento",
  ALTERADO: "Pendente validação de alteração",
};

export const getStatus = (status) => {
  return STATUS_DICT[status] || status;
};

export const getCNPJ = () => {
    return localStorage.getItem("cnpj");
  };
  
  export const getRazaoSocial = () => {
    return localStorage.getItem("razao_social");
  };
  