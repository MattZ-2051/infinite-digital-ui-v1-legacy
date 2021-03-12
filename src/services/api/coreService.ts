import axios from 'axios';

const config = {
  //baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
const axiosInstance = axios.create(config);

// const createAxiosResponseInterceptor = () => {

// }

export { axiosInstance };
