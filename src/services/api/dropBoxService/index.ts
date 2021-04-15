import { axiosInstance} from '../coreService';

export const getDropBoxes = async (token: string) => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: '/dropboxes',
    headers: {'Authorization': `Bearer ${token}`},
  });

  return response;
}
