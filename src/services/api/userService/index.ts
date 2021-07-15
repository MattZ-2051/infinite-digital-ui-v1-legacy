import { Card } from 'entities/card';
import { ITransaction, TransactionData } from 'entities/transaction';
import { USDCAddress } from 'entities/usdcAddress';
import { ExtendedBalanceInfo, User } from 'entities/user';
import { Wallet } from 'entities/wallet';
import { axiosInstance } from '../coreService';
import {
  IUser,
  IAddFundsData,
  IPasswordResetResponse,
} from './Interfaces/index';
import { handleApiError } from 'utils/apiError';
import { config } from 'config';
import axios, { Method } from 'axios';

export const getMe = async (token: string): Promise<User> => {
  try {
    const response = await axiosInstance.request<User>({
      method: 'GET',
      url: `/users/me`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      ...response.data,
      auctionBidIncrement: response.headers['auction-bid-increment'],
    };
  } catch (err) {
    throw handleApiError(err);
  }
};

export const getBalances = async (
  token: string
): Promise<ExtendedBalanceInfo> => {
  try {
    const response = await axiosInstance.request<ExtendedBalanceInfo>({
      method: 'GET',
      url: `/wallet/balance`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const getMyTransactions = async (
  token: string,
  page: number,
  per_page: number,
  filter,
  sortBy = 'newest'
): Promise<{ data: ITransaction[]; total: number }> => {
  try {
    const params = {
      filter: JSON.stringify(filter),
      page,
      per_page,
    };
    params['sortBy'] = `createdAt:${sortBy === 'newest' ? 'desc' : 'asc'}`;
    const response = await axiosInstance.request<ITransaction[]>({
      method: 'GET',
      url: `/users/me/transactions`,
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    const { data, headers } = response;
    const contentRange: string = headers['content-range'];
    const rangeArray = contentRange.split('/');
    const total = Number(rangeArray[1]);
    return { data, total };
  } catch (err) {
    throw handleApiError(err);
  }
};

export const getMyCards = async (token: string): Promise<Wallet> => {
  try {
    const response = await axiosInstance.request<Wallet>({
      method: 'GET',
      url: '/wallet',
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const addFundsToUserWallet = async (
  token: string,
  data: any,
  cardId: string
): Promise<void> => {
  try {
    await axiosInstance.post<void>(`/wallet/cards/${cardId}/payments`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    throw handleApiError(err);
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
    throw handleApiError(err);
  }
};

export const createNewCC = async (token: string, data: any): Promise<Card> => {
  try {
    const response = await axiosInstance.post<Card>('/wallet/cards', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const removeUserCC = async (token: string, cardId: string) => {
  try {
    const response = await axiosInstance.delete<void>(
      `/wallet/cards/${cardId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (err) {
    throw handleApiError(err);
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
    throw handleApiError(err);
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
    throw handleApiError(err);
  }
};

export const updateUsername = async (
  token: string,
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
    throw handleApiError(err);
  }
};

export const requestPasswordReset = async (
  token: string,
  email: string
): Promise<IPasswordResetResponse> => {
  const options = {
    method: 'POST' as Method,
    url: `https://${config.auth.auth0Domain}/dbconnections/change_password`,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: {
      client_id: config.auth.auth0ClientId,
      email,
      connection: 'Username-Password-Authentication',
    },
  };
  try {
    const response = await axios.request<string>(options);
    console.log(response);
    const { data, status, statusText } = response;
    return { data, status, statusText };
  } catch (err) {
    throw handleApiError(err);
  }
};

export const getCreators = async (options?: {
  queryParams?: string;
}): Promise<IUser[] | undefined> => {
  try {
    const { data }: { data: IUser[] } = await axiosInstance.request({
      method: 'GET',
      url: `/users`,
      params: { role: 'issuer', page: 1, per_page: 50 },
    });
    return data;
  } catch (err) {
    throw handleApiError(err);
  }
};
