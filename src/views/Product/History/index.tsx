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
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useOutsideAlert } from 'hooks/oustideAlerter';
import { formatCountdown, formatDate } from 'utils/dates';
import { getBids } from 'services/api/productService';
import BidIcon from 'assets/img/icons/bid-dollar-icon.png';
import { useCountdown } from 'hooks/useCountdown';
import * as S from './styles';
import OwnerAccessList from 'views/Product/OwnerAccess';
import padlock from 'assets/svg/icons/padlock-icon.svg';

export type HistoryStatus =
  | 'not-for-sale'
  | 'buy-now'
  | 'create-sale'
  | 'active-sale'
  | 'upcoming'
  | 'upcoming-auction'
  | 'owner'
  | 'active-auction'
  | '';

export type AuctionStatus =
  | 'active-auction-no-bid-owner'
  | 'active-auction-no-bid-user'
  | 'upcoming-auction-owner'
  | 'upcoming-auction-user'
  | 'active-auction-bid-owner'
  | 'active-auction-bid-user'
  | '';

interface Props {
  product: ProductWithFunctions | null;
  transactionHistory: ITransaction[];
  totalTransactions: number;
  historyPage: number;
  setHistoryPage: (a: number) => void;
}

const History = ({
  product,
  transactionHistory,
  totalTransactions,
  historyPage,
  setHistoryPage,
}: Props): JSX.Element => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const [showLink, setShowLink] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<
    'history' | 'auction' | 'owner_access'
  >('history');
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

  const [bidAmount, setBidAmount] = useState<string | undefined>('');
  const [totalBids, setTotalBids] = useState<number>(1);
  const userBalance = useAppSelector(
    (state) => state.session.user?.availableBalance
  );
  const [activeSalePrice, setActiveSalePrice] = useState<number | undefined>(
    product?.activeProductListings[0]?.price
  );
  const [auctionPage, setAuctionPage] = useState<number>(1);
  const perPage = 4;
  const price = product?.listing?.price;
  const hasFunds = price ? userBalance >= price : false;
  const modalMode = hasFunds ? 'hasFunds' : 'noFunds';

  const bidIncrement =
    product?.activeProductListings[0]?.auctionBidIncrement || 1;

  const loggedInUser = useAppSelector((state) => state.session.user);
  const parsedStartDate =
    product &&
    new Date(
      product?.activeProductListings[0]?.endDate ||
        product?.upcomingProductListings[0]?.startDate
    );
  const countdown = parsedStartDate && useCountdown(parsedStartDate);

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
    if (!product) return;
    if (!isAuthenticated) return loginWarning();
    if (!bidAmount) return bidIsEmpty();

    const minPrice = getMinBid();
    let parsedBidAmount = 0;
    if (bidAmount) parsedBidAmount = parseFloat(bidAmount);

    if (parsedBidAmount < minPrice) return higherBidNeeded();
    if (
      userBalance < parsedBidAmount ||
      userBalance < getPriceWithFee(bidAmount)
    )
      return insuficientFounds(bidAmount);
    if (parsedBidAmount >= minPrice) return setIsBidModalOpen(true);
  };

  const getPriceWithFee = (bidAmount) => {
    let bidComparer = 0;
    if (product)
      bidComparer = bidAmount * (1 + product?.resaleBuyersFeePercentage / 100);
    return bidComparer;
  };

  const getMinBid = () => {
    if (!product) return 0;
    return bids.length === 0
      ? product.activeProductListings[0].minBid
      : bids[0].bidAmt + bidIncrement;
  };

  const insuficientFounds = (bidAmount) => {
    Toast.error(
      <>
        Whoops, insufficient funds! Your available balance is ${userBalance} and
        you need ${getPriceWithFee(bidAmount).toFixed(2)} to cover the bid and
        marketplace fee. Click{' '}
        <a onClick={() => history.push('/wallet')}>click here</a> to deposit
        more funds.
      </>
    );
  };

  const bidIsEmpty = () => {
    Toast.error(`Whoops, you forgot to write your bid!`);
  };

  const higherBidNeeded = () => {
    Toast.error(
      `Whoops, new bids must be at least $${bidIncrement} greater than the current highest bid.`
    );
  };

  const loginWarning = () => {
    return Toast.warning(
      <>
        You need to{' '}
        <a onClick={() => loginWithRedirect({ screen_hint: 'signup' })}>
          Log in
        </a>{' '}
        in order to complete the purchase
      </>
    );
  };

  useEffect(() => {
    setAuctionPage(1);
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
    if (selectedTab === 'auction') {
      setAuctionPage(value);
    } else if (selectedTab === 'history') {
      setHistoryPage(value);
    }
  };

  const fetchBids = async () => {
    const res = await getBids(
      '',
      product?.activeProductListings[0]?._id,
      auctionPage,
      perPage
    );
    if (res) {
      setBids(res.data);
      setTotalBids(res.data[0]?.listing?.bids?.length);
    }
  };

  useEffect(() => {
    if (selectedTab === 'history') {
      if (
        (product?.activeProductListings[0]?.saleType === 'auction' ||
          product?.upcomingProductListings[0]?.saleType === 'auction') &&
        product?.upcomingProductListings.length !== 0
      ) {
        setHistoryStatus('upcoming-auction');
      } else if (
        (product?.activeProductListings[0]?.saleType === 'auction' ||
          product?.upcomingProductListings[0]?.saleType === 'auction') &&
        product?.activeProductListings.length !== 0 &&
        product?.owner?._id !== loggedInUser?.id
      ) {
        setHistoryStatus('active-auction');
      } else {
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
    }

    if (selectedTab === 'auction' && product?.owner?._id === loggedInUser.id) {
      if (
        product?.upcomingProductListings?.length !== 0 &&
        product?.activeProductListings?.length === 0 &&
        product?.upcomingProductListings[0]?.saleType === 'auction'
      ) {
        setAuctionStatus('upcoming-auction-owner');
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
    } else if (selectedTab === 'auction') {
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
        setAuctionStatus('upcoming-auction-user');
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
  }, [auctionPage]);

  if (historyStatus === '') return <></>;

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
          <S.Row
            alignItems={matchesMobile ? 'flex-start' : 'center'}
            flexDirection={matchesMobile ? 'column' : 'row'}
          >
            <S.ProductId>
              #{product?.serialNumber} {!matchesMobile && <S.Slash>/</S.Slash>}
            </S.ProductId>
            <S.ProductOwner
              padding={matchesMobile ? '10px 0 10px 0' : '0'}
              flexDirection="column"
            >
              Owner
              <S.Owner onClick={handleRedirectToOwnerPage}>
                @{product?.owner.username}
              </S.Owner>
            </S.ProductOwner>
            {product?.sku.redeemable &&
              (product?.redeemedStatus === 'NA' ? (
                <>
                  {!matchesMobile && <S.Slash>/</S.Slash>}
                  <S.FlexDiv padding={matchesMobile ? '0' : '0 0 0 16px'}>
                    <S.RedeemIcon />
                    <S.Redeemed color="white">Redeemable</S.Redeemed>
                  </S.FlexDiv>
                </>
              ) : (
                <>
                  {!matchesMobile && <S.Slash>/</S.Slash>}

                  <S.FlexDiv padding="0 0 0 16px">
                    <S.IsRedeemedIcon />
                    <S.Redeemed color="#7c7c7c">Redeemed</S.Redeemed>
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
                <S.Button
                  hover={false}
                  width="130px"
                  height="40px"
                  fontSize="16px"
                >
                  Upcoming
                </S.Button>
              </S.ButtonContainer>
            </>
          )}
          {historyStatus === 'upcoming-auction' &&
            selectedTab === 'history' &&
            product && (
              <S.FlexColumn padding="0 80px 0 0">
                <S.Text color="white" size="24px" fontWeight={600}>
                  Upcoming Auction
                </S.Text>
                <S.Text size="14px" color="#999999" fontWeight={500}>
                  (Starts{' '}
                  {formatDate(product?.upcomingProductListings[0]?.startDate)})
                </S.Text>
              </S.FlexColumn>
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
          {historyStatus === 'active-auction' && selectedTab === 'history' && (
            <S.ButtonContainer>
              <S.Button
                hover={true}
                width="160px"
                height="56px"
                fontSize="20px"
                onClick={() => setSelectedTab('auction')}
              >
                Bid Now
              </S.Button>
            </S.ButtonContainer>
          )}
          {historyStatus === 'buy-now' && selectedTab === 'history' && (
            <S.ButtonContainer>
              <S.Button
                onClick={handleSaleAction}
                hover={true}
                width="190px"
                height="40px"
                fontSize="16px"
              >
                Buy Now for ${product?.activeProductListings[0]?.price}
              </S.Button>
            </S.ButtonContainer>
          )}
          {historyStatus === 'create-sale' && selectedTab === 'history' && (
            <S.ButtonContainer>
              <S.Button
                onClick={handleSaleAction}
                width="130px"
                hover={true}
                height="40px"
                fontSize="16px"
              >
                List for sale
              </S.Button>
            </S.ButtonContainer>
          )}
          {historyStatus === 'active-sale' &&
            selectedTab === 'history' &&
            product?.activeProductListings[0].saleType !== 'auction' &&
            matchesMobile && (
              <S.ButtonContainer flexDirection="column">
                {' '}
                <S.FlexColumn padding="0">
                  <S.ActiveAmount>${activeSalePrice}</S.ActiveAmount>
                  <div style={{ display: 'flex' }}>
                    <S.StatusText>Status:</S.StatusText>
                    <S.ActiveText>active</S.ActiveText>
                  </div>
                </S.FlexColumn>{' '}
                <S.Button
                  width="130px"
                  onClick={() => setIsCancelModalOpen(true)}
                  hover={true}
                  height="40px"
                  fontSize="16px"
                >
                  Cancel Sale
                </S.Button>
              </S.ButtonContainer>
            )}
          {historyStatus === 'active-sale' &&
            selectedTab === 'history' &&
            product?.activeProductListings[0].saleType !== 'auction' &&
            !matchesMobile && (
              <S.ButtonContainer flexDirection="row">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <S.FlexColumn padding={'0 16px 0 0'}>
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
                    height="40px"
                    fontSize="16px"
                  >
                    Cancel Sale
                  </S.Button>
                </div>
              </S.ButtonContainer>
            )}

          {(auctionStatus === 'upcoming-auction-owner' ||
            auctionStatus === 'active-auction-no-bid-owner') &&
            selectedTab === 'auction' && (
              <S.ButtonContainer>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <S.Button
                    width="160px"
                    hover={true}
                    onClick={() => setIsCancelModalOpen(true)}
                    height="40px"
                    fontSize="16px"
                  >
                    Cancel Auction
                  </S.Button>
                </div>
              </S.ButtonContainer>
            )}
          {auctionStatus === 'active-auction-bid-owner' &&
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
        {product?.activeProductListings.length !== 0 &&
          product?.activeProductListings[0]?.saleType === 'auction' &&
          product?.upcomingProductListings.length === 0 &&
          selectedTab === 'auction' &&
          matchesMobile && (
            <S.FlexDiv justifyContent="flex-end" padding="0 0 10px 0">
              {' '}
              <S.Text color="#9e9e9e" size="18px" fontWeight={600}>
                Expires in
              </S.Text>
              <S.Text color="white" size="18px" fontWeight={600}>
                {product?.activeProductListings[0] && countdown}
              </S.Text>{' '}
            </S.FlexDiv>
          )}

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
          <S.Padding />

          <S.Tab
            themeStyle={themeStyle}
            selected={selectedTab === 'owner_access'}
            onClick={() => setSelectedTab('owner_access')}
          >
            <S.ContainerImgLabel>
              {loggedInUser.id !== product?.owner?._id && (
                <img src={padlock} alt="padlock-icon"></img>
              )}{' '}
              <S.LabelOwnerAccess>Owner Access</S.LabelOwnerAccess>
            </S.ContainerImgLabel>
          </S.Tab>

          <S.GrayLine
            marginRight={
              selectedTab === 'history' ||
              auctionStatus.split('-')[0] === 'upcoming'
            }
            width={
              selectedTab === 'history' ||
              auctionStatus.split('-')[0] === 'upcoming'
            }
          />
          {product?.activeProductListings.length !== 0 &&
            product?.activeProductListings[0]?.saleType === 'auction' &&
            selectedTab === 'auction' &&
            (matchesMobile ? (
              <S.TextContainer
                borderBottom={true}
                marginRight="0"
                padding="0 0 0 10px"
              >
                {' '}
                <S.Text color="#7c7c7c" size="14px" fontWeight={400}>
                  {product?.activeProductListings[0] &&
                    `(${formatDate(
                      new Date(product?.activeProductListings[0].endDate)
                    )})`}
                </S.Text>
              </S.TextContainer>
            ) : (
              <S.TextContainer borderBottom={true}>
                <S.Text color="#9e9e9e" size="18px" fontWeight={600}>
                  Expires in
                </S.Text>
                <S.Text color="white" size="18px" fontWeight={600}>
                  {product?.activeProductListings[0] && countdown}
                </S.Text>{' '}
                <S.Text color="#7c7c7c" size="14px" fontWeight={400}>
                  {product?.activeProductListings[0] &&
                    `(${formatDate(
                      new Date(product?.activeProductListings[0].endDate)
                    )})`}
                </S.Text>
              </S.TextContainer>
            ))}
        </S.TabBar>
        {selectedTab === 'history' && (
          <>
            <S.TransactionHistory>
              <S.TransactionContainer>
                {transactionHistory instanceof Array &&
                  transactionHistory.map((tx, index) => {
                    return <Transaction key={tx._id} transaction={tx} />;
                  })}
              </S.TransactionContainer>
              <S.StyledPagination
                themeStyle={themeStyle}
                page={historyPage}
                count={Math.ceil(totalTransactions / perPage)}
                onChange={handlePagination}
                siblingCount={matchesMobile ? 0 : 1}
                padding="32px 0 0 0"
              />
            </S.TransactionHistory>
          </>
        )}
        {selectedTab === 'auction' && (
          <>
            <S.TransactionHistory>
              {product?.upcomingProductListings.length !== 0 ? (
                <S.BidsContainer padding="22px 0px">
                  <S.Text color="white" size="18px" fontWeight={600}>
                    Starts at ${product?.upcomingProductListings[0].minBid} in{' '}
                    {countdown}{' '}
                  </S.Text>
                  <S.Text color="#7c7c7c" size="14px" fontWeight={400}>
                    (
                    {product?.upcomingProductListings[0].startDate &&
                      formatDate(
                        new Date(product.upcomingProductListings[0].startDate)
                      )}
                    )
                  </S.Text>
                </S.BidsContainer>
              ) : bids.length === 0 &&
                auctionStatus === 'active-auction-no-bid-owner' ? (
                <>
                  <S.BidsContainer padding="32px 0px">
                    No bids placed yet
                  </S.BidsContainer>
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
                (auctionStatus === 'active-auction-bid-user' ||
                  auctionStatus === 'active-auction-no-bid-user') && (
                  <S.BidsHistory>
                    {matchesMobile ? (
                      <S.MobileContainer>
                        <S.FlexDiv width="100%">
                          <img src={BidIcon} alt="" />
                          <S.AmountInput
                            name="amount-input"
                            placeholder={`Place a bid higher or equal to $${getMinBid()}`}
                            decimalsLimit={2}
                            onValueChange={(val) => setBidAmount(val)}
                            defaultValue={0.0}
                            maxLength={10}
                            allowNegativeValue={false}
                            value={bidAmount ? bidAmount : ''}
                            step={10}
                          />
                        </S.FlexDiv>
                        <S.PlaceBidButton
                          active={!!bidAmount}
                          onClick={handleBid}
                          width="100%"
                        >
                          Place Bid
                        </S.PlaceBidButton>
                      </S.MobileContainer>
                    ) : (
                      <S.PlaceBidsContainer>
                        <S.FlexDiv width="65%">
                          <img src={BidIcon} alt="" />
                          <S.AmountInput
                            name="amount-input"
                            placeholder={`Place a bid higher or equal to $${getMinBid()}`}
                            decimalsLimit={2}
                            onValueChange={(val) => setBidAmount(val)}
                            defaultValue={0.0}
                            maxLength={10}
                            allowNegativeValue={false}
                            value={bidAmount ? bidAmount : ''}
                            step={10}
                          />
                        </S.FlexDiv>
                        <S.PlaceBidButton
                          active={!!bidAmount}
                          onClick={handleBid}
                        >
                          Place Bid
                        </S.PlaceBidButton>
                      </S.PlaceBidsContainer>
                    )}

                    {bids instanceof Array &&
                      bids.map((bid) => {
                        return <Transaction key={bid._id} bid={bid} />;
                      })}
                  </S.BidsHistory>
                )
              )}
              {auctionStatus !== 'upcoming-auction-owner' &&
                auctionStatus !== 'upcoming-auction-user' &&
                auctionStatus !== 'active-auction-no-bid-owner' &&
                auctionStatus !== 'active-auction-no-bid-user' &&
                (matchesMobile ? (
                  <S.FlexColumn alignItems="center" padding="32px 0 0 0">
                    {product?.activeProductListings.length !== 0 && (
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
                              new Date(
                                product?.activeProductListings[0]?.startDate
                              )
                            )}
                        </S.Text>
                      </S.FlexDiv>
                    )}
                    <S.StyledPagination
                      themeStyle={themeStyle}
                      page={auctionPage}
                      count={Math.ceil(totalBids / perPage)}
                      onChange={handlePagination}
                      siblingCount={matchesMobile ? 0 : 1}
                      padding="32px 0 0 0"
                    />
                  </S.FlexColumn>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingTop: '30px',
                    }}
                  >
                    <S.StyledPagination
                      themeStyle={themeStyle}
                      page={auctionPage}
                      count={Math.ceil(totalBids / perPage)}
                      onChange={handlePagination}
                      siblingCount={matchesMobile ? 0 : 1}
                    />

                    {product?.activeProductListings.length !== 0 && (
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
                              new Date(
                                product?.activeProductListings[0]?.startDate
                              )
                            )}
                        </S.Text>
                      </S.FlexDiv>
                    )}
                  </div>
                ))}
            </S.TransactionHistory>
            {auctionStatus.split('-')[0] !== 'upcoming' &&
              auctionStatus !== 'active-auction-no-bid-owner' &&
              auctionStatus !== 'active-auction-no-bid-user' && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '30px',
                    paddingRight: '80px',
                  }}
                >
                  <S.StyledPagination
                    themeStyle={themeStyle}
                    page={auctionPage}
                    count={Math.ceil(totalBids / perPage)}
                    onChange={handlePagination}
                    siblingCount={matchesMobile ? 0 : 1}
                  />

                  {product?.activeProductListings.length !== 0 && (
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
                            new Date(
                              product?.activeProductListings[0]?.startDate
                            )
                          )}
                      </S.Text>
                    </S.FlexDiv>
                  )}
                  {product?.upcomingProductListings.length !== 0 && (
                    <S.FlexDiv>
                      <S.Text color="#9e9e9e" size="16px" fontWeight={500}>
                        Started at
                      </S.Text>
                      <S.Text color="white" size="16px" fontWeight={600}>
                        ${product?.upcomingProductListings[0]?.minBid}
                      </S.Text>
                      <S.Text color="#9e9e9e" size="16px" fontWeight={500}>
                        on{' '}
                        {product &&
                          formatDate(
                            new Date(
                              product?.upcomingProductListings[0]?.startDate
                            )
                          )}
                      </S.Text>
                    </S.FlexDiv>
                  )}
                </div>
              )}
          </>
        )}

        {product && selectedTab === 'owner_access' && (
          <OwnerAccessList
            assets={product.sku?.nftPrivateAssets || []}
            owner={loggedInUser.id === product.owner?._id}
            productId={product._id}
          />
        )}
      </S.Container>
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
          modalType="sale"
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
          <AuctionModal
            setModalAuctionVisible={setIsAuctionModalOpen}
            product={product}
            serialNum={product.serialNumber}
            visible={isAuctionModalOpen}
          />
        </>
      )}
      {product &&
        (auctionStatus === 'upcoming-auction-owner' ||
          auctionStatus === 'active-auction-no-bid-owner') && (
          <CancelSale
            setModalPaymentVisible={setIsCancelModalOpen}
            visible={isCancelModalOpen}
            listingId={product?.activeProductListings[0]?._id}
            setStatus={setHistoryStatus}
            modalType="auction"
          />
        )}
      {product && selectedTab === 'auction' && isAuthenticated && bidAmount && (
        <BidModal
          product={product}
          visible={isBidModalOpen}
          setModalBidVisible={setIsBidModalOpen}
          bidAmount={bidAmount}
        />
      )}
    </>
  );
};

export default History;
