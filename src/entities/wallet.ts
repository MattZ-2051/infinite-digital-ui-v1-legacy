import { Card } from './card';
import { Balance } from './balance';

export interface Wallet {
  cards: Card[];
  balance: Balance;
  kycPending: boolean;
  kycMaxLevel: number;
}
