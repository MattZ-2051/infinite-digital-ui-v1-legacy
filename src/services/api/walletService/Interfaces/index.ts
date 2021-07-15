export interface IRawHbarTransaction {
  consensusAt: Date;
  entity: null;
  fee: number;
  hash: string;
  id: string;
  maxFee: number;
  memo: string;
  node: string;
  operator: string;
  status: string;
  tokenTransfers: {
    account: string;
    amount: number;
    token: string;
  }[];
  totalTransferAmount: number;
  transfers: [];
  type: string;
  validDuration: number;
  validStartAt: Date;
  value: number;
}

export interface INewHbarTransactions {
  depositStatus: 'pending' | 'success' | 'error';
  rate: number;
  hbarAmount: string;
  usdAmount: string;
  rawTransaction: IRawHbarTransaction;
}

export interface IHbarDeposits {
  newTransactions: INewHbarTransactions[];
  totalHbarAmount: number;
  totalUsdAmount: string;
}

export interface IWalletExplorerAddress {
  address: string;
  explorerLink: string;
}
