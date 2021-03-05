import axios from 'axios';
import { refreshAccessToken } from 'services/api/authService';
import { getToken, setToken } from 'lib/utils/auth';
import { KeyboardReturnOutlined } from '@material-ui/icons';

const config = {
  //baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};
const axiosInstance = axios.create(config);

// Alter defaults after instance has been created
// axiosInstance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const createAxiosResponseInterceptor = () => {
  const interceptor = axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // Reject promise if usual error
      if (error.response.status !== 403) {
        return Promise.reject(error);
      }

      /*
       * When response code is 403, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 403 response
       */
      axios.interceptors.response.eject(interceptor);

      const refreshToken = getToken().refresh_token;
      refreshAccessToken(refreshToken)
        .then((response) => {
          const {
            access_token,
            refresh_token,
            expires_in,
            refresh_expires_in,
          } = response.data;

          setToken({
            access_token,
            refresh_token,
            expires_in,
            refresh_expires_in,
          });
          error.response.config.headers['Authorization'] =
            'Bearer ' + access_token;
          return axiosInstance(error.response.config);
        })
        .catch((error) => {
          console.log('refreshAccessToken error', error);
          window.location.href = "/sign-out";
          return Promise.reject(error);
        })
        .finally(createAxiosResponseInterceptor);
    }
  );
};

createAxiosResponseInterceptor();
export { axiosInstance };
