import { Collector } from 'entities/collector';
import { ProductWithFunctions } from 'entities/product';
import { axiosInstance } from '../coreService';
import { AxiosResponse } from 'axios';
import { Bid } from 'entities/bid';

export const getProducts = async (token: string) => {
  const response = await axiosInstance.request({
    method: 'GET',
    url: '/products',
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};

export const getProductsOwnedByUser = async (
  userId: string,
  token: string,
  page?: number,
  perPage?: number,
  includeFunctions = true
): Promise<{ data: ProductWithFunctions[]; total: number }> => {
  const params = { owner: userId, includeFunctions };
  if (page) {
    params['page'] = page;
    params['per_page'] = perPage;
  }
  const response = await axiosInstance.request<ProductWithFunctions[]>({
    method: 'GET',
    url: `/products`,
    params,
    headers: { Authorization: `Bearer ${token}` },
  });

  const { data, headers } = response;
  const contentRange: string = headers['content-range'];
  const rangeArray = contentRange.split('/');
  const total = Number(rangeArray[1]);
  return { data, total };
};

export const getProductCollectors = async (
  skuId: string,
  page?: number,
  perPage?: number,
  searchTerm?: string,
  forSale?: boolean
): Promise<Collector[]> => {
  const params = [];
  if (page) {
    params['page'] = page;
    params['per_page'] = perPage;
  }
  // if (searchTerm) {
  //   params['search'] = searchTerm
  // }
  // if (forSale) {
  //   params['forSale'] = forSale
  // }

  const response = await axiosInstance.request<Collector[]>({
    method: 'GET',
    url: `/products/collectors/${skuId}`,
    params,
  });

  return response.data;
};

export const getSingleProduct = async (
  productId: string,
  includeFunctions = true
) => {
  try {
    const res = await axiosInstance.request({
      method: 'GET',
      url: `/products/${productId}`,
      params: { includeFunctions },
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const getProductTransactionHistory = async (productId: string) => {
  try {
    const res = await axiosInstance.request({
      method: 'GET',
      url: `/products/${productId}/transactions`,
    });
    return res;
  } catch (err) {
    return err;
  }
};

export const getReleasesOwnedByUser = async (
  issuerId: string,
  page?: number,
  perPage?: number,
  queryParams?: string
) => {
  const params = { issuerId };
  if (page) {
    params['page'] = page;
    params['per_page'] = perPage;
  }
  try {
    const res = await axiosInstance.request({
      method: 'GET',
      url: `/skus/tiles/${queryParams || ''}`,
      params,
    });
    const { data, headers } = res;
    const contentRange: string = headers['content-range'];
    const rangeArray = contentRange.split('/');
    const total = Number(rangeArray[1]);
    return { data, total };
  } catch (err) {
    return err;
  }
};

export const redeemProduct = async (
  token: string,
  data: any,
  productId: string
): Promise<any> => {
  try {
    const response = await axiosInstance.patch<any>(
      `/products/${productId}/redeem`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (e) {
    console.error('err', e.response);
    return e.response;
  }
};

export const getBids = async (
  token: string,
  listingId?: string,
  page?: number,
  perPage?: number,
  includeFunctions = true
): Promise<any> => {
  const params = { listing: listingId, includeFunctions };
  if (page) {
    params['page'] = page;
    params['per_page'] = perPage;
  }
  try {
    const response = await axiosInstance.get<any>('/bids', {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return response;
  } catch (e) {
    return e.response;
  }
};

export const postBid = async (
  id: string,
  token: string,
  body: any
): Promise<AxiosResponse<any>> => {
  const response = await axiosInstance.post(`/listings/${id}/bids`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const getMeBids = async (
  token: string,
  page?: number,
  perPage?: number,
  includeFunctions = true
): Promise<any> => {
  const params = { includeFunctions };
  if (page) {
    params['page'] = page;
    params['per_page'] = perPage;
  }
  try {
    const response = await axiosInstance.get<any>('/bids/active', {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    const { data, headers } = response;
    const contentRange: string = headers['content-range'];
    const rangeArray = contentRange.split('/');
    const total = Number(rangeArray[1]);

    return { data: data as Bid[], total: total as number };
  } catch (e) {
    return e.response;
  }
};
