import { Listing } from 'entities/listing';
import { AxiosResponse } from 'axios';
import { axiosInstance } from '../coreService';
import { ProductWithFunctions } from 'entities/product';
import * as Sentry from '@sentry/react';

export const getListings = async (
  token: string
): Promise<AxiosResponse<Listing[]>> => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: '/listings',
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const patchListingsPurchase = async (
  token: string,
  id: string
): Promise<AxiosResponse<any>> => {
  try {
    const response = await axiosInstance.request({
      method: 'PATCH',
      url: `/listings/${id}/purchase`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {
    Sentry.captureException(err);
    return err.response;
  }
};

export const postListings = async (
  token: string,
  body: any
): Promise<AxiosResponse<any>> => {
  const response = await axiosInstance.post('/listings', body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
