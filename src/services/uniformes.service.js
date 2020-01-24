import axios from "axios";
import endPont from "../constants/endPonts.constants";
const authHeader = {
  "Content-Type": "application/json"
};

export const getUniformes = async () => {
  const response = await axios.get(
    `${endPont.API_URL}/uniformes/lookup/`,
    authHeader
  );
  return response.data;
};

export const cadastrarEmpresa = async payload => {
  const response = await axios.post(
    `${endPont.API_URL}/proponentes/`,
    payload,
    authHeader
  );
  return response;
};
