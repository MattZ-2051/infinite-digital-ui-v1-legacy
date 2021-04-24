import { User } from 'entities/user';
import { axiosInstance } from '../coreService';

export const getUserInfoByAuth0Id = async (userId: string, token: string) => {
  const response = await axiosInstance.request<User[]>({
    method: 'GET',
    url: `/users?sub=${userId}`,
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};
