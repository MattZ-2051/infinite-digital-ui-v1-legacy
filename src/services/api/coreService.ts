import axios from 'axios';

const config = {
  baseURL:
    'http://infinite-digital-dev.eba-7pjrtnms.us-east-1.elasticbeanstalk.com',
};
const axiosInstance = axios.create(config);

// const createAxiosResponseInterceptor = () => {};

export { axiosInstance };
