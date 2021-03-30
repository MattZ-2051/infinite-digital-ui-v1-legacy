import { axiosInstance } from '../coreService';

export const getSkus = async (queryParams: string, token?: string) => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: `/skus${queryParams}`,
    headers: {'Authorization': `Bearer ${token}`},
  });

  return response;
};
