import { useState, useEffect } from 'react';
import { ProductWithFunctions } from 'entities/product';
import Transaction from './Transaction';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from 'store/hooks';
import { ITransaction } from 'entities/transaction';
import CreateSale from '../Modal/CreateSale';
import RedeemModal from '../Modal/Redeem';
import Toast from 'utils/Toast';
import { useHistory } from 'react-router-dom';
import BuyNowModal from '../Modal/BuyNow';
import CancelSale from '../Modal/CancelSale';
import { Link } from 'react-router-dom';
import DropDown from './DropDown';
import { useOutsideAlert } from 'hooks/oustideAlerter';
import * as S from './styles';

export type Status =
  | 'not-for-sale'
  | 'buy-now'
  | 'create-sale'
  | 'active-sale'
  | 'upcoming'
  | 'owner'
  | '';

interface Props {
  product: ProductWithFunctions | null;
  transactionHistory: ITransaction[];
}

const History = ({ product, transactionHistory }: Props): JSX.Element => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [showLink, setShowLink] = useState<boolean>(false);
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { visible, setVisible, ref } = useOutsideAlert(false);
  const [status, setStatus] = useState<Status>('');
  const [isSaleModalOpen, setIsSaleModalOpen] = useState<boolean>(false);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState<boolean>(false);
  const userBalance = useAppSelector(
    (state) => state.session.userCards?.balance?.amount
  );
  const [activeSalePrice, setActiveSalePrice] = useState<number | undefined>(
    product?.activeProductListings[0]?.price
  );
  const price = product?.listing?.price;
  const hasFunds = price ? userBalance >= price : false;
  const modalMode = hasFunds ? 'hasFunds' : 'noFunds';

  const loggedInUser = useAppSelector((state) => state.session.user);

  const handleRedirectToOwnerPage = () => {
    history.push(`/collection/${product?.owner.username}`);
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

  const handleCreateSale = () => {
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
      setIsSaleModalOpen(true);
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
        product?.activeProductListings?.length === 0 &&
        product?.upcomingProductListings?.length === 0
      ) {
        setStatus('owner');
      } else if (
        loggedInUser.id === product?.owner?._id &&
        product?.activeProductListings?.length !== 0 &&
        product?.upcomingProductListings?.length === 0
      ) {
        setStatus('active-sale');
      } else if (
        loggedInUser.id === product?.owner._id &&
        product?.activeProductListings?.length === 0 &&
        product?.upcomingProductListings?.length !== 0
      ) {
        setStatus('upcoming');
      } else if (
        loggedInUser.id !== product?.owner._id &&
        product?.activeProductListings?.length === 0 &&
        product?.upcomingProductListings?.length === 0
      ) {
        setStatus('not-for-sale');
      } else if (
        loggedInUser.id !== product?.owner._id &&
        product?.activeProductListings?.length !== 0 &&
        product?.upcomingProductListings.length === 0
      ) {
        setStatus('buy-now');
      } else if (
        loggedInUser.id !== product?.owner._id &&
        product?.activeProductListings?.length === 0 &&
        product?.upcomingProductListings?.length !== 0
      ) {
        setStatus('upcoming');
      }
    } else {
      if (
        product?.activeProductListings?.length !== 0 &&
        product?.upcomingProductListings?.length === 0
      ) {
        setStatus('buy-now');
      } else if (
        product?.activeProductListings?.length === 0 &&
        product?.upcomingProductListings?.length === 0
      ) {
        setStatus('not-for-sale');
      } else if (
        product?.activeProductListings?.length === 0 &&
        product?.upcomingProductListings?.length !== 0
      ) {
        setStatus('upcoming');
      }
    }
  }, []);

  if (status === '') return <></>;
  const filteredTransactions =
    transactionHistory &&
    transactionHistory.filter((tx, index) => {
      if (
        (tx.type === 'nft_transfer_manual' &&
          tx.status !== 'error' &&
          tx.status !== 'pending') ||
        (tx.type === 'purchase' && tx.status === 'success') ||
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
            <S.TitleLink to="/marketplace?page=1&per_page=6&sortBy=startDate:asc">
              Marketplace
            </S.TitleLink>{' '}
            /{' '}
            <S.TitleLink to={`/marketplace/${product?.sku._id}`}>
              {product?.sku.name}
            </S.TitleLink>{' '}
            / #{product?.serialNumber}
          </div>
        </S.Title>
        <S.Header>
          <S.Row>
            <S.ProductId>
              #{product?.serialNumber} <S.Slash>/</S.Slash>
            </S.ProductId>
            <S.ProductOwner>
              Owner
              <S.Owner onClick={handleRedirectToOwnerPage}>
                @{product?.owner.username}
              </S.Owner>
            </S.ProductOwner>
          </S.Row>
          {status === 'upcoming' && (
            <>
              <S.ButtonContainer
                onMouseEnter={() => setShowLink(true)}
                onMouseLeave={() => setShowLink(false)}
              >
                {showLink && (
                  <div>
                    <S.ToolTip title="Testing">Testing</S.ToolTip>
                    <S.ToolTipText>NFT Sale Upcoming</S.ToolTipText>
                  </div>
                )}
                <S.Button width="130px">Upcoming</S.Button>
              </S.ButtonContainer>
            </>
          )}
          {status === 'owner' && (
            <>
              <S.ActionContainer>
                <S.ActionText>Actions</S.ActionText>
                <div
                  ref={ref}
                  onClick={() => setVisible(!visible)}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <S.ActionButton />
                  {visible && (
                    <DropDown
                      redeemed={product?.redeemedStatus}
                      setModalVisible={setIsRedeemModalOpen}
                      openSaleModal={handleCreateSale}
                      redeemable={product?.sku?.redeemable}
                    />
                  )}
                </div>
              </S.ActionContainer>
            </>
          )}
          {status === 'buy-now' && (
            <S.ButtonContainer>
              <S.Button onClick={handleSaleAction} hover={true}>
                Buy Now for ${product?.activeProductListings[0]?.price}
              </S.Button>
            </S.ButtonContainer>
          )}
          {status === 'create-sale' && (
            <S.ButtonContainer>
              <S.Button onClick={handleSaleAction} width="130px" hover={true}>
                List for sale
              </S.Button>
            </S.ButtonContainer>
          )}
          {status === 'not-for-sale' && (
            <S.ButtonContainer>
              <S.Button
                onClick={handleSaleAction}
                className="button_noSale"
                width="130px"
                hover={false}
              >
                Not for sale
              </S.Button>
            </S.ButtonContainer>
          )}
          {status === 'active-sale' && (
            <S.ButtonContainer>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <S.FlexColumn>
                  <S.ActiveAmount>${activeSalePrice}</S.ActiveAmount>
                  <div style={{ display: 'flex' }}>
                    <S.StatusText>Status:</S.StatusText>
                    <S.ActiveText>active</S.ActiveText>
                  </div>
                </S.FlexColumn>
                <S.CancelButton onClick={() => setIsModalOpen(true)}>
                  Cancel Sale
                </S.CancelButton>
              </div>
            </S.ButtonContainer>
          )}
        </S.Header>
        <S.FlexDiv>
          <S.History>History</S.History>
          <S.GrayLine>Line</S.GrayLine>
        </S.FlexDiv>
        <S.TransactionHistory>
          {filteredTransactions instanceof Array &&
            filteredTransactions.map((transaction, index) => {
              if (filteredTransactions.length >= 2) {
                if (
                  filteredTransactions[filteredTransactions.length - 2]
                    ?.type === 'nft_mint'
                ) {
                  if (index === filteredTransactions.length - 1) {
                    return (
                      <Transaction
                        key={
                          filteredTransactions[filteredTransactions.length - 2]
                            ._id
                        }
                        transaction={
                          filteredTransactions[filteredTransactions.length - 2]
                        }
                      />
                    );
                  } else if (index === filteredTransactions.length - 2) {
                    return (
                      <Transaction
                        key={
                          filteredTransactions[filteredTransactions.length - 1]
                            ._id
                        }
                        transaction={
                          filteredTransactions[filteredTransactions.length - 1]
                        }
                      />
                    );
                  } else {
                    return (
                      <Transaction
                        key={transaction._id}
                        transaction={transaction}
                      />
                    );
                  }
                } else {
                  return (
                    <Transaction
                      key={transaction._id}
                      transaction={transaction}
                    />
                  );
                }
              } else {
                return (
                  <Transaction
                    key={transaction._id}
                    transaction={transaction}
                  />
                );
              }
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
      {product && status === 'active-sale' && (
        <CancelSale
          setModalPaymentVisible={setIsModalOpen}
          visible={isModalOpen}
          listingId={product?.activeProductListings[0]?._id}
          setStatus={setStatus}
        />
      )}
      {product && status === 'owner' && (
        <>
          <RedeemModal
            setModalPaymentVisible={setIsRedeemModalOpen}
            visible={isRedeemModalOpen}
            sku={product?.sku}
            serialNum={product?.serialNumber}
            redeemable={product?.redeemedStatus}
          />
          <CreateSale
            product={product}
            setStatus={setStatus}
            setActiveSalePrice={setActiveSalePrice}
            setSaleModal={setIsSaleModalOpen}
            isModalOpen={isSaleModalOpen}
          />
        </>
      )}
    </>
  );
};

export default History;
