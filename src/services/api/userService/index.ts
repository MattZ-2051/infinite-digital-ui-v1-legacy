import { axiosInstance } from '../coreService';

export const getUserInfo = async (userId: string, token: string) => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: `/users/sub/${userId}`,
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const getUserCollection = async (userId: string, token: string) => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: `/sku/collectors`,
    params: { owner: userId, includeFunctions: true },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const getUserCards = async (token: string) => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: '/users/wallet',
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log('service', response);

  return response;
};

export const createNewUserCC = async (token: string, data: any) => {
  const response = await axiosInstance.post('/users/wallet/cards', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response) {
    console.log('service', response);
  }

  return response;
};
