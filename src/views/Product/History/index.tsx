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
import OwnerAccess from 'views/Product/OwnerAccess';
import { Util } from './util';
import { Handlers } from './handlers';
import { HistoryStatus, AuctionStatus, tabSelect, Modes } from './types';
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
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const [selectedTab, setSelectedTab] = useState<tabSelect>('history');
  const history = useHistory();
  const [statusMode, setStatusMode] = useState<Modes>('hasFunds');
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
  const loggedInUser = useAppSelector((state) => state.session.user);
  const marketPlaceUrl = '/marketplace';

  //clases
  // const txHistory = transactionHistory.filter((el) => {
  //   return el.status !== 'error';
  // });
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
    selectedTab,
    setIsCancelModalOpen
  );
  const isActiveAuction = util.isActiveAuction();
  const isPastAuction = util.isPastAuction();
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
  }, [selectedTab, totalBids]);

  useEffect(() => {
    if (isActiveAuction) {
      util.fetchBids();
    }
    if (isPastAuction) {
      util.fetchPastBids();
    }
  }, [auctionPage]);

  useEffect(() => {
    util.fetchPrivateAssets();
  }, [product?.sku?._id]);

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
          util={util}
        />

        <PP.StatusBar
          util={util}
          auctionStatus={auctionStatus}
          historyStatus={historyStatus}
          handlers={handlers}
          listingStatus={statusMode}
          setBidAmount={setBidAmount}
          setAuctionStatus={setAuctionStatus}
        />

        <div style={{ height: matchesMobile ? '' : '75vh' }}>
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
              themeStyle={themeStyle}
              totalBids={totalBids}
            />
          )}

          {product && selectedTab === 'owner_access' && (
            <>
              <OwnerAccess
                productId={product._id}
                skuId={product.sku._id}
                themeStyle={themeStyle}
                owner={loggedInUser && loggedInUser.id === product.owner?._id}
              />
            </>
          )}
        </div>
      </S.Container>
      {product && historyStatus === 'buy-now' && (
        <BuyNowModal
          setModalPaymentVisible={setIsModalOpen}
          product={product}
          serialNum={product.serialNumber}
          visible={isModalOpen}
          statusMode={statusMode}
          setStatusMode={setStatusMode}
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
