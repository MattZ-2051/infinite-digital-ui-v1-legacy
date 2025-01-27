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
  maxSupply: 0,
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
    id: '000000000000000000000000',
    availableBalance: 0,
    balance: 0,
    profilePhotoUrl: '',
    bannerPhotoUrl: '',
    midPhotoUrl: '',
    descriptionIcon: '',
    descriptionHeader: '',
    descriptionBody: '',
    footerPhotoUrl: '',
    tagline: '',
    role: 'N/A',
    hederaAccount: '0',
    externalId: '000000000000000000000000',
    username: 'Loading...',
    updatedAt: new Date(),
    createdAt: new Date(),
  },
  minStartDate: new Date(),
  maxEndDate: undefined,
  minSkuPrice: 0,
  minCurrentBid: 0,
  circulatingSupply: 0,
  totalSupplyLeft: 0,
  activeProductListings: [],
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
  resaleSellersFeePercentage: 0,
  sellerTransactionFeePercentage: 0,
  sellerTransactionFeePercentageSecondary: 0,
  totalUpcomingSupply: 0,
  nftPublicAssets: [],
  physicalProduct: {
    image: '',
    skuId: '123',
    name: 'nike',
    _id: '123444',
  },
});
