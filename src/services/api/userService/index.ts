import { Card } from 'entities/card';
import { USDCAddress } from 'entities/usdcAddress';
import { User } from 'entities/user';
import { Wallet } from 'entities/wallet';
import { axiosInstance } from '../coreService';

// TODO: Commented code
// the following endpoint is deprecated:
// export const getUserInfoByAuth0Id = async (userId: string, token: string) => {
//   const response = await axiosInstance.request<User[]>({
//     method: 'GET',
//     url: `/users?sub=${userId}`,
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   return response;
// };

export const getMe = async (token: string): Promise<User> => {
  const response = await axiosInstance.request<User>({
    method: 'GET',
    url: `/users/me`,
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const getMyCards = async (token: string): Promise<Wallet> => {
  const response = await axiosInstance.request<Wallet>({
    method: 'GET',
    url: '/wallet',
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
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
    return response;
  } catch (err) {
    if (err.response) {
      return err.response.data;
    } else if (err.request) {
      /*
       * The request was made but no response was received, `err.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      return 'No Response Received';
    } else {
      // Something happened in setting up the request and triggered an err
      return 'Bad Request';
    }
  }
};

export const generateUSDCAddress = async (
  token: string
): Promise<USDCAddress> => {
  try {
    const response = await axiosInstance.get<USDCAddress>(
      `/wallet/usdc/address`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw new Error('Error generating USDC address');
  }
};

export const createNewCC = async (token: string, data: any): Promise<Card> => {
  try {
    const response = await axiosInstance.post<Card>('/wallet/cards', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      return err.response.data;
    } else if (err.request) {
      /*
       * The request was made but no response was received, `err.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      throw new Error('No Response Received');
    } else {
      // Something happened in setting up the request and triggered an err
      console.log(err);
      throw new Error('Bad Request');
    }
  }
};

export const getUser = async (userId: string): Promise<User> => {
  try {
    const response = await axiosInstance.get<User>(`/users/${userId}`);
    return response.data;
  } catch (err) {
    if (err.response) {
      return err.response.data;
    } else if (err.request) {
      /*
       * The request was made but no response was received, `err.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      throw new Error('No Response Received');
    } else {
      // Something happened in setting up the request and triggered an err
      throw new Error('Bad Request');
    }
  }
};

export const updateUsername = async (
  token: string,
  userId: string,
  username: string
): Promise<User> => {
  try {
    const response = await axiosInstance.patch<User>(
      `/users/${userId}`,
      {
        username: username,
        profilePhotoUrl: 'https://place-puppy.com/300x300',
        bannerPhotoUrl: 'https://place-puppy.com/300x300',
        tagline: '',
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    if (err.response) {
      return err.response.data;
    } else if (err.request) {
      /*
       * The request was made but no response was received, `err.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      throw new Error('No Response Received');
    } else {
      // Something happened in setting up the request and triggered an err
      throw new Error('Bad Request');
    }
  }
};
