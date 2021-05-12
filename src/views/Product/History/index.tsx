import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { ProductWithFunctions } from 'entities/product';
import Transaction from './Transaction';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from 'store/hooks';
import { ITransaction } from 'entities/transaction';
import { Link } from 'react-router-dom';
import ModalPayment from '../Modal';
import CreateSale from '../Modal/CreateSale';
import Toast from 'utils/Toast';
import { ReactComponent as ToolTip } from 'assets/svg/icons/tooltip.svg';
import { useHistory } from 'react-router-dom';
import BuyNowModal from '../Modal/BuyNow';

const S: any = {};

export type Status =
  | 'not-for-sale'
  | 'buy-now'
  | 'create-sale'
  | 'active-sale'
  | 'upcoming'
  | '';

interface Props {
  product: ProductWithFunctions | null;
  transactionHistory: ITransaction[] | null;
}

const History = ({ product, transactionHistory }: Props): JSX.Element => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [showLink, setShowLink] = useState<boolean>(false);
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAppSelector((state) => state.session.user);
  const userBalance = useAppSelector(
    (state) => state.session.userCards?.balance?.amount
  );
  const [activeSalePrice, setActiveSalePrice] = useState<number | undefined>(
    product?.activeProductListings[0]?.price
  );
  const price = product?.listing.price;
  const hasFunds = price ? userBalance >= price : false;
  const modalMode = hasFunds ? 'hasFunds' : 'noFunds';
  const [status, setStatus] = useState<Status>('');

  const loggedInUser = useAppSelector((state) => state.session.user);

  const handleRedirectToOwnerPage = () => {
    history.push(`/collection/${product?.owner._id}`);
  };

  const productListingExists = () => {
    return (
      product?.activeProductListings.some((item) => item._id === product._id) ||
      product?.upcomingProductListings.some((item) => item._id === product._id)
    );
  };

  const handleSaleAction = () => {
    if (productListingExists()) {
      return Toast.error(
        <>
          Another active or upcoming sale listing for this product already
          exists. Please <Link to="/help">contact support</Link> if you believe
          this is an error
        </>
      );
    }
    if (isAuthenticated) {
      setIsModalOpen(true);
    } else {
      Toast.warning(
        <>
          You need to{' '}
          <a onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>
            Log in
          </a>{' '}
          in order to complete the purchase
        </>
      );
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (
        loggedInUser.id === product?.owner._id &&
        product?.activeProductListings?.length === 0
      ) {
        setStatus('create-sale');
      } else if (
        loggedInUser.id === product?.owner._id &&
        product?.activeProductListings?.length !== 0
      ) {
        setStatus('active-sale');
      } else if (
        loggedInUser.id !== product?.owner._id &&
        product?.activeProductListings?.length === 0
      ) {
        setStatus('not-for-sale');
      } else if (
        loggedInUser.id !== product?.owner._id &&
        product?.activeProductListings?.length !== 0
      ) {
        setStatus('buy-now');
      }
    } else {
      if (product?.activeProductListings?.length !== 0) {
        setStatus('buy-now');
      } else if (product?.activeProductListings?.length === 0) {
        setStatus('not-for-sale');
      }
    }
  }, []);

  if (status === '') return <></>;
  const filteredTransactions = transactionHistory?.filter((tx, index) => {
    if (
      (tx.type === 'nft_transfer_manual' &&
        tx.status !== 'error' &&
        tx.status !== 'pending') ||
      (tx.type === 'purchase' &&
        tx.status !== 'error' &&
        tx.status !== 'pending') ||
      (tx.type === 'nft_mint' &&
        tx.status !== 'error' &&
        tx.status !== 'pending')
    ) {
      return tx;
    }
  });

  return (
    <>
      <S.Container>
        <S.Title>
          <div>
            <S.TitleLink to="/marketplace">Marketplace</S.TitleLink> /{' '}
            <S.TitleLink to={`/marketplace/${product?.sku._id}`}>
              {product?.sku.name}
            </S.TitleLink>{' '}
            / #{product?.serialNumber}
          </div>
        </S.Title>
        <S.Header>
          <S.FlexDiv>
            <S.ProductId>#{product?.serialNumber}</S.ProductId>/
            <S.ProductOwner>
              Owner
              <S.Owner onClick={handleRedirectToOwnerPage}>
                @ {product?.owner.username}
              </S.Owner>
            </S.ProductOwner>
          </S.FlexDiv>
          {status === 'upcoming' && (
            <>
              <div
                style={{ position: 'relative', paddingRight: '80px' }}
                onMouseEnter={() => setShowLink(true)}
                onMouseLeave={() => setShowLink(false)}
              >
                {showLink && (
                  <div>
                    <S.ToolTip title="Testing">Testing</S.ToolTip>
                    <S.ToolTipText>NFT Auction Coming Soon</S.ToolTipText>
                  </div>
                )}
                <S.Button width="130px">Upcoming</S.Button>
              </div>
            </>
          )}
          {status === 'buy-now' && (
            <div style={{ paddingRight: '80px' }}>
              <S.Button onClick={handleSaleAction} hover={true}>
                Buy Now for ${product?.listing.price}
              </S.Button>
            </div>
          )}
          {status === 'create-sale' && (
            <div style={{ paddingRight: '80px' }}>
              <S.Button onClick={handleSaleAction} width="130px" hover={true}>
                Sell your NFT
              </S.Button>
            </div>
          )}
          {status === 'not-for-sale' && (
            <div style={{ paddingRight: '80px' }}>
              <S.Button
                onClick={handleSaleAction}
                className="button_noSale"
                width="130px"
                hover={false}
              >
                Not for sale
              </S.Button>
            </div>
          )}
          {status === 'active-sale' && (
            <div style={{ paddingRight: '80px' }}>
              <S.FlexColumn>
                <S.ActiveAmount>${activeSalePrice}</S.ActiveAmount>
                <div style={{ display: 'flex' }}>
                  <S.StatusText>Status:</S.StatusText>
                  <S.ActiveText>active</S.ActiveText>
                </div>
              </S.FlexColumn>
            </div>
          )}
        </S.Header>
        <S.FlexDiv>
          <S.History>History</S.History>
          <S.GrayLine>Line</S.GrayLine>
        </S.FlexDiv>
        <S.TransactionHistory>
          {filteredTransactions instanceof Array &&
            filteredTransactions.map((transaction) => {
              return (
                <Transaction key={transaction._id} transaction={transaction} />
              );
            })}
        </S.TransactionHistory>
      </S.Container>
      {/* {product && status !== ('create-sale' || 'buy-now') && (
        <ModalPayment
          visible={isModalOpen}
          setModalPaymentVisible={setIsModalOpen}
          product={product}
          mode={modalMode}
          status={status}
          activeAmount={1400}
        />
      )} */}
      {product && status === 'create-sale' && (
        <CreateSale
          visible={isModalOpen}
          setModalPaymentVisible={setIsModalOpen}
          product={product}
          setStatus={setStatus}
          setActiveSalePrice={setActiveSalePrice}
        />
      )}
      {product && status === 'buy-now' && (
        <BuyNowModal
          setModalPaymentVisible={setIsModalOpen}
          product={product}
          serialNum={product.serialNumber}
          visible={isModalOpen}
          mode={modalMode}
          setStatus={setStatus}
        />
      )}
    </>
  );
};

S.Container = styled.div`
  padding: 48px 0 48px 48px;
  height: 100%;
  overflow: hidden;
  width: 100%;
  @media screen and (max-width: 1160px) {
    padding: 48px 24px 48px 24px;
  }
`;

S.ActiveAmount = styled.span`
  font-size: 24px;
  color: white;
  font-weight: 600;
`;

S.FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

S.ActiveText = styled.span`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

S.StatusText = styled.span`
  color: #7c7c7c;
  font-size: 16px;
  font-weight: 600;
  padding-right: 5px;
`;

S.FlexDiv = styled.div`
  display: flex;
  align-items: center;
  padding-right: 80px;
`;

S.TitleLink = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  color: white;
  text-decoration: none;
  :focus {
    color: white;
  }
`;

S.ToolTip = styled(ToolTip)`
  position: absolute;
  left: -1em;
  bottom: 45px;
  color: black;
  width: 206px;
  height: 38px;
  :hover {
    cursor: pointer;
  }
`;

S.ToolTipText = styled.span`
  position: absolute;
  left: -2.25em;
  bottom: 4em;
  color: black;
  overflow: hidden;
  font-size: 14px;
`;

S.ProductId = styled.span`
  font-size: 48px;
  color: white;
  font-weight: 600;
  padding-right: 16px;
`;

S.TransactionHistory = styled.div`
  overflow: hidden;
  height: 80%;
  overflow-x: hidden;
  padding-right: 80px;

  :hover {
    overflow-y: auto;
    cursor: pointer;
  }

  @media screen and (max-width: 1160px) {
    padding-right: 0;
  }
`;

S.History = styled.span`
  font-size: 16px;
  font-weight: 600;
  border-bottom: 2px solid white;
  padding-bottom: 16px;
`;

S.GrayLine = styled.div`
  border-bottom: 2px solid #2e2e2e;
  width: 100%;
  color: #1a1a1a;
  padding-bottom: 16px;
  padding-right: 80px;
`;

S.ProductOwner = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  padding-left: 16px;
`;

S.Owner = styled.span`
  color: white;
  :hover {
    cursor: pointer;
  }
`;

S.Button = styled.button<{ width: string; hover: boolean }>`
  border: none;
  width: ${(props) => (props.width ? props.width : '190px')};
  height: 40px;
  border-radius: 35px;
  background-color: #2e2e2e;
  color: white;
  font-size: 16px;
  font-weight: 600;
  ${(props) =>
    props.hover
      ? `:hover {
    cursor: pointer;
    background-color: white;
    color: black;
  }`
      : 'color: #9e9e9e'}
`;

S.Header = styled.div`
  font-size: 48px;
  font-weight: 600;
  color: #7c7c7c;
  display: flex;
  align-items: center;
  padding-top: 40px;
  justify-content: space-between;
`;

S.Title = styled.div`
  color: #7c7c7c;
  font-size: 16px;
`;

export default History;
