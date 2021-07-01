export interface IUser {
  showNotifyMe: boolean;
  role: string;
  id: string;
  username: string;
  hederaAccount: string;
  externalId: string;
}

export interface IAddFundsData {
  email: string;
  amount: number;
}
