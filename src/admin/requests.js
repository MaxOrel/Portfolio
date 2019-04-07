import axios from "axios";
import {
  setToken,
  setAuthHttpHeaderToAxios,
  getToken
} from "@/helpers/token.js";

axios.defaults.baseURL = "https://webdev-api.loftschool.com";

const token = getToken();

if (token) {
  setAuthHttpHeaderToAxios(axios, token);
}

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      return axios.post("/refreshToken").then(response => {
        const token = response.data.token;
        setToken(token);

        setAuthHttpHeaderToAxios(axios, token);
        originalRequest.headers.common["Authorization"] = `Bearer ${token}`;

        return axios(originalRequest);
      });
    }
  }
);

export default axios;
