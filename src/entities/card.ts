
export enum VerificationStatusEnum {
  pending = 'pending',
  complete = 'complete',
  failed = 'failed',
}

export enum CVVVerificationStatus {
  pending = 'pending', // Check in progress
  pass = 'pass', // Value matched
  fail = 'fail', // Value not matched
  unavailable = 'unavailable', // Card issuer does not support CVV check
  not_requested = 'not_requested', // Check not requested (only for payment request - CVV is always attempted for card creation)
}

export enum AVSCode {
  A = 'A', //	Partial match	Street address matches, but both 5-digit and 9-digit ZIP Code do not match.
  B = 'B', //	Partial match	Street Address Match for International Transaction. Postal Code not verified due to incompatible formats.
  C = 'C', //	Verification unavailable	Street Address and Postal Code not verified for International Transaction due to incompatible formats.
  D = 'D', //	Full Match (International Transaction)	Street Address and Postal Code match for International Transaction.
  E = 'E', //	Data invalid	AVS data is invalid or AVS is not allowed for this card type.
  F = 'F', //	Full Match (UK only)	Street address and postal code match. Applies to U.K. only.
  G = 'G', //	Verification unavailable	Non-US Issuer does not participate.
  I = 'I', //	Verification unavailable	Address information not verified for international transaction.
  K = 'K', //	Address mismatch	Card member’s name matches but billing address and billing postal code do not match.
  L = 'L', //	Partial match	Card member’s name and billing postal code match, but billing address does not match.
  M = 'M', //	Full match (International Transaction)	Street Address match for international transaction. Address and Postal Code match.
  N = 'N', //	No match	No match for address or ZIP/postal code.
  O = 'O', //	Partial match	Card member’s name and billing address match, but billing postal code does not match.
  P = 'P', //	Partial match (International Transaction)	Postal code match. Acquirer sent both postal code and street address, but street address not verified due to incompatible formats.
  R = 'R', //	Verification unavailable	Issuer system unavailable, retry.
  S = 'S', //	Verification unavailable	AVS not supported
  U = 'U', //	Verification unavailable	Address unavailable
  W = 'W', //	Partial match	Postal code matches but address does not match
  X = 'X', //	Full match	Street address and postal code match
  Y = 'Y', //	Full match	Street address and postal code match
  Z = 'Z', //	Partial match	5 digit zip code match only
  unavailable = '-', //	Verification unavailable	An error occurred attempting AVS check
}

export interface Card {
  id: string;
  status: VerificationStatusEnum;
  last4: string;
  network: string;
  expYear: number;
  expMonth: number;
  metadata: {
    phoneNumber: string;
    email: string;
  };
  fingerprint: string;
  verification: {
    avs: AVSCode;
    cvv: CVVVerificationStatus;
  };
}
