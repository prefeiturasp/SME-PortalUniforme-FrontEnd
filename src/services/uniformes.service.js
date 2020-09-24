import Axios from "axios";
import axios from "axios";
import { toastError } from "components/Toast/dialogs";
import endPont from "../constants/endPonts.constants";
const authHeader = {
  "Content-Type": "application/json",
};

export const getUniformes = async () => {
  const response = await axios.get(
    `${endPont.API_URL}/uniformes/lookup/`,
    authHeader
  );
  return response.data;
};

export const getTiposFornecimentos = async () => {
  const response = await axios.get(
    `${endPont.API_URL}/uniformes/categorias/`,
    authHeader
  );
  return response.data;
};

export const getTiposDocumentos = async () => {
  const response = await axios.get(
    `${endPont.API_URL}/tipos-documento/`,
    authHeader
  );
  return response.data;
};

export const getLimites = async () => {
  const response = await axios.get(
    `${endPont.API_URL}/limites-categorias/`,
    authHeader
  );
  return response.data;
};

export const cadastrarEmpresa = async (payload) => {
  return axios
    .post(`${endPont.API_URL}/proponentes/`, payload, authHeader)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getEmpresa = async (uuid) => {
  return axios
    .get(`${endPont.API_URL}/proponentes/${uuid}/`, authHeader)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const concluirCadastro = async (uuid) => {
  return axios
    .patch(
      `${endPont.API_URL}/proponentes/${uuid}/concluir-cadastro/`,
      authHeader
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const setAnexo = (payload) => {
  return axios
    .post(`${endPont.API_URL}/anexos/`, payload, authHeader)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const deleteAnexo = (uuid) => {
  return axios
    .delete(`${endPont.API_URL}/anexos/${uuid}/`, authHeader)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const setFachadaLoja = (payload, uuid) => {
  return axios
    .patch(`${endPont.API_URL}/lojas/${uuid}/`, payload, authHeader)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const verificaCnpj = async (cnpj) => {
  const response = await axios.get(
    `${endPont.API_URL}/proponentes/verifica-cnpj/?cnpj=${cnpj}`,
    authHeader
  );
  return response.data;
};

export const busca_url_edital = async () => {
  const response = await axios.get(`${endPont.API_URL}/edital/`, authHeader);
  const domain = endPont.API_URL.includes("/api")
    ? endPont.API_URL.slice(0, -4)
    : endPont.API_URL;
  return `${domain}${response.data}`;
};

export const busca_url_instrucao_normativa = async () => {
  const response = await axios.get(
    `${endPont.API_URL}/instrucao-normativa/`,
    authHeader
  );
  const domain = endPont.API_URL.includes("/api")
    ? endPont.API_URL.slice(0, -4)
    : endPont.API_URL;
  return `${domain}${response.data}`;
};

export const verificaEmail = async (email) => {
  return axios
    .get(
      `${endPont.API_URL}/proponentes/verifica-email/?email=${email}`,
      authHeader
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getAPIVersion = async () => {
  const response = await axios.get(
    `${endPont.API_URL}/api-version/`,
    authHeader
  );
  return response.data["API_Version"];
};

export const getLojasCredenciadas = async (latitude, longitude) => {
  return axios
    .get(
      `${endPont.API_URL}/lojas-credenciadas/?latitude=${latitude}&longitude=${longitude}`,
      authHeader
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getLojasCredenciadasSemLatLong = () => {
  const url = `${endPont.API_URL}/lojas-credenciadas/`;
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

export const getPDFLojasCredenciadas = () => {
  Axios({
    url: `${endPont.API_URL}/lojas-credenciadas/pdf-lojas-credenciadas/`,
    method: "GET",
    responseType: "blob",
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "lojas-credenciadas.pdf");
      document.body.appendChild(link);
      link.click();
    })
    .catch(() => {
      toastError("Erro ao baixar PDF. Tente novamente mais tarde");
    });
};
