export interface IUser {
  showNotifyMe: boolean;
  role: string;
  _id: string;
  username: string;
  hederaAccount: string;
  externalId: string;
}

export interface IAddFundsData {
  email: string;
  amount: number;
}

export interface IPasswordResetResponse {
  status: number;
  statusText: string;
  data: string;
}
