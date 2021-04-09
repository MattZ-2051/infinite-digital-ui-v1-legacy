import { axiosInstance } from '../coreService';

export const getSkus = async (token: string) => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: '/skus',
    headers: {'Authorization': `Bearer ${token}`},
  });

  return response;
};

export const getFeaturedSkuTiles = async () => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: '/skus/tiles?featured=true',
  });

  return response;
};
