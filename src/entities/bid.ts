import { Listing } from './listing';
import { User } from './user';
import { Sku } from './sku';

export interface Bid {
  _id: string;
  bidAmt: number;
  createdAt: Date;
  updatedAt: Date;
  listing: Listing;
  sku: Sku;
  owner: User;
  status: string;
}
