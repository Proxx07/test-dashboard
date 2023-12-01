import axios from 'axios';
import {AUTH_TOKEN_NAME} from "@/models/staticContent/constants.ts";

const $axios = axios.create({
  baseURL: 'https://faceid-admin.theable.tech/'
});
$axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_NAME);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
})
export default $axios;
