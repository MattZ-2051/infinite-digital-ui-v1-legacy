import React, { useState, useEffect } from 'react';
import { ProductWithFunctions } from 'entities/product';
import Transaction from './Transaction';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from 'store/hooks';
import { ITransaction } from 'entities/transaction';
import { Bid } from 'entities/bid';
import CreateSale from '../Modal/CreateSale';
import RedeemModal from '../Modal/Redeem';
import AuctionModal from '../Modal/Auction';
import BidModal from '../Modal/Bid';
import Toast from 'utils/Toast';
import { useHistory } from 'react-router-dom';
import BuyNowModal from '../Modal/BuyNow';
import CancelSale from '../Modal/CancelSale';
import { Link } from 'react-router-dom';
import DropDown from './DropDown';
import { useOutsideAlert } from 'hooks/oustideAlerter';
import { formatCountdown, formatDate } from 'utils/dates';
import { getBids } from 'services/api/productService';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BidIcon from 'assets/img/icons/bid-dollar-icon.png';
import * as S from './styles';

export type HistoryStatus =
  | 'not-for-sale'
  | 'buy-now'
  | 'create-sale'
  | 'active-sale'
  | 'upcoming'
  | 'owner'
  | '';

export type AuctionStatus =
  | 'active-auction-no-bid-owner'
  | 'active-auction-no-bid-user'
  | 'upcoming-auction'
  | 'active-auction-bid-owner'
  | 'active-auction-bid-user'
  | '';

interface Props {
  product: ProductWithFunctions | null;
  transactionHistory: ITransaction[];
}

const History = ({ product, transactionHistory }: Props): JSX.Element => {
  const {
    loginWithRedirect,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();
  const [showLink, setShowLink] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<'history' | 'auction'>(
    'history'
  );
  const history = useHistory();
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { visible, setVisible, ref } = useOutsideAlert(false);
  const [themeStyle, setThemeStyle] = useState<'light' | 'dark'>('dark');
  const [historyStatus, setHistoryStatus] = useState<HistoryStatus>('');
  const [auctionStatus, setAuctionStatus] = useState<AuctionStatus>('');
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState<boolean>(false);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState<boolean>(false);
  const [isAuctionModalOpen, setIsAuctionModalOpen] = useState<boolean>(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState<boolean>(false);

  const [bids, setBids] = useState<Bid[]>([]);
  const [bidAmount, setBidAmount] = useState<string>('');
  const [totalBids, setTotalBids] = useState(1);
  const userBalance = useAppSelector(
    (state) => state.session.userCards?.balance?.amount
  );
  const [activeSalePrice, setActiveSalePrice] = useState<number | undefined>(
    product?.activeProductListings[0]?.price
  );
  const [page, setPage] = useState(1);
  const perPage = 5;
  const price = product?.listing?.price;
  const hasFunds = price ? userBalance >= price : false;
  const modalMode = hasFunds ? 'hasFunds' : 'noFunds';
  const bidIncrement = 1;

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

  const handleBid = () => {
    if (product) {
      if (isAuthenticated) {
        if (parseFloat(bidAmount) < bids[0].bidAmt) {
          Toast.error(
            `Whoops, new bids must be at least $${bidIncrement} greater than the current highest bid.`
          );
        } else if (
          parseFloat(bidAmount) <
          bids[0]?.bidAmt +
            bids[0]?.bidAmt * (product?.resaleBuyersFeePercentage / 100) +
            bidIncrement
        ) {
          Toast.error(
            <>
              Whoops, insufficient funds! Your available balance is $
              {userBalance}{' '}
              <a onClick={() => history.push('/wallet')}>click here</a> to
              deposit enough funds to cover your desired bid amount including
              fees
              <a onClick={() => history.push('/helpage')}>learn more</a>
            </>
          );
        } else if (
          parseFloat(bidAmount) >
          bids[0]?.bidAmt +
            bids[0]?.bidAmt * (product?.resaleBuyersFeePercentage / 100) +
            bidIncrement
        ) {
          setIsBidModalOpen(true);
        }
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
    } else {
      return;
    }
  };

  useEffect(() => {
    setPage(1);
  }, [selectedTab]);

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

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const fetchBids = async () => {
    const userToken = await getAccessTokenSilently();
    const res = await getBids(
      userToken,
      product?.activeProductListings[0]?._id,
      page,
      perPage
    );
    if (res) {
      setBids(res.data);
      setTotalBids(res.data[0]?.listing?.bids?.length);
    }
  };
  useEffect(() => {
    if (selectedTab === 'history') {
      if (isAuthenticated) {
        if (
          loggedInUser.id === product?.owner._id &&
          product?.activeProductListings?.length === 0 &&
          product?.upcomingProductListings?.length === 0
        ) {
          setHistoryStatus('owner');
        } else if (
          loggedInUser.id === product?.owner?._id &&
          product?.activeProductListings?.length !== 0 &&
          product?.upcomingProductListings?.length === 0
        ) {
          setHistoryStatus('active-sale');
        } else if (
          loggedInUser.id === product?.owner._id &&
          product?.activeProductListings?.length === 0 &&
          product?.upcomingProductListings?.length !== 0
        ) {
          setHistoryStatus('upcoming');
        } else if (
          loggedInUser.id !== product?.owner._id &&
          product?.activeProductListings?.length === 0 &&
          product?.upcomingProductListings?.length === 0
        ) {
          setHistoryStatus('not-for-sale');
        } else if (
          loggedInUser.id !== product?.owner._id &&
          product?.activeProductListings?.length !== 0 &&
          product?.upcomingProductListings.length === 0
        ) {
          setHistoryStatus('buy-now');
        } else if (
          loggedInUser.id !== product?.owner._id &&
          product?.activeProductListings?.length === 0 &&
          product?.upcomingProductListings?.length !== 0
        ) {
          setHistoryStatus('upcoming');
        }
      } else {
        if (
          product?.activeProductListings?.length !== 0 &&
          product?.upcomingProductListings?.length === 0
        ) {
          setHistoryStatus('buy-now');
        } else if (
          product?.activeProductListings?.length === 0 &&
          product?.upcomingProductListings?.length === 0
        ) {
          setHistoryStatus('not-for-sale');
        } else if (
          product?.activeProductListings?.length === 0 &&
          product?.upcomingProductListings?.length !== 0
        ) {
          setHistoryStatus('upcoming');
        }
      }
    }

    if (selectedTab === 'auction' && product?.owner?._id === loggedInUser.id) {
      if (
        product?.upcomingProductListings?.length !== 0 &&
        product?.activeProductListings?.length === 0 &&
        product?.activeProductListings[0]?.saleType === 'auction'
      ) {
        setAuctionStatus('upcoming-auction');
      } else if (
        product?.upcomingProductListings?.length === 0 &&
        product?.activeProductListings?.length !== 0 &&
        bids.length === 0
      ) {
        setAuctionStatus('active-auction-no-bid-owner');
      } else if (
        product?.upcomingProductListings?.length === 0 &&
        product?.activeProductListings?.length !== 0 &&
        bids.length !== 0
      ) {
        setAuctionStatus('active-auction-bid-owner');
      }
    }
    if (selectedTab === 'auction' && product?.owner?._id !== loggedInUser.id) {
      if (
        product?.upcomingProductListings?.length === 0 &&
        product?.activeProductListings?.length !== 0 &&
        bids.length !== 0
      ) {
        setAuctionStatus('active-auction-bid-user');
      } else if (
        product?.upcomingProductListings?.length !== 0 &&
        product?.activeProductListings?.length === 0 &&
        product?.activeProductListings[0]?.saleType === 'auction'
      ) {
        setAuctionStatus('upcoming-auction');
      } else if (
        product?.upcomingProductListings?.length === 0 &&
        product?.activeProductListings?.length !== 0 &&
        bids.length === 0
      ) {
        setAuctionStatus('active-auction-no-bid-user');
      }
    }
  }, [selectedTab]);

  useEffect(() => {
    fetchBids();
  }, [page]);

  if (historyStatus === '') return <></>;
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
            / #{product?.serialNumber}/{' '}
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
            {product?.sku.redeemable &&
              (product?.redeemedStatus === 'NA' ? (
                <>
                  <S.Slash>/</S.Slash>

                  <S.FlexDiv padding="0 0 0 16px">
                    <S.RedeemIcon />
                    <S.Redeemed color="white">Redeemable</S.Redeemed>
                  </S.FlexDiv>
                </>
              ) : (
                <>
                  <S.Slash>/</S.Slash>

                  <S.FlexDiv padding="0 0 0 16px">
                    <S.IsRedeemedIcon />
                    <S.Redeemed color="#636363">Redeemed</S.Redeemed>
                  </S.FlexDiv>
                </>
              ))}
          </S.Row>
          {historyStatus === 'upcoming' && selectedTab === 'history' && (
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
          {historyStatus === 'owner' && selectedTab === 'history' && (
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
                      setAuctionModalVisible={setIsAuctionModalOpen}
                      redeemable={product?.sku?.redeemable}
                    />
                  )}
                </div>
              </S.ActionContainer>
            </>
          )}

          {historyStatus === 'buy-now' && selectedTab === 'history' && (
            <S.ButtonContainer>
              <S.Button onClick={handleSaleAction} hover={true}>
                Buy Now for ${product?.activeProductListings[0]?.price}
              </S.Button>
            </S.ButtonContainer>
          )}
          {historyStatus === 'create-sale' && selectedTab === 'history' && (
            <S.ButtonContainer>
              <S.Button onClick={handleSaleAction} width="130px" hover={true}>
                List for sale
              </S.Button>
            </S.ButtonContainer>
          )}
          {historyStatus === 'not-for-sale' && selectedTab === 'history' && (
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
          {historyStatus === 'active-sale' && selectedTab === 'history' && (
            <S.ButtonContainer>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <S.FlexColumn style={{ paddingRight: '16px' }}>
                  <S.ActiveAmount>${activeSalePrice}</S.ActiveAmount>
                  <div style={{ display: 'flex' }}>
                    <S.StatusText>Status:</S.StatusText>
                    <S.ActiveText>active</S.ActiveText>
                  </div>
                </S.FlexColumn>
                <S.Button
                  width="130px"
                  onClick={() => setIsCancelModalOpen(true)}
                  hover={true}
                >
                  Cancel Sale
                </S.Button>
              </div>
            </S.ButtonContainer>
          )}
          {(auctionStatus === 'upcoming-auction' ||
            auctionStatus === 'active-auction-no-bid-owner') &&
            selectedTab === 'auction' && (
              <S.ButtonContainer>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <S.Button
                    width="160px"
                    hover={true}
                    onClick={() => setIsCancelModalOpen(true)}
                  >
                    Cancel Auction
                  </S.Button>
                </div>
              </S.ButtonContainer>
            )}
          {(auctionStatus === 'upcoming-auction' ||
            auctionStatus === 'active-auction-bid-owner') &&
            selectedTab === 'auction' && (
              <S.ButtonContainer>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                  }}
                >
                  <S.BidAmount>${bids[0].bidAmt}</S.BidAmount>
                  <S.Text
                    color="#7c7c7c"
                    size="16px"
                    fontWeight={500}
                    style={{ padding: '0' }}
                  >
                    Current Bid
                  </S.Text>
                </div>
              </S.ButtonContainer>
            )}
        </S.Header>

        <S.TabBar>
          {((product?.activeProductListings.length !== 0 &&
            product?.activeProductListings[0]?.saleType === 'auction') ||
            (product?.upcomingProductListings.length !== 0 &&
              product?.upcomingProductListings[0]?.saleType === 'auction')) && (
            <>
              <S.Tab
                themeStyle={'light'}
                selected={selectedTab === 'auction'}
                onClick={() => setSelectedTab('auction')}
              >
                Auction
              </S.Tab>
              <S.Padding />
            </>
          )}
          <S.Tab
            themeStyle={themeStyle}
            selected={selectedTab === 'history'}
            onClick={() => setSelectedTab('history')}
          >
            History
          </S.Tab>

          <S.GrayLine
            marginRight={selectedTab === 'history'}
            width={selectedTab === 'history'}
          />
          {((product?.activeProductListings.length !== 0 &&
            product?.activeProductListings[0]?.saleType === 'auction') ||
            (product?.upcomingProductListings.length !== 0 &&
              product?.upcomingProductListings[0]?.saleType === 'auction')) &&
            selectedTab === 'auction' && (
              <S.TextContainer borderBottom={true}>
                <S.Text color="#9e9e9e" size="18px" fontWeight={600}>
                  Expires in
                </S.Text>
                <S.Text color="white" size="18px" fontWeight={600}>
                  {product?.activeProductListings[0] &&
                    formatCountdown(
                      new Date(product?.activeProductListings[0]?.endDate)
                    )}
                </S.Text>{' '}
                <S.Text color="#2e2e2e" size="14px" fontWeight={400}>
                  {product?.activeProductListings[0] &&
                    `(${formatDate(
                      new Date(product?.activeProductListings[0].endDate)
                    )})`}
                </S.Text>
              </S.TextContainer>
            )}
        </S.TabBar>
        {selectedTab === 'history' && (
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
                            filteredTransactions[
                              filteredTransactions.length - 2
                            ]._id
                          }
                          transaction={
                            filteredTransactions[
                              filteredTransactions.length - 2
                            ]
                          }
                        />
                      );
                    } else if (index === filteredTransactions.length - 2) {
                      return (
                        <Transaction
                          key={
                            filteredTransactions[
                              filteredTransactions.length - 1
                            ]._id
                          }
                          transaction={
                            filteredTransactions[
                              filteredTransactions.length - 1
                            ]
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
        )}
        {selectedTab === 'auction' && (
          <>
            <S.TransactionHistory>
              {product?.upcomingProductListings.length !== 0 ? (
                <S.BidsContainer>
                  Starts at ${product?.upcomingProductListings[0].minBid} in{' '}
                  {product?.upcomingProductListings[0].startDate &&
                    formatCountdown(
                      new Date(product.upcomingProductListings[0].startDate)
                    )}{' '}
                  {product?.upcomingProductListings[0].startDate &&
                    formatDate(
                      new Date(product.upcomingProductListings[0].startDate)
                    )}
                </S.BidsContainer>
              ) : bids.length === 0 &&
                auctionStatus === 'active-auction-no-bid-owner' ? (
                <>
                  <S.BidsContainer>No bids placed yet</S.BidsContainer>
                  <S.TextContainer paddingTop="32px">
                    <S.Text color="#9e9e9e" size="16px" fontWeight={600}>
                      Started at
                    </S.Text>
                    <S.Text color="white" size="16px" fontWeight={600}>
                      ${product?.activeProductListings[0].minBid}
                    </S.Text>{' '}
                    <S.Text color="#9e9e9e" size="16px" fontWeight={500}>
                      on
                    </S.Text>
                    <S.Text color="#9e9e9e" size="16px" fontWeight={500}>
                      {product?.activeProductListings[0] &&
                        `${formatDate(
                          new Date(product?.activeProductListings[0].startDate)
                        )}`}
                    </S.Text>
                  </S.TextContainer>
                </>
              ) : auctionStatus === 'active-auction-bid-owner' ? (
                <S.BidsHistory>
                  {bids instanceof Array &&
                    bids.map((bid) => {
                      return <Transaction key={bid._id} bid={bid} />;
                    })}
                </S.BidsHistory>
              ) : (
                auctionStatus === 'active-auction-bid-user' && (
                  <>
                    <S.BidsHistory>
                      <S.PlaceBidsContainer>
                        <S.FlexDiv width="60%">
                          <img src={BidIcon} alt="" />
                          <S.AmountInput
                            name="amount-input"
                            placeholder={`Place a bid higher than $${bids[0]?.bidAmt}`}
                            decimalsLimit={2}
                            onChange={(e) => setBidAmount(e.target.value)}
                            maxLength={10}
                            step={10}
                            defaultValue={0.0}
                            allowNegativeValue={false}
                          />
                        </S.FlexDiv>
                        <S.PlaceBidButton
                          active={
                            bidAmount !== '' && parseFloat(bidAmount) !== 0
                          }
                          disabled={
                            bidAmount === '' || parseFloat(bidAmount) === 0
                          }
                          onClick={handleBid}
                        >
                          Place Bid
                        </S.PlaceBidButton>
                      </S.PlaceBidsContainer>
                      {bids instanceof Array &&
                        bids.map((bid) => {
                          return <Transaction key={bid._id} bid={bid} />;
                        })}
                    </S.BidsHistory>
                  </>
                )
              )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '30px',
                }}
              >
                <S.StyledPagination
                  themeStyle={themeStyle}
                  page={page}
                  count={Math.ceil(totalBids / perPage)}
                  onChange={handlePagination}
                  siblingCount={matchesMobile ? 0 : 1}
                />
                <S.FlexDiv>
                  <S.Text color="#9e9e9e" size="16px" fontWeight={500}>
                    Started at
                  </S.Text>
                  <S.Text color="white" size="16px" fontWeight={600}>
                    ${product?.activeProductListings[0]?.minBid}
                  </S.Text>
                  <S.Text color="#9e9e9e" size="16px" fontWeight={500}>
                    on{' '}
                    {product &&
                      formatDate(
                        new Date(product?.activeProductListings[0]?.startDate)
                      )}
                  </S.Text>
                </S.FlexDiv>
              </div>
            </S.TransactionHistory>
          </>
        )}
      </S.Container>
      {/* {product && historyStatus !== ('create-sale' || 'buy-now') && (
        <ModalPayment
          visible={isModalOpen}
          setModalPaymentVisible={setIsModalOpen}
          product={product}
          mode={modalMode}
          historyStatus={historyStatus}
          activeAmount={1400}
        />
      )} */}
      {product && historyStatus === 'buy-now' && (
        <BuyNowModal
          setModalPaymentVisible={setIsModalOpen}
          product={product}
          serialNum={product.serialNumber}
          visible={isModalOpen}
          mode={modalMode}
          setStatus={setHistoryStatus}
        />
      )}
      {product && historyStatus === 'active-sale' && (
        <CancelSale
          setModalPaymentVisible={setIsCancelModalOpen}
          visible={isCancelModalOpen}
          listingId={product?.activeProductListings[0]?._id}
          setStatus={setHistoryStatus}
        />
      )}
      {product && historyStatus === 'owner' && (
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
            setStatus={setHistoryStatus}
            setActiveSalePrice={setActiveSalePrice}
            setSaleModal={setIsSaleModalOpen}
            isModalOpen={isSaleModalOpen}
          />
          {/* <AuctionModal
            setModalAuctionVisible={setIsAuctionModalOpen}
            product={product}
            serialNum={product.serialNumber}
            visible={isAuctionModalOpen}
          /> */}
        </>
      )}
      {product && auctionStatus === 'upcoming-auction' && (
        <CancelSale
          setModalPaymentVisible={setIsCancelModalOpen}
          visible={isCancelModalOpen}
          listingId={product?.activeProductListings[0]?._id}
          setStatus={setHistoryStatus}
        />
      )}
      {selectedTab === 'auction' && product && (
        <BidModal
          setModalBidVisible={setIsBidModalOpen}
          product={product}
          visible={isBidModalOpen}
          bidAmount={240}
        />
      )}
    </>
  );
};

export default History;
