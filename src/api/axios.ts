import axios from 'axios';
import {AUTH_TOKEN_NAME} from "@/models/staticContent/constants.ts";

const URL: string = import.meta.env.MODE !== 'production' ? 'https://faceid-admin.theable.tech' : 'https://faceid-admin-dev.theable.tech'

const $axios = axios.create({
  baseURL: URL
});

$axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN_NAME);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
})
export default $axios;
