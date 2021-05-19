export interface Values {
  [key: string]: any;
}

interface Errors {
  [key: string]: boolean;
}

export const errors: Errors = {
  cardNumber: false,
  cvv: false,
  expYear: false,
  expYearPassed: false,
  expMonth: false,
  name: false,
  city: false,
  country: false,
  line1: false,
  district: false,
  postalCode: false,
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
  if (name.includes('billingDetails-')) {
    const keyName = name.split('-')[1];
    if (
      keyName === 'name' ||
      keyName === 'city' ||
      keyName === 'district' ||
      keyName === 'country'
    ) {
      setCardInfo((prevState) => ({
        ...prevState,
        billingDetails: {
          ...prevState?.billingDetails,
          [keyName]: value.replace(/[^a-zA-Z\s]/gi, ''), //value.replace(/[^a-zA-Z]/gi, ''),
          //numbers /[^0-9]/g, ''
        },
      }));
      return;
    }
    if (keyName === 'postalCode') {
      setCardInfo((prevState) => ({
        ...prevState,
        billingDetails: {
          ...prevState?.billingDetails,
          [keyName]: value,
        },
      }));
      return;
    }
    setCardInfo((prevState) => ({
      ...prevState,
      billingDetails: {
        ...prevState?.billingDetails,
        [keyName]: value,
      },
    }));
    return;
  }
  setCardInfo((prevState) => ({
    ...prevState,
    [name]: value,
  }));
  return;
};

export const validate = (ccInfo, setFieldError) => {
  const year = new Date().getFullYear() - 1;

  let error = false;
  const name = ccInfo.billingDetails.name.split(' ');

  if (ccInfo.billingDetails.city.length < 1) {
    setFieldError((prevState) => ({
      ...prevState,
      city: true,
    }));
    error = true;
  } else {
    setFieldError((prevState) => ({
      ...prevState,
      city: false,
    }));
  }
  if (ccInfo.billingDetails.postalCode.length <= 3) {
    setFieldError((prevState) => ({
      ...prevState,
      postalCode: true,
    }));
    error = true;
  } else {
    setFieldError((prevState) => ({
      ...prevState,
      postalCode: false,
    }));
  }

  if (ccInfo.billingDetails.line1.length < 5) {
    setFieldError((prevState) => ({
      ...prevState,
      line1: true,
    }));
    error = true;
  } else {
    setFieldError((prevState) => ({
      ...prevState,
      line1: false,
    }));
  }

  if (ccInfo.cardNumber.length !== 16) {
    setFieldError((prevState) => ({
      ...prevState,
      cardNumber: true,
    }));
    error = true;
  } else {
    setFieldError((prevState) => ({
      ...prevState,
      cardNumber: false,
    }));
  }

  if (
    parseInt(ccInfo.expMonth, 10) > 12 ||
    parseInt(ccInfo.expMonth, 10) <= 0 ||
    ccInfo.expMonth.toString().length > 2 ||
    ccInfo.expMonth.toString().length < 1
  ) {
    setFieldError((prevState) => ({
      ...prevState,
      expMonth: true,
    }));
    error = true;
  } else {
    setFieldError((prevState) => ({
      ...prevState,
      expMonth: false,
    }));
  }

  if (
    ccInfo.expYear.toString().length !== 4 ||
    ccInfo.expYear.toString()[0] === '0'
  ) {
    setFieldError((prevState) => ({
      ...prevState,
      expYear: true,
    }));
    error = true;
  } else {
    setFieldError((prevState) => ({
      ...prevState,
      expYear: false,
    }));
  }

  if (ccInfo.expYear <= year) {
    setFieldError((prevState) => ({
      ...prevState,
      expYearPassed: true,
    }));
    error = true;
  } else {
    setFieldError((prevState) => ({
      ...prevState,
      expYearPassed: false,
    }));
  }

  if (ccInfo.cvv.length !== 3) {
    setFieldError((prevState) => ({
      ...prevState,
      cvv: true,
    }));
    error = true;
  } else {
    setFieldError((prevState) => ({
      ...prevState,
      cvv: false,
    }));
  }

  if (name.length < 2) {
    setFieldError((prevState) => ({
      ...prevState,
      name: true,
    }));
    error = true;
  } else {
    setFieldError((prevState) => ({
      ...prevState,
      name: false,
    }));
  }

  return error;
};

export const state: Values = {
  cardNumber: '',
  cvv: '',
  expMonth: '',
  expYear: '',
  metadata: {
    email: '',
  },
  billingDetails: {
    name: '',
    city: '',
    country: '',
    line1: '',
    line2: '',
    district: '',
    postalCode: '',
  },
};
