import axios, { AxiosResponse } from 'axios';

//axios.defaults.baseURL = import.meta.env.PROD ? 'https://faceid-admin.theable.tech/' : 'https://fback.scon.uz/';
axios.defaults.baseURL = 'https://faceid-admin.theable.tech/';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config;
});

// axios.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     if (!error.response) return Promise.reject(error);
//     const data: any = error.response.data
//     const status = error.response.status
//     switch (status) {
//       case 400:
//         console.log(data.message);
//       break;
//
//       case 401:
//         console.log('unauthorised', data);
//       break;
//
//       case 404:
//         console.log('/not-found', data);
//       break;
//
//       case 500:
//         console.log('/server-error', data);
//       break;
//     }
//     return Promise.reject(error);
//   }
// );

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string, query?: {}) => {
    return axios.get<T>(url, {params: query}).then(responseBody).catch(error => error)
  },

  post: <T>(url: string, body: {}) => {
    return axios.post<T>(url, body).then(responseBody).catch(error => error)
  },

  put: <T>(url: string, body: {}) => {
    return axios.post<T>(url, body).then(responseBody).catch(error => error)
  },

  delete: <T>(url: string) => {
    return axios.delete<T>(url).then(responseBody).catch(error => error)
  }
};
export default request;