import axios from 'axios';
import {AUTH_TOKEN_NAME, API_URL} from "@/models/staticContent/constants.ts";
import {Cookies} from "@/plugins/cookies.ts";

const $axios = axios.create({
  baseURL: API_URL,
});

$axios.interceptors.request.use((config) => {
  const token = Cookies.get(AUTH_TOKEN_NAME);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
});
export default $axios;
