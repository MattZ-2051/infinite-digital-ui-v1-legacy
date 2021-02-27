import axios, { AxiosResponse } from "axios";

const realm = "suku-dev"; //suku-master

export const logIn = async (): Promise<any | undefined> => {
  const params = new URLSearchParams(); // Needed for application/x-www-form-urlencoded
  const clientId = "infinite-digital-ui";
  const username = "user1@example.com";
  const password = "Safest@123";

  params.append("client_id", clientId);
  params.append("username", username);
  params.append("password", password);
  params.append("grant_type", "password");

  const realm = "suku-dev"; //suku-master
  const response = await axios.request({
    method: "POST",
    url: `https://sso.suku.app/auth/realms/${realm}/protocol/openid-connect/token`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: params,
  });
  return response;
};

export async function refresh(
  refreshToken: string,
  clientId = "infinite-backend"
): Promise<AxiosResponse<any> | undefined> {
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("refresh_token", refreshToken);
  params.append("grant_type", "refresh_token");
  const response = await axios.request({
    method: "POST",
    url: `https://sso.suku.app/auth/realms/${realm}/protocol/openid-connect/token`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: params,
  });
  return response;
}
