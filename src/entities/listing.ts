export interface Listing {
  _id: string;
  canceled: boolean;
  type: 'sku' | 'product';
  sku?: string;
  product?: string;
  issuer: string;
  price: number;
  saleType: 'auction' | 'fixed';
  supply: number;
  minBid: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  supplyLeft: number;
  status: string;
}
