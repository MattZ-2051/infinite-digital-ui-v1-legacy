import React from 'react';
import styled from 'styled-components/macro';
import { useState, useEffect } from 'react';
import circleIcon from 'assets/img/icons/circle-icon-deposit.png';
import exitIcon from 'assets/img/icons/exit-icon.png';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { useAppSelector } from 'hooks/store';
import { createNewUserCC } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';

const S: any = {};

interface IValues {
  [key: string]: any;
}

interface IErrors {
  [key: string]: string;
}

const AddCC = () => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);
  const [error, setError] = useState<boolean | undefined>(false);
  const userEmail = useAppSelector((state) => state.session.user.email);
  const { getAccessTokenSilently } = useAuth0();

  const state: IValues = {
    cardNumber: '',
    cvv: '',
    expMonth: 0,
    expYear: 0,
    metadata: {
      email: userEmail,
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

  const [cardInfo, setCardInfo] = useState<IValues | undefined>(state);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('billingDetails')) {
      const keyName = name.split('-')[1];
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

  const handleSubmit = async () => {
    if (cardInfo === undefined) return;
    const userToken = await getAccessTokenSilently();
    cardInfo.expMonth = parseInt(cardInfo?.expMonth);
    cardInfo.expYear = parseInt(cardInfo?.expYear);
    createNewUserCC(userToken, cardInfo);
  };

  return (
    <S.Container>
      <S.ContentContainer>
        <div style={{ paddingBottom: '10px' }}>
          <S.Row
            style={{ borderBottom: '2px solid black', paddingBottom: '16px' }}
          >
            <S.HeaderDiv>
              <img src={circleIcon} alt="" />
              <S.HeaderText>Circle Payments</S.HeaderText>
            </S.HeaderDiv>
            <img src={exitIcon} alt="" />
          </S.Row>
        </div>
        <S.Row>
          <span
            style={{ color: '#7d7d7d', fontSize: '16px', paddingTop: '10px' }}
          >
            Enter the card details below
          </span>
        </S.Row>
        <S.Row>
          <S.FormInput
            label="Credit Card Number"
            name="cardNumber"
            fullWidth
            required
            error={error}
            color="secondary"
            onChange={handleChange}
            value={cardInfo?.cardNumber}
          />
        </S.Row>
        <S.Row>
          <S.FormInput
            id="standard-basic"
            label="Exp Month"
            size="medium"
            error={error}
            required
            name="expMonth"
            type="number"
            style={{ paddingRight: '10px' }}
            onChange={handleChange}
            value={cardInfo?.expMonth}
          />
          <S.FormInput
            id="standard-basic"
            label="Exp Year"
            size="medium"
            error={error}
            required
            name="expYear"
            type="number"
            style={{ paddingRight: '10px' }}
            onChange={handleChange}
            value={cardInfo?.expYear}
          />
          <S.FormInput
            id="standard-basic"
            label="CVV"
            size="medium"
            required
            error={error}
            name="cvv"
            onChange={handleChange}
            value={cardInfo?.cvv}
          />
        </S.Row>
        <S.Row>
          <S.Dropdown
            onClick={() => setIsOpen(!isOpen)}
            style={{
              color: `${isOpen ? 'black' : '#7d7d7d'}`,
              borderBottom: `${
                isOpen ? '2px solid black' : '2px solid #ebebeb'
              }`,
            }}
          >
            Billing Details
            {isOpen ? (
              <S.ArrowUp className="arrow" />
            ) : (
              <S.ArrowDown className="arrow" />
            )}
          </S.Dropdown>
        </S.Row>
        {isOpen ? (
          <div style={{ paddingBottom: '40px' }}>
            <S.Row>
              <S.FormInput
                id="standard-basic"
                label="Cardholder name"
                size="medium"
                fullWidth
                required
                error={error}
                name="billingDetails-name"
                onChange={handleChange}
                value={cardInfo?.billingDetails.name}
              />
            </S.Row>
            <S.Row>
              <S.FormInput
                id="standard-basic"
                label="Address Line 1"
                size="medium"
                fullWidth
                required
                error={error}
                onChange={handleChange}
                name="billingDetails-line1"
                value={cardInfo?.billingDetails.line1}
              />
            </S.Row>
            <S.Row>
              <S.FormInput
                id="standard-basic"
                label="Address Line 2"
                size="medium"
                fullWidth
                error={error}
                name="billingDetails-line2"
                onChange={handleChange}
                value={cardInfo?.billingDetails.line2}
              />
            </S.Row>
            <S.Row>
              <S.FormInput
                id="standard-basic"
                label="Postal Code"
                size="medium"
                fullWidth
                required
                error={error}
                onChange={handleChange}
                name="billingDetails-postalCode"
                value={cardInfo?.billingDetails.postalCode}
              />
            </S.Row>
            <S.Row>
              <S.FormInput
                id="standard-basic"
                label="City"
                size="medium"
                fullWidth
                required
                error={error}
                name="billingDetails-city"
                onChange={handleChange}
                value={cardInfo?.billingDetails.city}
              />
            </S.Row>
            <S.Row>
              <S.FormInput
                id="standard-basic"
                label="District"
                size="medium"
                fullWidth
                error={error}
                onChange={handleChange}
                name="billingDetails-district"
                value={cardInfo?.billingDetails.district}
              />
            </S.Row>
            <S.Row>
              <S.FormInput
                id="standard-basic"
                label="Country Code"
                size="medium"
                fullWidth
                required
                error={error}
                onChange={handleChange}
                name="billingDetails-country"
                value={cardInfo?.billingDetails.country}
              />
            </S.Row>
            {/* <S.Row>
              <S.FormInput
                id="standard-basic"
                label="Country Code"
                size="medium"
                fullWidth
                required
                error={error}
                onChange={handleChange}
              />
            </S.Row> */}
          </div>
        ) : null}
        <div style={{ paddingTop: '16px', paddingBottom: '40px' }}>
          <S.Button onClick={handleSubmit}>Add Card</S.Button>
        </div>
      </S.ContentContainer>
    </S.Container>
  );
};

S.Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  height: 80vh;
  width: 450px;
  margin: auto;
`;

S.FormInputError = styled(TextField)`
  color: red;
  & .Mui-focused {
    color: red;
  }

  .MuiInput-underline:after {
    border-bottom: 2px solid red;
  }
`;

S.FormInput = styled(TextField)`
  & .Mui-focused {
    color: ${(props) => (props.error ? 'red' : 'black')};
  }

  .MuiInput-underline:after {
    border-bottom: 2px solid ${(props) => (props.error ? 'red' : 'black')};
  }
`;

S.Dropdown = styled.div`
  color: #7d7d7d;
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 2px solid #ebebeb;
  align-items: center;
  padding: 10px 0;
  :hover {
    color: black;
    cursor: pointer;
    border-bottom: 2px solid black;
  }
  :hover .arrow {
    color: black;
  }
`;

S.ArrowDown = styled(KeyboardArrowDownIcon)`
  color: #7d7d7d;
`;

S.ArrowUp = styled(KeyboardArrowUpIcon)`
  color: #7d7d7d;
`;

S.ContentContainer = styled.div`
  width: 410px;
  height: 100%;
  padding-top: 5%;
  margin: auto;
`;

S.Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

S.HeaderText = styled.span`
  font-size: 22px;
  padding-left: 18px;
  font-weigth: 600;
`;

S.HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.Button = styled.button`
  width: 410px;
  height: 56px;
  border: none;
  background-color: black;
  color: white;
  border-radius: 35px;
  font-size: 20px;
  font-weigth: 600;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

export default AddCC;
