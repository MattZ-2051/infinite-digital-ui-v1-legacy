import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import coinbaseIcon from 'assets/img/icons/coinbase-icon-large.png';
import sukuIcon from 'assets/img/icons/suku-icon.png';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import circleIcon from 'assets/img/icons/circle-icon.png';
import usdcIcon from 'assets/img/icons/usdc.png';
import ModalComponent from 'components/Modal';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import exitIcon from 'assets/img/icons/exit-icon.png';
import { useAppSelector } from 'store/hooks';
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import 'react-coinbase-commerce/dist/coinbase-commerce-button.css';
import { USDCDeposit } from '../USDCDeposit/USDCDeposit';
import { getMe, getPersonalToken } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';

const coinbaseCheckoutId = 'd7589053-50e2-4560-b25c-5058274d6b0d';

interface IDepositModal {
  isModalOpen?: boolean;
  handleClose: () => void;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: '750px',
      height: '800px',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      paddingTop: '16px',
      outline: 'none',
      borderRadius: '10px',
    },
  })
);

const S: any = {};

const DepositModal = ({
  isModalOpen,
  handleClose,
}: IDepositModal): JSX.Element => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const history = useHistory();
  const userCards = useAppSelector((state) => state.session.userCards);
  const username = useAppSelector((state) => state.session.user.username);
  const [isUSDCModalOpen, setIsUSDCModelOpen] = useState<boolean>(false);
  const [coinbaseMetadata, setCoinbaseMetadata] = useState<{
    token: string;
    userId: string;
  }>();
  const { getAccessTokenSilently } = useAuth0();
  const { kycPending, kycMaxLevel } = useAppSelector(
    (state) => state.session.userCards
  );

  useEffect(() => {
    getCoinbaseMetadata();
  }, []);

  async function getCoinbaseMetadata() {
    let token = '';
    try {
      const res = await getPersonalToken(await getAccessTokenSilently());
      token = res.token;
    } catch (e) {
      console.log(e);
      token = 'error fetching token';
    }
    const extUser = await getMe(await getAccessTokenSilently());
    setCoinbaseMetadata({ userId: extUser._id, token: token });
  }

  function openUSDCModal() {
    if (kycMaxLevel !== 2) return;
    setIsUSDCModelOpen(true);
  }

  function closeUSDCModal() {
    setIsUSDCModelOpen(false);
  }

  const handleRedirect = () => {
    if (userCards.cards.length >= 1) {
      history.push(`/wallet/${username}/deposit/addfunds`);
    } else {
      history.push(`/wallet/${username}/addcreditcard`);
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <S.ExitIcon>
        <img src={exitIcon} onClick={handleClose} className="icon__exit" />
      </S.ExitIcon>

      <div style={{ padding: '0 40px 40px 40px' }}>
        <S.Header>Select a payment to deposit</S.Header>
        <S.GrayLine style={{ width: '100%' }}></S.GrayLine>
        <S.Row onClick={handleRedirect}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={circleIcon} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <S.RowText>Circle</S.RowText>
            <S.RowSubText>Pay with credit card</S.RowSubText>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <ArrowForwardIosIcon className="icon__arrow" />
          </div>
        </S.Row>
        <CoinbaseCommerceButton
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            textAlign: 'left',
            padding: 0,
          }}
          checkoutId={coinbaseCheckoutId}
          customMetadata={coinbaseMetadata}
          disabled={kycMaxLevel !== 2}
        >
          <S.Row>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={coinbaseIcon} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <S.RowText>Coinbase</S.RowText>
              <S.RowSubText>Pay with cryptocurrency</S.RowSubText>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <ArrowForwardIosIcon className="icon__arrow" />
            </div>
          </S.Row>
        </CoinbaseCommerceButton>
        <S.Row onClick={openUSDCModal}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img width="50px" src={usdcIcon} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <S.RowText
              style={{ color: `${kycMaxLevel !== 2 ? '#9e9e9e' : 'black'}` }}
            >
              USDC
            </S.RowText>
            <S.RowSubText>
              Deposit USDC to your wallet (on Ethereum)
            </S.RowSubText>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <ArrowForwardIosIcon style={{ color: '#9e9e9e' }} />
          </div>
        </S.Row>
        <S.Row>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={sukuIcon} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <S.RowText style={{ color: '#9e9e9e' }}>Suku</S.RowText>
            <S.RowSubText>Coming soon</S.RowSubText>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <ArrowForwardIosIcon style={{ color: '#9e9e9e' }} />
          </div>
        </S.Row>
        <ModalComponent open={isUSDCModalOpen}>
          <S.ExitIcon>
            <img
              src={exitIcon}
              onClick={closeUSDCModal}
              className="icon__exit"
            />
          </S.ExitIcon>
          <USDCDeposit />
        </ModalComponent>
      </div>
    </div>
  );
  return <ModalComponent open={isModalOpen}>{body}</ModalComponent>;
};

S.GrayLine = styled.div`
  border-bottom: 2px solid #d8d8d8;
  padding-top: 10px;
  width: 80%;
`;

S.RowText = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

S.RowSubText = styled.span`
  font-size: 16px;
  color: #9e9e9e;
`;

S.Header = styled.span`
  font-size: 22px;
  font-weight: 600;
  border-bottom: 2px solid black;
  padding-bottom: 14px;
`;

S.SubHeader = styled.div`
  font-size: 16px;
  color: #7d7d7d;
  padding-top: 25px;
`;

S.Row = styled.div`
  display: grid;
  grid-template-columns: 15% 55% 30%;
  padding-top: 40px;
  border-bottom: 1px solid #ebebeb;
  padding-bottom: 21px;
  :hover {
    border-bottom: 1px solid black;
    cursor: pointer;
  }
  .icon__arrow {
    color: #9e9e9e;
  }
  :hover .icon__arrow {
    color: black;
  }
`;

S.ExitIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 16px;
  :hover .icon__exit {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export default DepositModal;
