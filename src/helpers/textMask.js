import { createTextMask, createNumberMask } from "redux-form-input-masks";
import { compactarCNPJ, formatarCNPJ } from "./utils";

const formatarCPF = value => {
  const valorNumerico = String(value || "")
    .replace(/\D/g, "")
    .slice(0, 11);

  if (valorNumerico.length <= 3) {
    return valorNumerico;
  }

  if (valorNumerico.length <= 6) {
    return `${valorNumerico.slice(0, 3)}.${valorNumerico.slice(3)}`;
  }

  if (valorNumerico.length <= 9) {
    return `${valorNumerico.slice(0, 3)}.${valorNumerico.slice(
      3,
      6
    )}.${valorNumerico.slice(6)}`;
  }

  return `${valorNumerico.slice(0, 3)}.${valorNumerico.slice(
    3,
    6
  )}.${valorNumerico.slice(6, 9)}-${valorNumerico.slice(9)}`;
};

export const fieldCPF_CNPJ = value => {
  const valorCompactado = compactarCNPJ(value);

  if (!/[A-Z]/.test(valorCompactado) && valorCompactado.length <= 11) {
    return formatarCPF(value);
  }

  return formatarCNPJ(value);
};

export const fieldCNPJ = value => {
    return formatarCNPJ(value);
};

export const fieldMoney = createNumberMask({
  prefix: 'R$ ',
  suffix: ' .',
  decimalPlaces: 2,
  locale: 'pt-BR',
})

export const fieldCep = createTextMask({
  pattern: "99999-999",
  allowEmpty: false,
  guide: true,
  stripMask: false
});

export const fieldTel = createTextMask({
  pattern: "(99) 9999-9999",
  allowEmpty: false,
  guide: true,
  stripMask: false
});

export const fieldCel = createTextMask({
  pattern: "(99) 99999-9999",
  allowEmpty: false,
  guide: true,
  stripMask: false
});
