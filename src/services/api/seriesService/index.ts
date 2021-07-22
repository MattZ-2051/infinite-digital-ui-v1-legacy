import { handleApiError } from 'utils/apiError';
import { axiosInstance } from '../coreService';
import { ISeries } from './Interfaces/ISeries';

export const getSeries = async (options?: {
  queryParams?: string;
}): Promise<ISeries[]> => {
  try {
    const response = await axiosInstance.request<ISeries[]>({
      method: 'GET',
      url: `/series/${options?.queryParams || ''}`,
    });
    return response.data;
  } catch (e) {
    throw handleApiError(e);
  }
};
