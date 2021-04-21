import styled from 'styled-components/macro';
import { useState } from 'react';
import circleIcon from 'assets/img/icons/circle-icon-deposit.png';
import exitIcon from 'assets/img/icons/exit-icon.png';
import TextField from '@material-ui/core/TextField';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const S: any = {};

interface CCInfo {
  cardNumber: string;
  cvv: string;
  expMonth: number;
  expYear: number;
  metadata: {
    email: string;
    phoneNumber: string;
  };
  billingDetails: {
    name: string;
    city: string;
    country: string;
    line1: string;
    line2: string;
    district: string;
    postalCode: string;
  };
}

const AddCC = () => {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);
  const [error, setError] = useState<boolean | undefined>(false);

  const state: CCInfo = {
    cardNumber: '',
    cvv: '',
    expMonth: 0,
    expYear: 0,
    metadata: {
      email: '',
      phoneNumber: '',
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

  const [cardInfo, setCardInfo] = useState<CCInfo | undefined>(state);

  console.log(cardInfo);

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
            id="standard-basic"
            label="Credit Card Number"
            fullWidth
            required
            error={error}
            color="secondary"
            onChange={(e) => setCardInfo(e.target.value)}
          />
        </S.Row>
        <S.Row>
          <S.FormInput
            id="standard-basic"
            label="Exp date"
            size="medium"
            error={error}
            required
          />
          <S.FormInput
            id="standard-basic"
            label="CCV"
            size="medium"
            required
            error={error}
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
              />
            </S.Row>
            <S.Row>
              <S.FormInput
                id="standard-basic"
                label="Address Line 2"
                size="medium"
                fullWidth
                error={error}
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
              />
            </S.Row>
            <S.Row>
              <S.FormInput
                id="standard-basic"
                label="District"
                size="medium"
                fullWidth
                error={error}
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
              />
            </S.Row>
          </div>
        ) : null}
        <div style={{ paddingTop: '16px', paddingBottom: '40px' }}>
          <S.Button onClick={() => setError(!error)}>Add Card</S.Button>
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
