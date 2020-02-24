export const validaOfertaUniforme = payload => {
  let errors = 0;
  payload.forEach(value => {
    if (
      value.preco === undefined ||
      value.preco === null ||
      value.preco === ""
    ) {
      errors += 1;
    }
    if (
      value.uniforme === undefined ||
      value.uniforme === null ||
      value.uniforme === ""
    ) {
      errors += 1;
    }
  });
  return errors;
};

export const parsePayload = payload => {
  const ofertas_de_uniformes = filterOfertaUniforme(payload);
  const meios_de_recebimento = filterMeiosPagamento(payload);
  let payload_limpo = clearPayload(payload);

  payload_limpo["ofertas_de_uniformes"] = ofertas_de_uniformes;
  payload_limpo["meios_de_recebimento"] = meios_de_recebimento;

  return payload_limpo;
};

// Filtrando o payload para pegar os uniformes e preços
const filterOfertaUniforme = payload => {
  let nova_lista_produto = [];
  let nova_lista_preco = [];
  let ofertas_de_uniformes = [];

  for (const key in payload) {
    const prod = extraiUniforme(key);
    const prec = extraiValorUniforme(payload, key);

    if (prod) {
      nova_lista_produto.push(prod);
    }
    if (prec) {
      nova_lista_preco.push(prec);
    }
  }

  nova_lista_produto.forEach((value, key) => {
    ofertas_de_uniformes.push({
      preco: nova_lista_preco[key],
      uniforme: value
    });
  });

  return ofertas_de_uniformes;
};

// Filtrando Payload para pega os meios de pagamentos
const filterMeiosPagamento = payload => {
  let meios_de_recebimento = [];

  for (const key in payload) {
    const band = extraiBandeira(key);
    if (band) {
      meios_de_recebimento.push(band);
    }
  }
  return meios_de_recebimento;
};

// Fazendo Limpeza do payload
const clearPayload = payload => {
  for (const key in payload) {
    if (key.includes("produtos_")) {
      delete payload[key];
    }
    if (key.includes("valor_")) {
      delete payload[key];
    }
    if (key.includes("bandeira_")) {
      delete payload[key];
    }
  }
  return payload;
};

const extraiUniforme = valor => {
  if (valor.includes("produtos_")) {
    return valor.split("produtos_").pop();
  }
};

const extraiBandeira = valor => {
  if (valor.includes("bandeira_")) {
    return valor.split("bandeira_").pop();
  }
};

const extraiValorUniforme = (objeto, valor) => {
  if (valor.includes("valor_")) {
    return objeto[valor];
  }
};

export const validaFormulario = values => {
  let erro = false;
  values.ofertas_de_uniformes.forEach(oferta => {
    if (parseFloat(oferta.preco) <= 0) {
      erro = "Não pode existir fornecimento com valor menor que 0";
    }
  });
  return erro;
};

export const getKey = obj => {
  return Object.keys(obj)[0];
};


export const getError = obj => {
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