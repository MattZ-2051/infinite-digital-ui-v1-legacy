import * as Factory from 'factory.ts';
import { User } from 'entities/user';

export const userFactory = Factory.Sync.makeFactory<User>({
  _id: '0',
  id: '0',
  balance: 0,
  availableBalance: 0,
  createdAt: new Date(),
  externalId: '0',
  hederaAccount: '0',
  role: 'none',
  updatedAt: new Date(),
  username: '',
  profilePhotoUrl: '',
  bannerPhotoUrl: '',
  midPhotoUrl: '',
  descriptionIcon: '',
  descriptionHeader: '',
  descriptionBody: '',
  footerPhotoUrl: '',
  tagline: '',
  transactions: [],
});
