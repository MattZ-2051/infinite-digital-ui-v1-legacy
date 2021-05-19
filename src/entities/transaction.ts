import { User } from './user';

export interface ITransaction {
  _id: string;
  owner: User;
  type:
    | 'deposit'
    | 'transfer'
    | 'mint'
    | 'topup'
    | 'purchase'
    | 'payment'
    | 'redeem'
    | 'sale'
    | 'nft_transfer'
    | 'withdrawal'
    | 'nft_transfer_manual'
    | 'royalty_fee'
    | 'nft_mint';
  transactionData: TransactionData;
  createdAt: Date;
  updatedAt: Date;
  status: 'success' | 'error' | 'pending';
}

interface Sku {
  _id: string;
  name: string;
}

interface Product {
  serialNumber: string;
  _id: string;
}

export interface TransactionData {
  product: Product[];
  sku: Sku[];
  listing: string;
  amount: number;
  bid: string;
  hederaTransaction?: HederaTransaction;
  circleReceipt?: CircleReceipt;
  buyer: {
    _id: string;
    username: string;
  };
  seller: {
    _id: string;
    username: string;
  };
  ownerAvailableBalance: number;
  cost: Cost;
  explorerLink: string;
  status: string;
  service: string;
  deposit?: {
    id: string;
    type: string;
    amount: string;
  };
  transactionHash: string | undefined;
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
  royaltyFee?: number;
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