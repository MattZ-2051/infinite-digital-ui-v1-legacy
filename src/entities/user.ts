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

export interface ExtendedBalanceInfo {
  bidsLock: string;
  purchasesLock: string;
  salesLock: string;
  depositsLock: string;
  withdrawalsLock: string;
  ccNoWithdrawablesLock: string;
  ccWithdrawablesLock: string;
  lockedPositiveBalance: string;
  lockedNegativeBalance: string;
  lockedBalance: string;
  totalBalance: string;
  // royaltyFeesLock: string;
  circleBalance: string;
  transactionAvailableBalance: string;
}

export interface ExtendedBalanceInfo {
  bidsLock: string;
  purchasesLock: string;
  salesLock: string;
  depositsLock: string;
  withdrawalsLock: string;
  ccNoWithdrawablesLock: string;
  ccWithdrawablesLock: string;
  lockedPositiveBalance: string;
  lockedNegativeBalance: string;
  lockedBalance: string;
  totalBalance: string;
  // royaltyFeesLock: string;
  circleBalance: string;
  transactionAvailableBalance: string;
}

export interface ExtendedBalanceInfo {
  bidsLock: string;
  purchasesLock: string;
  salesLock: string;
  depositsLock: string;
  withdrawalsLock: string;
  ccNoWithdrawablesLock: string;
  ccWithdrawablesLock: string;
  lockedPositiveBalance: string;
  lockedNegativeBalance: string;
  lockedBalance: string;
  totalBalance: string;
  // royaltyFeesLock: string;
  circleBalance: string;
  transactionAvailableBalance: string;
}
