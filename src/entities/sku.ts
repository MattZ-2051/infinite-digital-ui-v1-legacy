import { Listing } from './listing';
import { User } from './user';

export interface Sku {
  _id: string;
  rarity: 'uncommon' | 'common' | 'rare' | 'epic' | 'legendary';
  name: string;
  description: string;
  display: boolean;
  supplyType: 'variable' | 'fixed'; // TODO: add more supply types
  featured: boolean;
  redeemable: boolean;
  maxSupply?: number;
  imageUrls: string[];
  graphicUrl: string; // Default image (DEPRECATED)
  startDate?: Date;
  endDate?: Date;
  issuerName: string;
  minStartDate: Date;
  maxEndDate?: Date;
  minSkuPrice: number;
  maxBid: number; // The cheapest price a sku can be sold
  minPrice: number;
  minCurrentBid: number;
  circulatingSupply: number;
  totalSupply: number;
  totalSupplyLeft: number;
  totalSkuSupplyLeft: number;
  totalUpcomingSupply: number;
  totalSkuListingSupplyLeft: number;
  totalSkuListingSupply?: number;
  countSkuListings: number;
  countAllSkuListings: number;
  countProductListings: number;
  skuListings: Listing[];
  productListings?: Listing[];
  expiredSkuListings?: Listing[];
  upcomingSkuListings?: Listing[];
  upcomingProductListings?: Listing[];
  activeProductListings?: Listing[];
  soldSkuListings?: Listing[];
  activeSkuListings?: any;
  nftPrivateAssets?: FileAsset[];
  nftPublicAssets: FileAsset[];
  series: {
    _id: string;
    name: string;
    description: string;
    issuerId: string;
    createdAt?: Date;
    updatedAt?: Date;
  };
  category: Category;
  issuer: User;
  createdAt?: Date;
  updatedAt?: Date;
  royaltyFeePercentage: number;
  resaleSellersFeePercentage: number;
  sellerTransactionFeePercentage: number;
}

interface Category {
  _id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SkuWithTotal {
  data: Sku[];
  total: number;
  maxSkusMinPrice?: number;
}

export interface FileAsset {
  bucket: string;
  hash: string;
  height: number;
  key: string;
  size: number;
  type: string;
  url: string;
  width: number;
  previewUrl: string;
}
