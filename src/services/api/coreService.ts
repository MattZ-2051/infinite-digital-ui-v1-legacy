import axios from 'axios';

const config = {
  //baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
const axiosInstance = axios.create(config);

// Alter defaults after instance has been created
// axiosInstance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { axiosInstance };
