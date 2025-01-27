import { Listing } from './listing';
import { Sku } from './sku';
import { User } from './user';

export interface Product {
  _id: string;
  redeemedStatus: string;
  tokenId: string;
  owner: User;
  listing: Listing;
  sku: Sku;
  serialNumber: string;
  physicalTokenId?: string;
}

export interface ProductWithFunctions {
  _id: string;
  redeemedStatus: 'NA' | 'pending' | 'redeemed';
  tokenId: string;
  owner: User;
  listing: Listing;
  sku: Sku;
  serialNumber: string;
  activeProductListings: Listing[];
  expiredProductListings: Listing[];
  explorerLink?: string;
  soldProductListings: Listing[];
  upcomingProductListings: Listing[];
  totalSupply: number;
  circulatingSupply?: number;
  minSkuPrice: number;
  resaleBuyersFeePercentage: number;
  resaleSellersFeePercentage: number;
  royaltyFeePercentage: number;
  totalSupplyLeft: number;
  resale: boolean;
  initialBuyersFeePercentage: number;
  initialSellersFeePercentage: number;
}
