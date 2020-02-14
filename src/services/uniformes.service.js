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

export const getTiposFornecimentos = async () => {
  const response = await axios.get(
    `${endPont.API_URL}/uniformes/categorias/`,
    authHeader
  )
  return response.data
}

export const getTiposDocumentos = async () => {
  const response = await axios.get(
    `${endPont.API_URL}/tipos-documento/`,
    authHeader
  )
  return response.data;
}

export const getLimites = async () => {
  const response = await axios.get(
    `${endPont.API_URL}/limites-categorias/`,
    authHeader
  )
  return response.data;
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
  const response = await axios.get(`${endPont.API_URL}/edital`, authHeader)
  const domain = endPont.API_URL.includes('/api') ? endPont.API_URL.slice(0, -4) : endPont.API_URL  
  return `${domain}${response.data}`
}

export const busca_url_instrucao_normativa = async () => {
  const response = await axios.get(
    `${endPont.API_URL}/instrucao-normativa`,
    authHeader
  )
}
