import { Listing } from './listing';
import { User } from './user';

export interface Collector {
  createdAt: Date;
  activeProductListing?: Listing;
  upcomingProductListing?: Listing;
  listing: Listing;
  listings: Listing[];
  highestBid: HighestBid;
  owner: User;
  redeemedStatus: string;
  serialNumber: string;
  sku: string;
  tokenId: string;
  updatedAt: Date;
  _id: string;
}

interface HighestBid {
  bidAmt: number;
  canceled: boolean;
  listing: string;
  owner: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}
