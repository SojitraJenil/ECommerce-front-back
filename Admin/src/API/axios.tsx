/* eslint-disable react/react-in-jsx-scope */
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

export const axiosInstance = axios.create({
  // baseURL: 'https://ecommerce-3-ul25.onrender.com',
  baseURL: 'http://localhost:8000',
});

axiosInstance.interceptors.request.use(
  (config: any): AdaptAxiosRequestConfig => {
    return config;
  },
  (error: any): any => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async (response: any): Promise<any> => {
    if (response.data.status === 401) {
    }
    return response;
  },
  async (error: any): Promise<any> => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);
  },
);

//NOTE - Logout when JWT token expire
axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (
      error.response?.status === 401 &&
      error.response.data.message == 'jwt expired'
    ) {
      //   eventEmitter.emit('jwtTokenExpired', 'Jwt expired!');
    }
    return Promise.reject(error);
  },
);
