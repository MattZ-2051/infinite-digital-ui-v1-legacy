export type HistoryStatus =
  | 'not-for-sale'
  | 'buy-now'
  | 'create-sale'
  | 'active-sale'
  | 'upcoming-sale'
  | 'upcoming-auction'
  | 'owner'
  | 'active-auction'
  | '';

export type AuctionStatus =
  | 'active-auction-no-bid-owner'
  | 'active-auction-no-bid-user'
  | 'upcoming-auction-owner'
  | 'upcoming-auction-user'
  | 'active-auction-bid-owner'
  | 'active-auction-bid-user'
  | 'processing-auction'
  | '';

export type tabSelect = 'history' | 'auction' | 'owner_access';

export type Modes = 'completed' | 'hasFunds' | 'noFunds' | 'processing' | '';
