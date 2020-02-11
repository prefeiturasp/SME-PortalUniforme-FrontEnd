import axios from 'axios'
import endPont from '../constants/endPonts.constants'
const authHeader = {
  'Content-Type': 'application/json'
}

export const getUniformes = async () => {
  const response = await axios.get(
    `${endPont.API_URL}/uniformes/lookup/`,
    authHeader
  )
  return response.data
}

export const cadastrarEmpresa = async payload => {
  const response = await axios.post(
    `${endPont.API_URL}/proponentes/`,
    payload,
    authHeader
  )
  return response
}

export const verificaCnpj = async cnpj => {
  const response = await axios.get(
    `${endPont.API_URL}/proponentes/verifica-cnpj/?cnpj=${cnpj}`,
    authHeader
  )
  return response.data
}

export const busca_url_edital = async () => {
  console.log(endPont.API_URL)
  const response = await axios.get(
    `${endPont.API_URL}/edital`,
    authHeader
  )
  return `${endPont.API_URL}${response.data}`;
}