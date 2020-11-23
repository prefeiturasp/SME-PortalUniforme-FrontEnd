import { validate } from "cnpj";
import { between } from "./helpers";

export const required = (value) =>
  value !== undefined ? undefined : "Campo obrigatório";

const undefinedFuncition = (value) => undefined;

export const valide = (obrigatorio) => {
  if (obrigatorio) {
    return required;
  } else {
    return undefinedFuncition;
  }
};

export const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Email inválido"
    : undefined;

export const prefeituraEmail = (value) =>
  value && /.+@\prefeitura.sp.gov.br/.test(value)
    ? undefined
    : "Somente emails da prefeitura de São Paulo";

export const alphaNumeric = (value) =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

export const numericInteger = (value) =>
  value && /[^0-9 ]/i.test(value) ? "Somente números" : undefined;

export const phoneNumber = (value) =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? "Invalid phone number, must be 10 digits"
    : undefined;

export const validaUF = (value) => {
  let UF = [
    "AC",
    "AL",
    "AP",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MG",
    "MS",
    "MT",
    "PA",
    "PB",
    "PE",
    "PI",
    "PR",
    "RJ",
    "RN",
    "RO",
    "RR",
    "RS",
    "SC",
    "SE",
    "SP",
    "TO",
  ];
  return UF.find((UF) => UF === value)
    ? undefined
    : "UF Inválido. Necessário letras maiúsculas.";
};

export const validaCNPJ = (value) =>
  validate(value) ? undefined : "Necessário um CNPJ Valido!";

export const validaTelefone = (value) => {
  let numero = value
    .replace("-", "")
    .replace("(", "")
    .replace(")", "")
    .replace(" ", "")
    .replace(/_/g, "");
  return numero.length >= 10 ? undefined : "Necessário um telefone válido!";
};

export const validaCEP = (value) => {
  let numero = value.replace("-", "").replace(/_/g, "");
  return numero.length === 8 ? undefined : "Necessário CEP válido!";
};

export const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const validaRangeCEP = (value) => {
  let numero = value.replace("-", "").replace(/_/g, "");
  return between(numero, 1000000, 5999999) || between(numero, 8000000, 8499999)
    ? undefined
    : "Necessário CEP da cidade de São Paulo!";
};

export const validaTelefoneOuCelular = (value) =>
  // value && /[^0-9 ]/i.test(value) ? "Somente números" : undefined;
  value && !/^(\([0-9]{2}\))\s([9]{1})?([0-9]{4})-([0-9]{4})$/g.test(value)
    ? "Telefone/celular inválido"
    : undefined;

export const validaTelefoneOuCelularLength = (value) =>
  // value && /[^0-9 ]/i.test(value) ? "Somente números" : undefined;
  value && !/^(\([0-9]{2}\))\s([0-9]{1})?([0-9]{4})-([0-9]{4,5})$/g.test(value)
    ? "Telefone/celular inválido"
    : undefined;

export const somenteAlfanumericos = (value) =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Somente caracteres alfanuméricos"
    : undefined;

export const somenteCaracteresEEspacos = (value) =>
  value && !/^[a-zA-Z çÇ]+$/i.test(value)
    ? `Somente caracteres sem acento, cedilha e espaços`
    : undefined;

export const validaEmail = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Email inválido"
    : undefined;

export const somenteNumeros = (value) =>
  value && /[^0-9.,]/i.test(value) ? "Somente números decimais" : undefined;

export const somenteValoresPositivos = (value) =>
  value && parseFloat(value.replace(",", ".")) <= 0
    ? "Somente valores positivos e maiores que 0"
    : undefined;
