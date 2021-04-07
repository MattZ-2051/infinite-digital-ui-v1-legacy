import { axiosInstance } from '../coreService';

export const getSkus = async (queryParams: string, token?: string) => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: `/skus${queryParams}`,
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const getSku = async (id: string, token?: string) => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: `/skus/${id}`,
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};
