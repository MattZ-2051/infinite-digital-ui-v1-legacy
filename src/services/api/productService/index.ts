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
  includeFunctions = true
): Promise<ProductWithFunctions[]> => {
  const response = await axiosInstance.request<ProductWithFunctions[]>({
    method: 'GET',
    url: `/products`,
    params: { owner: userId, includeFunctions },
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const getProductCollectors = async (
  skuId: string
): Promise<Collector[]> => {
  const response = await axiosInstance.request<Collector[]>({
    method: 'GET',
    url: `/products/collectors/${skuId}`,
  });

  return response.data;
};

export const getSingleProduct = async (productId: string) => {
  try {
    const res = await axiosInstance.request({
      method: 'GET',
      url: `/products/${productId}`,
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const getProductTransactionHistory = async (productId: string) => {
  try {
    const res = await axiosInstance.request({
      method: 'GET',
      url: `/products/${productId}/transactions`,
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const getReleasesOwnedByUser = async (issuerId: string) => {
  try {
    const res = await axiosInstance.request({
      method: 'GET',
      url: `/skus/tiles`,
      params: { issuerId: issuerId },
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
