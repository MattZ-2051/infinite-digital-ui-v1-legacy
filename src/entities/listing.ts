export interface Listing {
  _id: string;
  canceled: boolean;
  type: 'sku' | 'product';
  issuer: string;
  sku: string;
  price: number;
  saleType: string;
  supply: 10;
  minBid: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  supplyLeft: number;
  status: string;
}
