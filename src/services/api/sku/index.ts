import { AxiosResponse } from 'axios';
import { Sku, SkuWithFunctions } from 'entities/sku';
import { axiosInstance } from '../coreService';

export const getSkus = async (queryParams: string, token?: string) => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: `/skus/tiles/${queryParams}`,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const getFeaturedSkuTiles = async () => {
  const response = await axiosInstance.request<SkuWithFunctions[]>({
    method: 'GET',
    url: '/skus/tiles?featured=true',
  });
  return response;
};

export const getSku = async <T extends boolean = false>(
  id: string,
  token?: string,
  includeFunctions?: T
): Promise<AxiosResponse<SkuCallReturnType<T>>> => {
  const response = await axiosInstance.request<SkuCallReturnType<T>>({
    method: 'GET',
    url: `/skus/${id}`,
    params: {
      includeFunctions,
    },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

// We're using this SkuCallReturnType because the /skus endpoint returns
// a "Sku" if includeFunctions is false
// but a "SkuWithFunctions" if includeFunctions is true

// eslint-disable-next-line prettier/prettier
type SkuCallReturnType<T> =
  T extends true ? SkuWithFunctions : 
  Sku

export const getCollectors = async () => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: `/sku/collectors`,
  });

  return response;
};
