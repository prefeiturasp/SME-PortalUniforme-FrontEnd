import endPont from "../constants/endPonts.constants";

export const cadastroFornecedorStep1 = async (payload) => {
  const url = `${endPont.API_URL}/proponentes/`;
  let status = 0;
  return fetch(url, {
    headers: {
      "Accept-Language": "pt-br",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error;
    });
};

export const getProponente = async (uuid) => {
  const url = `${endPont.API_URL}/proponentes/${uuid}/`;
  let status = 0;
  return fetch(url, {
    headers: {
      "Accept-Language": "pt-br",
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error;
    });
};

export const concluirCadastro = async (uuid) => {
  const url = `${endPont.API_URL}/proponentes/${uuid}/concluir-cadastro/`;
  let status = 0;
  return fetch(url, {
    headers: {
      "Accept-Language": "pt-br",
      "Content-Type": "application/json",
    },
    method: "PATCH",
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error;
    });
};

export const atualizaLojas = async (uuid, payload) => {
  const url = `${endPont.API_URL}/proponentes/${uuid}/atualiza-lojas/`;
  let status = 0;
  return fetch(url, {
    headers: {
      "Accept-Language": "pt-br",
      "Content-Type": "application/json",
    },
    method: "PATCH",
    body: JSON.stringify(payload),
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return error;
    });
};
