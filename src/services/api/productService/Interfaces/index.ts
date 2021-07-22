import { ITransaction } from 'entities/transaction';
import { Sku } from 'entities/sku';
import { User } from 'entities/user';
import { Listing } from 'entities/listing';
import { ProductWithFunctions, Product } from 'entities/product';
import { Collector } from 'entities/collector';

export interface IProductTxHistory {
  data: ITransaction[];
  totalTransactions: number;
}

export interface SkuReleasesOwnedByUser {
  data: Sku[];
  totalReleases: number;
}

export interface MyBids {
  data: MyBid[];
  totalBids: number;
}

export interface IProductsOwnedByUser {
  data: ProductWithFunctions[];
  totalProducts: number;
}

export interface ProductCollectors {
  data: Collector[];
  totalCollectors: number;
}

export interface MyBid {
  _id: string;
  bidAmt: number;
  createdAt: Date;
  updatedAt: Date;
  listing: MyListing;
  sku: Sku;
  owner: User;
}

type AuxHighestbid = Omit<MyBid, 'listing' | 'owner'>;

export interface Highestbid extends AuxHighestbid {
  listing: string;
  owner: string;
}

type AuxListing = Omit<Listing, 'product' | 'issuer'>;

export interface MyListing extends AuxListing {
  product: Product;
  highestBid: Highestbid;
  issuer: User;
}
