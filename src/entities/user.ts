import { ITransaction } from './transaction';
export interface User {
  _id: string;
  id: string;
  balance: number;
  availableBalance: number;
  createdAt: Date;
  email: string;
  externalId: string;
  hederaAccount: string;
  role: string;
  updatedAt: string;
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
}
