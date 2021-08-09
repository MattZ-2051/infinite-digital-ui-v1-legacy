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

export interface IAuth0UserInfoResponse {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  middle_name: string;
  nickname: string;
  preferred_username: string;
  profile: string;
  picture: string;
  website: string;
  email: string;
  email_verified: boolean,
  gender: string;
  birthdate: string;
  zoneinfo: string;
  locale: string;
  phone_number: string;
  phone_number_verified: boolean;
  address: {
    country: string;
  };
  updated_at: string;
}
