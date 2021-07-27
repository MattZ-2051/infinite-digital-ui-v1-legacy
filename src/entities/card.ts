export type CardStatus = 'complete' | 'pending' | 'failed';

export interface Card {
  id: string;
  status: CardStatus;
  last4: string;
  network: string;
  expYear: number;
  expMonth: number;
  metadata: {
    phoneNumber: string;
    email: string;
  };
  fingerprint: string;
}
