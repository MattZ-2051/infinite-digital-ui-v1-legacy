import { Collector } from 'entities/collector';
import { ProductWithFunctions } from 'entities/product';
import { axiosInstance } from '../coreService';

export const getProducts = async (token: string) => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: '/products',
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const getProductsOwnedByUser = async (
  userId: string,
  token: string,
  includeFunctions = false
): Promise<ProductWithFunctions[]> => {
  const response = await axiosInstance.request<ProductWithFunctions[]>({
    method: 'GET',
    url: `/products`,
    params: { owner: userId, includeFunctions },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const getProductCollectors = async (skuId) => {
  const response = await axiosInstance.request<Collector[]>({
    method: 'GET',
    url: `/products/collectors/${skuId}`,
  });

  return response.data;
};
