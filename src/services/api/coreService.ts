import { config } from '../../config';
import axios from 'axios';

const axiosConfig = {
  baseURL: config.backend.apiEndpoint,
};

const axiosInstance = axios.create(axiosConfig);

// const createAxiosResponseInterceptor = () => {};

export { axiosInstance };
