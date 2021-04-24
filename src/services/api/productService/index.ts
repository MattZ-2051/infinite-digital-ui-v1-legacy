import { Product } from 'entities/product';
import { axiosInstance } from '../coreService';

export const getProducts = async (token: string) => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: '/products',
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const getProductsOwnedByUser = async (userId: string, token: string) => {
  const response = await axiosInstance.request<Product[]>({
    method: 'GET',
    url: `/products`,
    params: { owner: userId, includeFunctions: true },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};
