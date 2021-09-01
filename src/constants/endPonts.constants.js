/* eslint-disable */
let API_URL = process.env.REACT_APP_API_URL;
let ATUALIZACAO_CADASTRAL_URL = process.env.REACT_APP_ATUALIZACAO_CADASTRAL_URL;
let CONSULTA_CADASTRO_URL = process.env.REACT_APP_CONSULTA_CADASTRO_URL;
let JWT_AUTH = `${API_URL}/api-token-auth/`;
let CODE_GA = process.env.REACT_APP_CODE_GA;

if (process.env.NODE_ENV === "production") {
  // This way we can pass params to static files. see Dockerfile.
  // when build default env is production
  API_URL = "API_URL_REPLACE_ME";
  ATUALIZACAO_CADASTRAL_URL = "ATUALIZACAO_CADASTRAL_URL_REPLACE_ME"
  CONSULTA_CADASTRO_URL = "CONSULTA_CADASTRO_URL_REPLACE_ME"
  JWT_AUTH = "API_URL_REPLACE_ME/api-token-auth/";
  CODE_GA = "GA_REPLACE_ME";
}

module.exports = {
  API_URL: API_URL,
  JWT_AUTH: JWT_AUTH,
  ATUALIZACAO_CADASTRAL_URL: ATUALIZACAO_CADASTRAL_URL,
  CONSULTA_CADASTRO_URL: CONSULTA_CADASTRO_URL,
  IMOVEIS: "cadastro-imovel",
  CODE_GA: CODE_GA
};
