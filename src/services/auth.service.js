import decode from "jwt-decode";
import endPonts from "../constants/endPonts.constants";
import { toastError } from "components/Toast/dialogs";

export const TOKEN_ALIAS = "TOKEN_LOGGED3";

const login = async (email, password) => {
  try {
    const response = await fetch(`${endPonts.API_URL}/api-token-auth/`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const json = await response.json();
    const isValid = isValidResponse(json);
    if (isValid) {
      localStorage.setItem(TOKEN_ALIAS, json.token);
      let status = 0;
      return fetch(`${endPonts.API_URL}/usuarios/me/`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${json.token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        status = res.status;
        return res.json();
      })
      .then((data) => {
        return { data: data, status: status };
      })
      .catch((error) => {
        return error;
      });
    } else {
      toastError("Login e/ou senha inválidos");
    }
    return isValid;
  } catch (error) {
    return false;
  }
};

const logout = () => {
  localStorage.removeItem(TOKEN_ALIAS);
  localStorage.removeItem("uuid");
  localStorage.removeItem("status");
  localStorage.removeItem("razao_social");
  localStorage.removeItem("cnpj");
  window.location.href = process.env.PUBLIC_URL
    ? `/${process.env.PUBLIC_URL}/login`
    : "/login";
};

export const getToken = () => {
  let token = localStorage.getItem(TOKEN_ALIAS);
  if (token) {
    if (isTokenExpired(token)) logout();
    if (needsToRefreshToken(token)) {
      refreshToken(token).then((json) => {
        if (isValidResponse(json))
          localStorage.setItem(TOKEN_ALIAS, json.token);
      });
      token = localStorage.getItem(TOKEN_ALIAS);
    }
    return token;
  }
};

const isLoggedIn = () => {
  const token = localStorage.getItem(TOKEN_ALIAS);
  if (token) {
    return true;
  }
  return false;
};

const isValidResponse = (json) => {
  try {
    const decoded = decode(json.token);
    const test2 =
      decoded.user_id !== undefined &&
      decoded.username !== undefined &&
      decoded.exp !== undefined &&
      decoded.email !== undefined;
    const test1 = json.token.length >= 203 ? true : false;
    return test1 && test2;
  } catch (error) {
    return false;
  }
};

export const refreshToken = async (token) => {
  try {
    const response = await fetch(`${endPonts.API_URL}/api-token-refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(`refreshToken ${error}`);
  }
};

const needsToRefreshToken = (token) => {
  const secondsLeft = calculateTokenSecondsLeft(token);
  if (secondsLeft < 3000) {
    return true;
  } else return false;
};

export const isTokenExpired = (token) => {
  try {
    const secondsLeft = calculateTokenSecondsLeft(token);
    if (secondsLeft <= 0) {
      return true;
    } else return false;
  } catch (err) {
    console.log("Falha ao verificar token expirado");
    return true;
  }
};

export const calculateTokenSecondsLeft = (token) => {
  const decoded = decode(token);
  const dateToken = new Date(decoded.exp * 1000);
  const dateVerify = new Date(Date.now());
  const secondsLeft = (dateToken - dateVerify) / 1000;
  return secondsLeft;
};

const authService = {
  login,
  logout,
  getToken,
  isLoggedIn,
  isValidResponse,
};

export default authService;
