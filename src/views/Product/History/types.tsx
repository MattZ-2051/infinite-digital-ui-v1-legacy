export type HistoryStatus =
  | 'not-for-sale'
  | 'buy-now'
  | 'create-sale'
  | 'active-sale'
  | 'upcoming'
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
  | '';

export type tabSelect = 'history' | 'auction' | 'owner_access';