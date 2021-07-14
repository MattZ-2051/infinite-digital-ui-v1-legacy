import { axiosInstance } from '../coreService';
import { IPlaidAccount } from 'entities/plaidAccount';
import { IWithdraw } from 'entities/withdraw';
import { IBillingForAch } from 'components/BillingFormForAch';
import { handleApiError } from 'utils/apiError';
import { IHbarDeposits } from './Interfaces';

export const doWithdraw = async (
  token: string,
  achId: string,
  amount: string
): Promise<IWithdraw> => {
  try {
    const response = await axiosInstance.post(
      `/wallet/ach/${achId}/payouts`,
      { amount },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data as IWithdraw;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const removeAch = async (
  token: string,
  achId: string
): Promise<void> => {
  await axiosInstance
    .delete(`/wallet/ach/${achId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch(handleApiError);
};

export const getAchAccounts = async (
  token: string,
  skip: number,
  limit: number
): Promise<{ resources: IPlaidAccount[]; total: number }> => {
  try {
    const response = await axiosInstance.get(`/wallet/ach`, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        skip,
        limit,
      },
    });
    const resources = response.data.resource;
    const total = response.data.totalDocs;
    // const resources = response.data as IPlaidAccount[];
    // const contentRange: string = response.headers['content-range'];
    // const rangeArray = contentRange.split('/');
    // const total = parseInt(rangeArray[1], 10);
    return { resources, total };
  } catch (err) {
    console.log(err);
    throw handleApiError(err);
  }
};

export const getPlaidAccessToken = async (
  token: string,
  public_token: string,
  { phone, email, ...billing }: IBillingForAch,
  metadata: any
): Promise<any> => {
  const billingDetails = {
    ...billing,
    country: billing.country?.iso2 || '',
    district: billing.district?.stateCode || '',
  };
  try {
    const response = await axiosInstance.post(
      `/wallet/ach/token`,
      {
        public_token,
        metadata,
        details: {
          metadata: {
            email,
            phone,
          },
          billingDetails,
        },
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const getPlaidLinkToken = async (token: string): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      `/wallet/ach/link`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const checkHbarDeposits = async (
  token: string
): Promise<IHbarDeposits> => {
  try {
    const response = await axiosInstance.post<IHbarDeposits>(
      `/wallet/hbar/check`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
    return response.data;
  } catch (err) {
    throw handleApiError(err);
  }
};
