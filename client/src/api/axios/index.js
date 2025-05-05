import axios from "axios";
import { store } from '../../app/store';
//const baseURL = import.meta.env.FRONTEND_BASE_URL

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.authData?.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  }, function (error) {

    return Promise.reject(error);
  });


export default axiosInstance;

