import { axiosInstance } from '../coreService';

export const getListings = async (token: string) => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: '/listings',
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};


export const patchListingsPurchase = async (token: string, id: string) => {
  const response = await axiosInstance.request({
    method: 'PATCH',
    url: `/listings/${id}/purchase`,
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};