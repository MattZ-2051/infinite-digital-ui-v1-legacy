import { axiosInstance } from "../coreService";

export const getUserInfo = async (userId: string, token: string) => {
  const response = await axiosInstance.request({
    method: "GET",
    url: `/users/sub/${userId}`,
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const getUserCollection = async (userId: string, token: string) => {
  const response = await axiosInstance.request({
    method: "GET",
    url: `/sku/collectors`,
    params: { owner: userId, includeFunctions: true },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};
