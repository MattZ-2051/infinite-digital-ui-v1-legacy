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

export const getSku = async (id: string, token?: string) => {
  const response = await axiosInstance.request<Sku>({
    method: 'GET',
    url: `/skus/${id}`,
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const getCollectors = async () => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: `/sku/collectors`,
  });

  return response;
};
