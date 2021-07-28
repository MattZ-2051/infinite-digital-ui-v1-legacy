import { Sku, SkuWithTotal } from 'entities/sku';
import { axiosInstance } from '../coreService';
import { handleApiError } from 'utils/apiError';

export const getSkuTiles = async (options?: {
  queryParams?: string;
  token?: string;
}): Promise<SkuWithTotal> => {
  try {
    const qss = new URLSearchParams(options?.queryParams);
    const status = qss.get('status');
    if (status === 'onSale') {
      qss.delete('status');
      qss.append('forSale', 'true');
    }
    const response = await axiosInstance.request<Sku[]>({
      method: 'GET',
      url: `/skus/tiles/${qss.toString() ? `?${qss.toString()}` : ''}`,
      headers: {
        ...(options?.token && { Authorization: `Bearer ${options?.token}` }),
      },
    });
    const { data, headers } = response;
    const contentRange: string = headers['content-range'];
    const rangeArray = contentRange.split('/');
    const maxSkusMinPrice = headers['max-skus-min-price']
      ? Number(headers['max-skus-min-price'])
      : 0;
    const total = Number(rangeArray[1]);

    return {
      data,
      total,
      maxSkusMinPrice,
    };
  } catch (e) {
    throw handleApiError(e);
  }
};

export const getFeaturedSkuTiles = async (options?: {
  token?: string;
  issuerId?: string;
  queryParams?: string;
}): Promise<SkuWithTotal> => {
  try {
    return await getSkuTiles({
      token: options?.token,
      queryParams: `?${options?.issuerId ? `&issuerId=${options?.issuerId}` : ''
        }${options?.queryParams || ''}`,
    });
  } catch (err) {
    throw handleApiError(err);
  }
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
    throw handleApiError(e);
  }
};

// We're using this SkuCallReturnType because the /skus endpoint returns
// a "Sku" if includeFunctions is false
// but a "SkuWithFunctions" if includeFunctions is true
type SkuCallReturnType<T> = Sku;



export const getSkusPhysicalClaims = async <T extends boolean = false>(
  page: number,
  perPage: number,
  options?: {
    token?: string;
    includeFunctions?: T;
    sortBy?: string,

  }
): Promise<SkuWithTotal> => {
  try {
    const response = await axiosInstance.request<{ resource: Sku[], totalDocs: number }>({
      method: 'GET',
      url: `/skus/physical-claims`,
      params: {
        includeFunctions: options?.includeFunctions,
        page: page,
        per_page: perPage,
        sortBy: `createdAt:${options?.sortBy === 'oldest' ? 'asc' : 'desc'}`
      },
      headers: { Authorization: `Bearer ${options?.token}` },
    });
    const { data } = response;
    const { resource, totalDocs } = data;
    return { data: resource, total: totalDocs };
  } catch (e) {
    throw handleApiError(e);
  }
};