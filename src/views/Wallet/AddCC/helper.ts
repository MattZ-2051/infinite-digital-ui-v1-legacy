import {
  IBilling,
  IBillingValidation,
  validate as validateBilling,
} from 'components/BillingForm';

export interface CardInfo {
  cardNumber: string;
  cvv: string;
  expYear: string;
  expMonth: string;
  billingDetails: IBilling;
}

export interface CardErrors {
  cardNumber: boolean;
  cvv: boolean;
  expYear: boolean;
  expYearPassed: boolean;
  expMonth: boolean;
  billingDetails: IBillingValidation;
}

export const initialErrorState: CardErrors = {
  cardNumber: false,
  cvv: false,
  expYear: false,
  expYearPassed: false,
  expMonth: false,
  billingDetails: {
    name: false,
    city: false,
    country: false,
    district: false,
    line1: false,
    line2: false,
    postalCode: false,
  },
};

export const handleChange = (e, setCardInfo) => {
  const { name, value } = e.target;
  if (name.includes('num-') || name === 'cardNumber' || name === 'cvv') {
    let keyName = name.split('-')[1];
    if (!keyName) {
      keyName = name;
    }
    setCardInfo((prevState) => ({
      ...prevState,
      [keyName]: value.replace(/[^0-9]/g, ''),
    }));
    return;
  }
  setCardInfo((prevState) => ({
    ...prevState,
    // ToDo: Prevent using this...
    [name]: value,
  }));
  return;
};

export function validate(ccInfo): [CardErrors, boolean] {
  const errors = {
    cardNumber: false,
    cvv: false,
    expYear: false,
    expYearPassed: false,
    expMonth: false,
  };

  if (ccInfo.cardNumber.length !== 16) {
    errors.cardNumber = true;
  }

  if (
    parseInt(ccInfo.expMonth, 10) > 12 ||
    parseInt(ccInfo.expMonth, 10) <= 0 ||
    ccInfo.expMonth.length > 2 ||
    ccInfo.expMonth.length < 1
  ) {
    errors.expMonth = true;
  }

  if (ccInfo.expYear.length !== 4 || ccInfo.expYear[0] === '0') {
    errors.expYear = true;
  }

  const year = new Date().getFullYear() - 1;
  if (parseInt(ccInfo.expYear) <= year) {
    errors.expYearPassed = true;
  }

  if (ccInfo.cvv.length !== 3) {
    errors.cvv = true;
  }
  const billingErrors = validateBilling(ccInfo.billingDetails);
  const allErrors: CardErrors = { ...errors, billingDetails: billingErrors };
  return [
    allErrors,
    Object.values(errors).some(Boolean) ||
      Object.values(billingErrors).some(Boolean),
  ];
}

export const initialState: CardInfo = {
  cardNumber: '',
  cvv: '',
  expMonth: '',
  expYear: '',
  billingDetails: {
    name: '',
    city: '',
    country: null,
    district: null,
    line1: '',
    line2: '',
    postalCode: '',
  },
};
