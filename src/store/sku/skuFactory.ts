import * as Factory from 'factory.ts';
import { Sku } from 'entities/sku';

export const skuFactory = Factory.Sync.makeFactory<Sku>({
  _id: '000000000000000000000000',
  rarity: 'uncommon',
  name: 'Loading...',
  description: 'Loading...',
  display: false,
  supplyType: 'variable',
  featured: false,
  redeemable: false,
  // maxSupply: 0, deprecated
  imageUrls: [],
  graphicUrl: '',
  startDate: undefined,
  endDate: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  skuListings: [],
  series: {
    _id: '000000000000000000000000',
    name: 'Loading...',
    description: 'Loading...',
    issuerId: '000000000000000000000000',
    createdAt: undefined,
    updatedAt: undefined,
  },
  category: {
    _id: '000000000000000000000000',
    name: 'Loading...',
    createdAt: undefined,
    updatedAt: undefined,
  },
  issuer: {
    _id: '000000000000000000000000',
    balance: 0,
    role: 'N/A',
    hederaAccount: '0',
    externalId: '000000000000000000000000',
    username: 'Loading...',
    email: 'Loading...',
    updatedAt: undefined,
    createdAt: undefined,
  },
  minStartDate: undefined,
  maxEndDate: undefined,
  minSkuPrice: 0,
  minCurrentBid: 0,
  circulatingSupply: 0,
  totalSupplyLeft: 0,
  totalSupplyUpcoming: 0,
  maxBid: 0,
  minPrice: 0,
  issuerName: '',
  totalSkuListingSupplyLeft: 0,
  countSkuListings: 0,
  countAllSkuListings: 0,
  countProductListings: 0,
  totalSupply: 0,
  totalSkuSupplyLeft: 0,
  royaltyFeePercentage: 0,
});
