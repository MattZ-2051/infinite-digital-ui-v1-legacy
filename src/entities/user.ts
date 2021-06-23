import { ITransaction } from './transaction';
export interface User {
  _id: string;
  id: string;
  balance: number;
  availableBalance: number;
  createdAt: Date;
  externalId: string;
  hederaAccount: string;
  role: string;
  updatedAt: Date;
  username: string;
  profilePhotoUrl: string;
  bannerPhotoUrl: string;
  midPhotoUrl: string;
  descriptionIcon: string;
  descriptionHeader: string;
  descriptionBody: string;
  footerPhotoUrl: string;
  tagline: string;
  transactions?: ITransaction[];
  errorMessage?: string;
  showNotifyMe?: boolean;
  auctionBidIncrement?: string;
  initialBuyersFeePercentage?: string;
}
