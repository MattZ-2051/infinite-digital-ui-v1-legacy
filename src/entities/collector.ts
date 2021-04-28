import { Listing } from './listing';
import { User } from './user';

export interface Collector {
  createdAt: Date;
  listing: Array<Listing>;
  owner: User;
  redeemedStatus: string;
  serialNumber: string;
  sku: string;
  tokenId: string;
  updatedAt: Date;
}
