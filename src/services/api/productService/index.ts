import { ProductWithFunctions, Product } from 'entities/product';
import { axiosInstance } from '../coreService';
import { handleApiError } from 'utils/apiError';
import { ITransaction } from 'entities/transaction';
import { Bid } from 'entities/bid';
import { FileAsset } from 'entities/fileAsset';
import {
  IProductTxHistory,
  MyBid,
  IProductsOwnedByUser,
  ProductCollectors,
  SkuReleasesOwnedByUser,
  MyBids,
} from './Interfaces';
import { Sku } from 'entities/sku';
import { Collector } from 'entities/collector';
import { AxiosResponse } from 'axios';

export const getProductsOwnedByUser = async (
  userId: string,
  token: string,
  page?: number,
  perPage?: number,
  includeFunctions = true,
  sortBy = 'newest',
): Promise<IProductsOwnedByUser> => {
  const params = { owner: userId, includeFunctions };
  if (page) {
    params['page'] = page;
    params['per_page'] = perPage;
  }
  params['sortBy'] = `createdAt:${sortBy === 'newest' ? 'desc' : 'asc'}`;

  const response = await axiosInstance.request<ProductWithFunctions[]>({
    method: 'GET',
    url: `/products`,
    params,
    headers: { Authorization: `Bearer ${token}` },
  });

  const { data, headers } = response;
  const contentRange: string = headers['content-range'];
  const rangeArray = contentRange.split('/');
  const totalProducts = Number(rangeArray[1]);
  return { data, totalProducts };
};

export const getProductCollectors = async (
  skuId: string,
  page?: number,
  perPage?: number,
  includeFunctions = true,
  searchTerm?: string,
  forSaleCheck?: boolean,
  sortBySerialAsc = true,
  ownerId?: string
): Promise<ProductCollectors> => {
  const params = { includeFunctions };
  if (page) {
    params['page'] = page;
    params['per_page'] = perPage;
  }
  if (searchTerm) {
    params['search'] = searchTerm;
  }
  if (forSaleCheck) {
    params['forSale'] = forSaleCheck;
  }
  let queryParams = `sortBy=serialNumber:${sortBySerialAsc ? 'asc' : 'desc'}`;
  if (ownerId) {
    queryParams = queryParams + `&ownerId=${ownerId}`;
  }

  const response = await axiosInstance.request<Collector[]>({
    method: 'GET',
    url: `/products/collectors/${skuId}?${queryParams}`,
    params,
  });
  const { data, headers } = response;
  const contentRange: string = headers['content-range'];
  const rangeArray = contentRange.split('/');
  const totalCollectors = Number(rangeArray[1]);
  return { data, totalCollectors };
};

export const getSingleProduct = async (
  productId: string,
  includeFunctions = true
): Promise<ProductWithFunctions> => {
  try {
    const res = await axiosInstance.request<ProductWithFunctions>({
      method: 'GET',
      url: `/products/${productId}`,
      params: { includeFunctions },
    });
    return res.data;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const getProductTransactionHistory = async (
  productId: string,
  page?: number,
  perPage?: number
): Promise<IProductTxHistory> => {
  try {
    const res = await axiosInstance.request<ITransaction[]>({
      method: 'GET',
      url: `/products/${productId}/transactions`,
      params: { page: page, per_page: perPage },
    });
    const { data, headers } = res;
    const contentRange: string = headers['content-range'];
    const rangeArray = contentRange.split('/');
    const totalTransactions = Number(rangeArray[1]);
    return { data, totalTransactions };
  } catch (err) {
    throw handleApiError(err);
  }
};

export const getReleasesOwnedByUser = async (
  issuerId: string,
  page?: number,
  perPage?: number,
  // queryParams?: string,
  sortBy = 'newest',
): Promise<SkuReleasesOwnedByUser> => {
  const params = { issuerId };
  if (page) {
    params['page'] = page;
    params['per_page'] = perPage;
  }
  params['sortBy'] = `createdAt:${sortBy === 'newest' ? 'desc' : 'asc'}`;
  try {
    const res = await axiosInstance.request<Sku[]>({
      method: 'GET',
      url: '/skus/tiles',
      params,
    });
    const { data, headers } = res;
    const contentRange: string = headers['content-range'];
    const rangeArray = contentRange.split('/');
    const totalReleases = Number(rangeArray[1]);
    return { data, totalReleases };
  } catch (err) {
    return err;
  }
};

export const redeemProduct = async (
  token: string,
  data: any,
  productId: string
): Promise<AxiosResponse<Product>> => {
  try {
    const response = await axiosInstance.patch<Product>(
      `/products/${productId}/redeem`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (e) {
    throw handleApiError(e);
  }
};

export const getBids = async (
  token: string,
  listingId?: string,
  page?: number,
  perPage?: number,
  includeFunctions = true
): Promise<AxiosResponse<Bid[]>> => {
  const params = { listing: listingId, includeFunctions };
  if (page && perPage) {
    params['page'] = page;
    params['per_page'] = perPage;
  }
  try {
    const response = await axiosInstance.get<Bid[]>('/bids', {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return response;
  } catch (e) {
    throw handleApiError(e);
  }
};

export const postBid = async (
  id: string,
  token: string,
  body: any
): Promise<AxiosResponse<Bid>> => {
  try {
    const response = await axiosInstance.post<Bid>(
      `/listings/${id}/bids`,
      body,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response;
  } catch (err) {
    throw handleApiError(err);
  }
};

export const getMeBids = async (
  token: string,
  page?: number,
  perPage?: number,
  includeFunctions = true,
  sortBy = 'newest'
): Promise<MyBids> => {
  const params = { includeFunctions };
  params['sortBy'] = `createdAt:${sortBy === 'newest' ? 'desc' : 'asc'}`;
  if (page) {
    params['page'] = page;
    params['per_page'] = perPage;
  }
  try {
    const response = await axiosInstance.get<MyBid[]>('/bids/active', {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    const { data, headers } = response;
    const contentRange: string = headers['content-range'];
    const rangeArray = contentRange.split('/');
    const total = Number(rangeArray[1]);

    return { data, totalBids: total };
  } catch (e) {
    throw handleApiError(e);
  }
};

export const downloadAssetFile = async (
  token: string,
  productId: string,
  key: string
): Promise<{ presignedUrl: string }> => {
  try {
    const response = await axiosInstance.post<{ presignedUrl: string }>(
      `/products/${productId}/private-link`,
      { key },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (e) {
    throw handleApiError(e);
  }
};

export const getPrivateAssets = async (skuId: string, page?: number,
  perPage?: number): Promise<{ data: FileAsset[]; total: number }> => {
  const params = {};
  try {
    if (page && perPage) {
      params['page'] = page;
      params['per_page'] = perPage;
    }

    const response = await axiosInstance.get<FileAsset[]>(`skus/${skuId}/private-assets`, {
      params,
    })
    const { data, headers } = response;
    const contentRange: string = headers['content-range'];
    const rangeArray = contentRange.split('/');
    const total = Number(rangeArray[1]);

    return { data, total };
  } catch (error) {
    return error.response;
  }
}

export const postCreatePhysicalClaim = async (
  skuId: string,
  physicalTokenId: string,
  token: string,
): Promise<AxiosResponse<Product>> => {
  try {
    const params = {
      sku: skuId,
      physicalTokenId
    };
    const response = await axiosInstance.post<Product>(
      `/products/physical-claims`,
      params,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response;
  } catch (e) {
    throw handleApiError(e);
  }
};
