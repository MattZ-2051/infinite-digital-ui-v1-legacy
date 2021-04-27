import * as Factory from 'factory.ts';
import { Sku, SkuWithFunctionsPopulated } from 'entities/sku';

export const skuFactory = Factory.Sync.makeFactory<Sku>({
  _id: '000000000000000000000000',
  rarity: 'uncommon',
  name: 'Loading...',
  description: 'Loading...',
  display: false,
  supplyType: 'variable',
  featured: false,
  redeemable: false,
  maxSupply: 0,
  imageUrls: [],
  graphicUrl: '',
  startDate: undefined,
  endDate: undefined,
  series: '000000000000000000000000',
  category: '000000000000000000000000',
  issuer: '000000000000000000000000',
  createdAt: undefined,
  updatedAt: undefined,
});

export const skuWithFunctionsPopulatedFactory = Factory.Sync.makeFactory<SkuWithFunctionsPopulated>(
  {
    ...skuFactory.build(),
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
    upcomingListingIds: [],
    circulatingSupply: 0,
    totalSupplyLeft: 0,
    totalSupplyUpcoming: 0,
    maxBid: 0,
    minPrice: 0,
    totalSupply: 0,
  }
);
