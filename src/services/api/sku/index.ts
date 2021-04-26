import { Sku, SkuWithFunctions, SkuWithFunctionsPopulated } from 'entities/sku';
import { axiosInstance } from '../coreService';

export const getSkuTiles = async (options?: {
  queryParams?: string;
  token?: string;
}): Promise<SkuWithFunctionsPopulated[] | undefined> => {
  try {
    const response = await axiosInstance.request<SkuWithFunctionsPopulated[]>({
      method: 'GET',
      url: `/skus/tiles/${options?.queryParams || ''}`,
      headers: {
        ...(options?.token && { Authorization: `Bearer ${options?.token}` }),
      },
    });
    return response.data;
  } catch (e) {
    console.error(`getSkuTiles: Error requesting sku tile details. ${e}`);
    return undefined;
  }
};

export const getFeaturedSkuTiles = async (): Promise<
  SkuWithFunctionsPopulated[] | undefined
> => {
  return await getSkuTiles({ queryParams: `?featured=true` });
};

export const getSku = async <T extends boolean = false>(
  id: string,
  options?: {
    token?: string;
    includeFunctions?: T;
  }
): Promise<SkuCallReturnType<T> | undefined> => {
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
    return undefined;
  }
};

// We're using this SkuCallReturnType because the /skus endpoint returns
// a "Sku" if includeFunctions is false
// but a "SkuWithFunctions" if includeFunctions is true
type SkuCallReturnType<T> = T extends true ? SkuWithFunctions : Sku;
