import { axiosInstance } from '../coreService';

export const getDropBoxes = async () => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: '/dropboxes',
  });

  return response.data;
};
