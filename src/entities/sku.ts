export interface Sku {
  _id: string;
  rarity: string;
  name: string;
  description: string;
  maxSupply: number | string;
  redeemable: boolean;
  issuer: string; // Brand
  series: {
    name: string;
  };
  graphicUrl: string; // Default image
  createdAt: Date;
  updatedAt: Date;
}

/*
 * This is the extended sku object that is returned when the Sku object is called
 * with functions
 */
export interface SkuWithFunctions extends Sku {
  series: any;
  category: any;
  minStartDate: Date;
  maxEndDate: Date;
  minSkuPrice: number;
  minCurrentBid: number;
  totalSupply: number;
  totalUpcomingSupply: number;
  circulatingSupply: number;
  totalSupplyLeft: number;
  totalSupplyUpcoming: number;
  maxBid: number;
  minPrice: number;
}
