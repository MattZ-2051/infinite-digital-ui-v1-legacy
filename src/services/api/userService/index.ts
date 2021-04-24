import { axiosInstance } from '../coreService';

export const getUserInfo = async (token: string) => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: `/users/me`,
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const getUserCollection = async (userId: string, token: string) => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: `/products`,
    params: { owner: userId, includeFunctions: true },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const getUserCards = async (token: string) => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: '/wallet',
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const addFundsToUserWallet = async (
  token: string,
  data: any,
  cardId: string
) => {
  try {
    const response = await axiosInstance.post(
      `/wallet/cards/${cardId}/payments`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log('response', response);

    return response;
  } catch (e) {
    return e;
  }
};

export const createNewUserCC = async (token: string, data: any) => {
  try {
    const response = await axiosInstance.post('/wallet/cards', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (e) {
    return e;
  }
};
