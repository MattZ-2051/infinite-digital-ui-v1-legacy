export interface Sku {
  _id: string;
  rarity: 'uncommon' | 'common' | 'rare' | 'epic' | 'legendary';
  name: string;
  description: string;
  display: boolean;
  supplyType: 'variable'; // TODO: add more supply types
  featured: boolean;
  redeemable: boolean;
  // maxSupply should not be used in the UI anymore
  // maxSupply: number | string;
  imageUrls: string[];
  graphicUrl: string; // Default image
  startDate?: Date;
  endDate?: Date;
  issuerName: string;
  minStartDate?: Date;
  maxEndDate?: Date;
  minSkuPrice: number;
  maxBid: number; // The cheapest price a sku can be sold
  minPrice: number;
  minCurrentBid: number;
  circulatingSupply: number;
  totalSupply: number;
  totalSupplyLeft: number;
  totalSkuSupplyLeft: number;
  totalSupplyUpcoming: number;
  totalSkuListingSuppyLeft: number;
  countSkuListings: number;
  countAllSkuListings: number;
  countProductListings: number;
  series: {
    _id: string;
    name: string;
    description: string;
    issuerId: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  category: {
    _id: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  issuer: {
    _id: string;
    balance: number;
    role: string;
    hederaAccount: string;
    externalId: string;
    username: string;
    email: string;
    updatedAt?: Date;
    createdAt?: Date;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
