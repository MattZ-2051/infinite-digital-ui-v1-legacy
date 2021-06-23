import { User } from './user';
export interface Listing {
  _id: string;
  canceled: boolean;
  type: 'sku' | 'product';
  sku?: string;
  product?: string;
  issuer: User;
  price: number;
  saleType: 'auction' | 'fixed';
  supply: number;
  minBid: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  supplyLeft: number;
  auctionBidIncrement: number;
  status: 'upcoming' | 'expired' | 'active' | 'sold';
}
