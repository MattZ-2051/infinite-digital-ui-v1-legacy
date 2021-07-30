import { Listing } from 'entities/listing';
import { AxiosResponse } from 'axios';
import { axiosInstance } from '../coreService';
import { handleApiError } from 'utils/apiError';
import { ITransaction } from 'entities/transaction';
import { GiveawayMint } from './Interfaces';

export const getListings = async (
  token: string
): Promise<AxiosResponse<Listing[]>> => {
  try {
    const response = await axiosInstance.request<Listing[]>({
      method: 'GET',
      url: '/listings',
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const patchListingsPurchase = async (
  token: string,
  id: string
): Promise<AxiosResponse<ITransaction>> => {
  try {
    const response = await axiosInstance.request<ITransaction>({
      method: 'PATCH',
      url: `/listings/${id}/purchase`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const postListings = async (
  token: string,
  body: any
): Promise<AxiosResponse<Listing>> => {
  try {
    const response = await axiosInstance.post<Listing>('/listings', body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const cancelListing = async (
  token: string,
  listingId: string
): Promise<AxiosResponse<Listing>> => {
  try {
    const res = await axiosInstance.patch<Listing>(
      `/listings/${listingId}/cancel`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res;
  } catch (e) {
    throw handleApiError(e);
  }
};

export const claimGiveaway = async (
  token: string,
  id: string
): Promise<AxiosResponse<GiveawayMint>> => {
  try {
    const response = await axiosInstance.post<GiveawayMint>(
      `/listings/${id}/claim-giveaway`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (err) {
    throw handleApiError(err);
  }
};
