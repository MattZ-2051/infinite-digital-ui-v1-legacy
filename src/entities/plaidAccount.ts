export interface IPlaidNumbers {
  ach: {
    account: string;
    account_id: string;
    routing: string;
    wire_routing: string;
  }[];
  eft: {
    account: string;
    account_id: string;
    institution: string;
    branch: string;
  }[];
  international: {
    account_id: string;
    bic: string;
    iban: string;
  }[];
  bacs: {
    account: string;
    account_id: string;
    sort_code: string;
  }[];
}

interface PlaidAccountInternal {
  id: string;
  name: string;
  type: string;
  subtype: string;
  mask: string;
}

export interface PlaidMetadata {
  institution: {
    name: string;
    institution_id: string;
  };
  account_id: string;
  account: PlaidAccountInternal;
  accounts: PlaidAccountInternal[];
}

export interface PlaidInfo {
  metadata: PlaidMetadata;
  ach_item_id: string;
  institution_logo: string;
  institution_primary_color: string;
  institution_url: string;
  ach_numbers: IPlaidNumbers;
}

export enum CircleAchStatusEnum {
  pending = 'pending',
  complete = 'complete',
  failed = 'failed',
}

export interface CircleAchInfo {
  id: string;
  status: CircleAchStatusEnum;
  accountNumber: string;
  bankAddress: {
    bankName: string;
    city: string;
    country: string;
    line1: string;
    line2: string;
    district: string;
  };
}

export interface IPlaidAccount {
  id: string;
  plaidInfo: PlaidInfo;
  circleInfo: CircleAchInfo;
  createdAt: Date;
  updatedAt: Date;
}
