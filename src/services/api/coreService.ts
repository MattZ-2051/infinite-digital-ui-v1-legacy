import axios from 'axios';

const config = {
  baseURL:
    process.env.REACT_APP_API_ENDPOINT as string,
};
const axiosInstance = axios.create(config);

// const createAxiosResponseInterceptor = () => {};

export { axiosInstance };
