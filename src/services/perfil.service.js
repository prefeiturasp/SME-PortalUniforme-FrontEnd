import endPonts from "../constants/endPonts.constants";
import { getToken } from "./auth.service";

export const atualizarSenha = (uuid, confirmationKey, payLoad) => {
  const url = `${endPonts.API_URL}/usuarios/atualizar-senha/${uuid}/${confirmationKey}/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(payLoad),
    headers: { "Content-Type": "application/json" },
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

export const atualizarSenhaLogado = (uuid, payLoad) => {
  const url = `${endPonts.API_URL}/usuarios/${uuid}/atualizar-senha-logado/`;
  let status = 0;
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(payLoad),
    headers: {
      Authorization: `JWT ${getToken()}`,
      "Content-Type": "application/json",
    },
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

export const recuperaSenha = (email) => {
  const url = `${endPonts.API_URL}/usuarios/recuperar-senha/${email}/`;
  let status = 0;
  return fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      status = res.status;
      return res.json();
    })
    .then((data) => {
      return { data: data, status: status };
    })
    .catch((error) => {
      return console.log(error);
    });
};
