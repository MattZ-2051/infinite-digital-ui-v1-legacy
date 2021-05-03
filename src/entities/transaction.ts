import { User } from './user';

export interface ITransaction {
  _id: string;
  owner: User;
  type:
    | 'mint'
    | 'topup'
    | 'purchase'
    | 'payment'
    | 'redeem'
    | 'sale'
    | 'transfer'
    | 'withdrawal';
  transactionData: TransactionData;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionData {
  product: string;
  sku: string;
  listing: string;
  amount: number;
  bid: string;
  hederaTransaction?: HederaTransaction;
  circleReceipt?: CircleReceipt;
  buyer: string;
  seller: string;
  ownerAvailableBalance: number;
}

export interface HederaTransaction {
  transactionHash: string;
  transactionId: string;
  explorerLink: string;
  from: string;
  to: string;
  tokenId: string;
  status: string;
  ownerAvailableBalance: number;
}

export interface CircleReceipt {
  id: string;
  type: string;
  merchantId: string;
  merchantWalletId: string;
  source: {
    id: string;
    type: string;
  };
  destination: {
    id: string;
    type: string;
  };
  description: string;
  amount: {
    amount: number;
    currency: string;
  };
  status: string;
  refunds: any[];
  createDate: Date;
  updateDate: Date;
  metadata: {
    phoneNumber: string;
    email: string;
  };
}
