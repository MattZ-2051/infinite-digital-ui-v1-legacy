import { axiosInstance } from '../coreService';
import { handleApiError } from 'utils/apiError';

export const getCategories = async (options?: { queryParams?: string }) => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `/categories/${options?.queryParams || ''}`,
    });
    return response.data;
  } catch (e) {
    throw handleApiError(e);
  }
};
