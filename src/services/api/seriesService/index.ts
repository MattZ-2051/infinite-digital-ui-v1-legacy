import { axiosInstance } from '../coreService';

export const getSeries = async (options?: { queryParams?: string }) => {
  try {
    const response = await axiosInstance.request({
      method: 'GET',
      url: `/series/${options?.queryParams || ''}`,
    });
    return response.data;
  } catch (e) {
    console.error(
      `getCategories: Error requesting sku categories tile details. ${e}`
    );
    return undefined;
  }
};
