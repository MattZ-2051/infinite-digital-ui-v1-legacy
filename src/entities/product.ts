import { Listing } from './listing';
import { SkuWithFunctions, SkuWithFunctionsPopulated } from './sku';
import { User } from './user';

export interface Product {
  _id: string;
  redeemedStatus: string;
  tokenId: string;
  owner: User;
  listing: Listing;
  sku: SkuWithFunctions;
  serialNumber: string;
}

export interface ProductWithFunctions {
  _id: string;
  redeemedStatus: string;
  tokenId: string;
  owner: User;
  listing: Listing;
  sku: SkuWithFunctionsPopulated;
  serialNumber: string;
}
