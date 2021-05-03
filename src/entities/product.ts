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
}

export interface ProductWithFunctions {
  _id: string;
  redeemedStatus: string;
  tokenId: string;
  owner: User;
  listing: Listing;
  sku: Sku;
  serialNumber: string;
  activeProductListing: Listing[];
  expiredProductListing: Listing[];
  soldProductListing: Listing[];
  upcomingProductListing: Listing[];
}
