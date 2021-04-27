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
  transactions?: ITransaction[];
  errorMessage?: string;
}
