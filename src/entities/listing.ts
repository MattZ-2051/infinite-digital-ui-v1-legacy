import { User } from './user';
import { Bid } from 'entities/bid';
export interface Listing {
  _id: string;
  canceled: boolean;
  type: 'sku' | 'product';
  sku?: string;
  product?: string;
  issuer: User;
  price: number;
  saleType: 'auction' | 'fixed' | 'giveaway';
  supply: number;
  minBid: number;
  bids: Bid[];
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  supplyLeft: number;
  auctionBidIncrement: number;
  status: 'upcoming' | 'expired' | 'active' | 'sold';
}
