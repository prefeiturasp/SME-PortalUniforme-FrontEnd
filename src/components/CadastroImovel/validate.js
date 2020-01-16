import { validarCNPJ, validarCPF, hasNumber } from "helpers/utils";

export const validarForm = values => {
  let erro = null;
  if (
    !validarCNPJ(values.contato.cpf_cnpj) &&
    !validarCPF(values.contato.cpf_cnpj)
  ) {
    erro = "CPF ou CNPJ do Proprietário inválido";
  } else if (values.proponente && !hasNumber(values.proponente.telefone)) {
    delete values.proponente.telefone;
  }
  return erro;
};
