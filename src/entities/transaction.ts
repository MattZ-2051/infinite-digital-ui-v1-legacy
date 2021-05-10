import { User } from './user';

export interface ITransaction {
  _id: string;
  owner: User;
  type:
    | 'deposit'
    | 'transfer'
    | 'mint'
    | 'nft_mint'
    | 'topup'
    | 'purchase'
    | 'payment'
    | 'redeem'
    | 'sale'
    | 'nft_transfer'
    | 'withdrawal';
  transactionData: TransactionData;
  createdAt: Date;
  updatedAt: Date;
  status: 'success' | 'error' | 'pending';
}

interface Sku {
  id: string;
  name: string;
}

interface Product {
  serialNumber: string;
  id: string;
}

export interface TransactionData {
  product: Product[];
  sku: Sku[];
  listing: string;
  amount: number;
  bid: string;
  hederaTransaction?: HederaTransaction;
  circleReceipt?: CircleReceipt;
  buyer: string;
  seller: string;
  ownerAvailableBalance: number;
  cost: Cost;
  explorerLink: string;
  status: string;
  service: string;
}

interface Cost {
  finalPayout: number;
  initialBuyersFee: number;
  initialBuyersFeePercentage: number;
  initialSellersFee: number;
  initialSellersFeePercentage: number;
  resale: boolean;
  resaleBuyersFeePercentage: number;
  resaleSellersFeePercentage: number;
  serviceEarnings: number;
  totalCost: number;
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
