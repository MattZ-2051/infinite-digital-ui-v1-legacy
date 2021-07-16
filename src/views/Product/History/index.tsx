import { useState, useEffect } from 'react';
import { ProductWithFunctions } from 'entities/product';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from 'store/hooks';
import { ITransaction } from 'entities/transaction';
import { Bid } from 'entities/bid';
import CreateSale from '../Modal/CreateSale';
import RedeemModal from '../Modal/Redeem';
import AuctionModal from '../Modal/Auction';
import BidModal from '../Modal/Bid';
import { useHistory } from 'react-router-dom';
import BuyNowModal from '../Modal/BuyNow';
import CancelSale from '../Modal/CancelSale';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useCountdown } from 'hooks/useCountdown';
import * as S from './styles';
// import OwnerAccessList from 'views/Product/OwnerAccess/assetList';
import OwnerAccess from 'views/Product/OwnerAccess';
import { Util } from './util';
import { Handlers } from './handlers';
import { HistoryStatus, AuctionStatus, tabSelect } from './types';
import padlock from 'assets/svg/icons/padlock-icon.svg';
import * as PP from './PageParts';

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
  //Hooks
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  const [selectedTab, setSelectedTab] = useState<tabSelect>('history');
  const history = useHistory();
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [themeStyle, setThemeStyle] = useState<'light' | 'dark'>('dark');
  const [historyStatus, setHistoryStatus] = useState<HistoryStatus>('');
  const [auctionStatus, setAuctionStatus] = useState<AuctionStatus>('');
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [isSaleModalOpen, setIsSaleModalOpen] = useState<boolean>(false);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState<boolean>(false);
  const [isAuctionModalOpen, setIsAuctionModalOpen] = useState<boolean>(false);
  const [isBidModalOpen, setIsBidModalOpen] = useState<boolean>(false);
  const [bids, setBids] = useState<Bid[]>([]);
  const [privateAssets, setPrivateAssets] = useState<any>([]);
  const [bidAmount, setBidAmount] = useState<string | undefined>('');
  const [totalBids, setTotalBids] = useState<number>(1);
  const [token, setToken] = useState<string>('');
  const [activeSalePrice, setActiveSalePrice] = useState<number | undefined>(
    product?.activeProductListings[0]?.price
  );
  const userBalance = useAppSelector(
    (state) => state.session.user?.availableBalance
  );

  //Constants
  const perPage = 5;
  const listingId =
    product?.activeProductListings?.length === 0
      ? product.upcomingProductListings[0]?._id
      : product?.activeProductListings[0]?._id;

  const [auctionPage, setAuctionPage] = useState<number>(1);
  const price = product?.listing?.price;
  const modalMode = price && userBalance >= price ? 'hasFunds' : 'noFunds';
  const loggedInUser = useAppSelector((state) => state.session.user);
  const parsedStartDate =
    product &&
    new Date(
      product?.activeProductListings[0]?.endDate ||
        product?.upcomingProductListings[0]?.startDate
    );
  const countdown = parsedStartDate && useCountdown(parsedStartDate);
  const marketPlaceUrl = '/marketplace?page=1&per_page=6&sortBy=startDate:asc';

  //clases
  const util = new Util(
    product,
    isAuthenticated,
    loggedInUser,
    bids,
    privateAssets,
    auctionPage,
    perPage,
    setBids,
    setTotalBids,
    transactionHistory,
    bidAmount,
    setPrivateAssets
  );
  const handlers = new Handlers(
    setIsModalOpen,
    loginWithRedirect,
    util,
    history,
    setIsSaleModalOpen,
    userBalance,
    setIsBidModalOpen,
    setAuctionPage,
    setHistoryPage,
    selectedTab
  );

  //effects.

  useEffect(() => {
    setAuctionPage(1);
  }, [selectedTab]);

  useEffect(() => {
    if (selectedTab === 'history') {
      setHistoryStatus(util.getHistoryStatus());
    }

    if (selectedTab === 'auction') {
      setAuctionStatus(util.getAuctionStatus());
    }
  }, [selectedTab]);

  useEffect(() => {
    util.fetchBids();
  }, [auctionPage]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchToken = async () => {
        const token = await getAccessTokenSilently();
        setToken(token);
      };
      fetchToken();
      util.fetchPrivateAssets(token);
    }
  }, [token]);

  if (historyStatus === '' || !handlers) return <></>;

  return (
    <>
      <S.Container>
        <PP.Title product={product} marketPlaceUrl={marketPlaceUrl} />
        <PP.Header
          product={product}
          isOwner={product?.owner._id === loggedInUser.id}
          handlers={handlers}
          historyStatus={historyStatus}
          setIsRedeemModalOpen={setIsRedeemModalOpen}
          setIsAuctionModalOpen={setIsAuctionModalOpen}
          activeSalePrice={activeSalePrice}
          setIsCancelModalOpen={setIsCancelModalOpen}
          auctionStatus={auctionStatus}
          setSelectedTab={setSelectedTab}
        />

        {util.isActiveAuction() &&
          selectedTab === 'auction' &&
          matchesMobile && (
            <PP.AuctionCountDown product={product} countdown={countdown} />
          )}

        <PP.TabBar
          util={util}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          themeStyle={themeStyle}
          auctionStatus={auctionStatus}
        />

        {selectedTab === 'history' && (
          <PP.TransactionHistory
            themeStyle={themeStyle}
            historyPage={historyPage}
            totalTransactions={totalTransactions}
            handlers={handlers}
            util={util}
          />
        )}
        {selectedTab === 'auction' && (
          <PP.Auction
            util={util}
            handlers={handlers}
            auctionStatus={auctionStatus}
            setBidAmount={setBidAmount}
            themeStyle={themeStyle}
            totalBids={totalBids}
          />
        )}

        {product && selectedTab === 'owner_access' && (
          <>
            <OwnerAccess
              productId={product._id}
              skuId={product.sku._id}
              themeStyle={'dark'}
              owner={loggedInUser.id === product.owner?._id}
            />
          </>
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
          listingId={listingId}
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
            listingId={listingId}
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
