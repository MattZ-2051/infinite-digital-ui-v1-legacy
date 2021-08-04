import { User } from './user';
import { Card } from './card';
import { Sku } from 'entities/sku';

export type TransactionType =
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
  | 'nft_mint'
  | 'bid'
  | 'claim'
  | 'nft_redeem'
  | 'nft_claim_giveaway';

export type TransactionStatus = 'success' | 'error' | 'pending';
export type DepositType = 'cc' | string;

export interface ITransaction {
  _id: string;
  owner: User;
  type: TransactionType;
  transactionData: TransactionData;
  createdAt: Date;
  updatedAt: Date;
  status: TransactionStatus;
}

interface Product {
  serialNumber: string;
  _id: string;
}

export interface TransactionData {
  product: any;
  sku: Sku;
  listing: string;
  endDate: Date;
  amount: number;
  bid: string;
  saleType: string;
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
  cost: Cost;
  explorerLink: string;
  status: string;
  service: string;
  deposit?: {
    id: string;
    type: DepositType;
    amount: string;
    amountRate?: string;
    amountRated?: string;
    amountUnrated?: string;
    hederaTransaction?: HederaTransaction;
    hederaTransactionLink?: string;
    card?: Card;
    coinbasePayment?: { amount: string; currency: string };
    transactionHash: string | undefined;
  };
  withdraw?: {
    amount: string;
    institution_id: string;
    institution_name: string;
    ach_number: string;
  };
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
  rate: number;
  hash: string;
  id: string;
  status: string;
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
