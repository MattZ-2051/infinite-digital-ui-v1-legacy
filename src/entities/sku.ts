export interface Sku {
  _id: string;
  rarity: 'uncommon' | 'common' | 'rare' | 'epic' | 'legendary';
  name: string;
  description: string;
  display: boolean;
  supplyType: 'variable'; // TODO: add more supply types
  featured: boolean;
  redeemable: boolean;
  maxSupply: number | string;
  imageUrls: string[];
  graphicUrl: string; // Default image
  startDate?: Date;
  endDate?: Date;
  series: string; // id
  category: string; // id
  issuer: string; // id
  createdAt?: Date;
  updatedAt?: Date;
}

/*
 * This is the extended sku object that is returned when the Sku object is called
 * with functions
 */
// NOTE: Repeats functionality of interface below
export interface SkuWithFunctions extends Sku {
  minStartDate?: Date;
  maxEndDate?: Date;
  minSkuPrice: number;
  minCurrentBid: number;
  circulatingSupply: number;
  totalSupplyLeft: number;
  totalSupplyUpcoming: number;
  maxBid: number;
  minPrice: number;
  totalSupply: number;
}

export interface SkuWithFunctionsPopulated
  extends Omit<SkuWithFunctions, 'category' | 'series' | 'issuer'> {
  upcomingListingIds?: string[];
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
}
