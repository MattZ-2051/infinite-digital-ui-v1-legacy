import { axiosInstance } from '../coreService';

export const getListings = async (token: string) => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: '/listings',
    headers: {'Authorization': `Bearer ${token}`},
  });

  return response;
};
