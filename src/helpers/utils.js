export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export async function readerFile(file) {
  let result_file = await new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => {
      const re = /(?:\.([^.]+))?$/;
      const base64 = reader.result.split("base64,")[1];
      return resolve({
        arquivo: `data:${file.type}/${re.exec(file.name)[1]};base64,${base64}`
      });
    };
    reader.readAsDataURL(file);
  });
  return result_file;
}

export const getKey = obj => {
  return Object.keys(obj)[0];
};

export const getError = obj => {
  let result = "Erro ao cadastrar Imóvel";
  if (!obj[getKey(obj)]) {
    return "Erro ao cadastrar Imóvel";
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

export const compactarCNPJ = cnpj =>
  String(cnpj || "")
    .toUpperCase()
    .replace(/[^0-9A-Z]/g, "")
    .slice(0, 14);

export const formatarCNPJ = cnpj => {
  const valorCompactado = compactarCNPJ(cnpj);

  if (valorCompactado.length <= 2) {
    return valorCompactado;
  }

  if (valorCompactado.length <= 5) {
    return `${valorCompactado.slice(0, 2)}.${valorCompactado.slice(2)}`;
  }

  if (valorCompactado.length <= 8) {
    return `${valorCompactado.slice(0, 2)}.${valorCompactado.slice(
      2,
      5
    )}.${valorCompactado.slice(5)}`;
  }

  if (valorCompactado.length <= 12) {
    return `${valorCompactado.slice(0, 2)}.${valorCompactado.slice(
      2,
      5
    )}.${valorCompactado.slice(5, 8)}/${valorCompactado.slice(8)}`;
  }

  return `${valorCompactado.slice(0, 2)}.${valorCompactado.slice(
    2,
    5
  )}.${valorCompactado.slice(5, 8)}/${valorCompactado.slice(
    8,
    12
  )}-${valorCompactado.slice(12)}`;
};

export const validarCPF = cpf => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf === "") return false;
  // Elimina CPFs invalidos conhecidos
  if (
    cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  )
    return false;
  // Valida 1o digito
  let add = 0;
  let i, rev;
  for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;
  // Valida 2o digito
  add = 0;
  for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;
  return true;
};

const validarSequenciaNumericaRepetida = cnpj => {
  if (cnpj === "") return false;

  if (cnpj.length !== 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj === "00000000000000" ||
    cnpj === "11111111111111" ||
    cnpj === "22222222222222" ||
    cnpj === "33333333333333" ||
    cnpj === "44444444444444" ||
    cnpj === "55555555555555" ||
    cnpj === "66666666666666" ||
    cnpj === "77777777777777" ||
    cnpj === "88888888888888" ||
    cnpj === "99999999999999"
  )
    return false;

  return true;
};

const valorCaracterCNPJ = caractere => caractere.charCodeAt(0) - 48;

const calcularDigitoCNPJ = (base, pesos) => {
  const soma = base.split("").reduce((acumulado, caractere, indice) => {
    return acumulado + valorCaracterCNPJ(caractere) * pesos[indice];
  }, 0);
  const modulo = soma % 11;

  return modulo < 2 ? 0 : 11 - modulo;
};

export const validarCNPJ = cnpj => {
  const valorCompactado = compactarCNPJ(cnpj);

  if (!/^[A-Z0-9]{12}\d{2}$/.test(valorCompactado)) {
    return false;
  }

  if (
    /^\d{14}$/.test(valorCompactado) &&
    !validarSequenciaNumericaRepetida(valorCompactado)
  ) {
    return false;
  }

  const base = valorCompactado.slice(0, 12);
  const digitosVerificadores = valorCompactado.slice(12);
  const primeiroDigito = calcularDigitoCNPJ(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

  if (primeiroDigito !== parseInt(digitosVerificadores.charAt(0), 10)) {
    return false;
  }

  const segundoDigito = calcularDigitoCNPJ(`${base}${primeiroDigito}`, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

  return segundoDigito === parseInt(digitosVerificadores.charAt(1), 10);
};

export const hasNumber = myString => {
  return /\d/.test(myString);
};
