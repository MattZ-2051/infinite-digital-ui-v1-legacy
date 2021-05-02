import { Sku, SkuWithTotal } from 'entities/sku';
import { axiosInstance } from '../coreService';

export const getSkuTiles = async (options?: {
  queryParams?: string;
  token?: string;
}): Promise<SkuWithTotal> => {
  try {
    const response = await axiosInstance.request<Sku[]>({
      method: 'GET',
      url: `/skus/tiles/${options?.queryParams || ''}`,
      headers: {
        ...(options?.token && { Authorization: `Bearer ${options?.token}` }),
      },
    });
    const { data, headers } = response;
    const contentRange: string = headers['content-range'];
    const rangeArray = contentRange.split('/');
    const total = Number(rangeArray[1]);

    return {
      data,
      total,
    };
  } catch (e) {
    console.error(`getSkuTiles: Error requesting sku tile details. ${e}`);
    throw new Error(e);
  }
};

export const getFeaturedSkuTiles = async (options?: {
  token?: string;
}): Promise<SkuWithTotal> => {
  return await getSkuTiles({
    token: options?.token,
    queryParams: `?featured=true`,
  });
};

export const getSku = async <T extends boolean = false>(
  id: string,
  options?: {
    token?: string;
    includeFunctions?: T;
  }
): Promise<SkuCallReturnType<T>> => {
  try {
    const response = await axiosInstance.request<SkuCallReturnType<T>>({
      method: 'GET',
      url: `/skus/${id}`,
      params: {
        includeFunctions: options?.includeFunctions,
      },
      headers: { Authorization: `Bearer ${options?.token}` },
    });

    return response.data;
  } catch (e) {
    console.error(`getSku: Error requesting sku details. ${e}`);
    throw new Error(e);
  }
};

// We're using this SkuCallReturnType because the /skus endpoint returns
// a "Sku" if includeFunctions is false
// but a "SkuWithFunctions" if includeFunctions is true
type SkuCallReturnType<T> = T extends true ? Sku : Sku;
