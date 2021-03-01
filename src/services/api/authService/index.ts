import { axiosInstance } from "../coreService";
import { setToken } from "lib/utils/auth";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID as string;
const REALM = process.env.REACT_APP_REALM as string;
const API_AUTH_URL = process.env.REACT_APP_API_AUTH_URL as string;

export const logIn = async (
  username: string,
  password: string
): Promise<any | undefined> => {
  const params = new URLSearchParams(); // Needed for application/x-www-form-urlencoded

  params.append("client_id", CLIENT_ID);
  params.append("username", username);
  params.append("password", password);
  params.append("grant_type", "password");

  const response = await axiosInstance.request({
    method: "POST",
    url: `${API_AUTH_URL}/auth/realms/${REALM}/protocol/openid-connect/token`,
    data: params,
  });

  const {
    access_token,
    refresh_token,
    expires_in,
    refresh_expires_in,
  } = response.data;

  setToken({ access_token, refresh_token, expires_in, refresh_expires_in });

  return response;
};
