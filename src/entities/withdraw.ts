export interface IWithdraw {
  id: string;
  owner: string;
  status: string;
  transactionData: {
    withdraw: Withdraw;
  };
  type: string;
}

interface Withdraw {
  ach_number: string;
  amount: string;
  institution_id: string;
  institution_name: string;
  payout: string;
}
