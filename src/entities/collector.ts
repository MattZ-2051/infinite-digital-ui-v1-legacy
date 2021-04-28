import { Listing } from './listing';
import { User } from './user';

export interface Collector {
  createdAt: Date;
  listing: Listing[];
  owner: User;
  redeemedStatus: string;
  serialNumber: string;
  sku: string;
  tokenId: string;
  updatedAt: Date;
}
