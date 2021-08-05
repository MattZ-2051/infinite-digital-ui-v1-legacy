import {Wallet} from "entities/wallet";

export interface UsersState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: null | any;
  user: any;
  userCollection: any;
  userCards: Wallet;
}

interface Values {
  [key: string]: any;
}

export interface INewCCPayloadParams {
  token: string;
  data: Values;
}

export interface IAddFundsPayloadParams {
  token: string;
  cardId: string;
  data: Values;
}

export interface IUsernamePayloadParams {
  token: string;
  userId: string;
  username: string;
}
