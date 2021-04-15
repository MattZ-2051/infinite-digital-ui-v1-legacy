import axios from 'axios';

const config = {
  baseURL:
    'https://backend-dev.goinfinite.io',
};
const axiosInstance = axios.create(config);

// const createAxiosResponseInterceptor = () => {};

export { axiosInstance };
