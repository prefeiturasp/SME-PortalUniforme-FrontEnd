import axios from "axios";
import endPont from "../constants/endPonts.constants";
const authHeader = {
  "Content-Type": "application/json"
};


export const getMeiosRecebimento = async () => {
    const response = await axios.get(`${endPont.API_URL}/meios-de-recebimento/lookup/`,authHeader)
    return response.data;
}