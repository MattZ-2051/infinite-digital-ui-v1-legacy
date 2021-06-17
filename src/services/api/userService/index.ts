import { Card } from 'entities/card';
import { ITransaction, TransactionData } from 'entities/transaction';
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

  return {
    ...response.data,
    auctionBidIncrement: response.headers['auction-bid-increment'],
    initialBuyersFeePercentage:
      response.headers['initial-buyers-fee-percentage'],
  };
};

export const getMyTransactions = async (
  token: string,
  page: number,
  per_page: number,
  filter
): Promise<{ data: ITransaction[]; total: number }> => {
  const response = await axiosInstance.request<ITransaction[]>({
    method: 'GET',
    url: `/users/me/transactions`,
    headers: { Authorization: `Bearer ${token}` },
    params: {
      filter: JSON.stringify(filter),
      page,
      per_page,
    },
  });
  const { data, headers } = response;
  const contentRange: string = headers['content-range'];
  const rangeArray = contentRange.split('/');
  const total = Number(rangeArray[1]);
  return { data, total };
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
): Promise<Wallet> => {
  try {
    const response = await axiosInstance.post(
      `/wallet/cards/${cardId}/payments`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
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
      throw new Error('Error occured');
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

export const removeUserCC = async (token: string, cardId: string) => {
  try {
    const response = await axiosInstance.delete(`/wallet/cards/${cardId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error('Error Occured');
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

export const getUser = async (
  username: string,
  page: number,
  per_page: number
): Promise<User> => {
  try {
    const response = await axiosInstance.get<User>(`/users`, {
      params: {
        username,
        page,
        per_page,
      },
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
      throw new Error('Bad Request');
    }
  }
};

export const getPersonalToken = async (
  token: string
): Promise<{ token: string }> => {
  try {
    const response = await axiosInstance.post<{ token: string }>(
      `/users/personal-token`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error('Error getting personal token');
  }
};

export const updateUsername = async (
  token: string,
  userId: string,
  username: string
): Promise<User> => {
  try {
    const response = await axiosInstance.patch<User>(
      `/users/me`,
      {
        username: username,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data);
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

export const getCreators = async (options?: { queryParams?: string }) => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `/users`,
      params: { role: 'issuer', page: 1, per_page: 50 },
    });
    return response.data;
  } catch (e) {
    console.error(
      `getCategories: Error requesting sku categories tile details. ${e}`
    );
    return undefined;
  }
};
