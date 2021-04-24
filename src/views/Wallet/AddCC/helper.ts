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
  expMonth: false,
  name: false,
  city: false,
  country: false,
  line1: false,
  district: false,
  postalCode: false,
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
    parseInt(ccInfo.expMonth, 10) < 0 ||
    ccInfo.expMonth.length > 2
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

  console.log(parseInt(ccInfo.expYear, 10));
  if (
    parseInt(ccInfo.expYear, 10) <= year ||
    ccInfo.expYear.toString().length !== 4
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
  expMonth: 0,
  expYear: 0,
  metadata: {
    email: '',
    phoneNumber: '+14155555555',
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
