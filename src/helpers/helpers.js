import React from "react";

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

export const getKey = (obj) => {
  return Object.keys(obj)[0];
};

export const getError = (obj) => {
  let result = "Erro";
  if (!obj[getKey(obj)]) {
    return "Erro";
  } else if (
    (obj[getKey(obj)][0] !== undefined &&
      typeof obj[getKey(obj)][0] !== "string") ||
    typeof obj[getKey(obj)] !== "string"
  ) {
    result = getError(obj[getKey(obj)]);
  } else {
    if (typeof obj[getKey(obj)] === "string") return obj[getKey(obj)];
    else return obj[getKey(obj)][0];
  }
  return result;
};

export const between = (x, min, max) => {
  return x >= min && x <= max;
};

export const htmlTextToDiv = (tipo) => {
  return <div dangerouslySetInnerHTML={{ __html: tipo.nome }} />;
};

export const arredondaDuasCasas = numero => Math.round(numero * 1e2) / 1e2;
