import { AuctionStatus, HistoryStatus } from './types';
import { getBids, getPrivateAssets } from 'services/api/productService';
import { useCountdown } from 'hooks/useCountdown';
export class Util {
  product;
  isAuthenticated;
  loggedInUser;
  bidIncrement;
  bids;
  privateAssets;
  auctionPage;
  perPage;
  setBids;
  setTotalBids;
  transactionHistory;
  bidAmount;
  setPrivateAssets;

  constructor(
    product,
    isAuthenticated,
    loggedInUser,
    bids,
    privateAssets,
    auctionPage = 5,
    perPage,
    setBids,
    setTotalBids,
    transactionHistory,
    bidAmount,
    setPrivateAssets
  ) {
    this.product = product;
    this.isAuthenticated = isAuthenticated;
    this.loggedInUser = loggedInUser;
    this.bidIncrement =
      product?.activeProductListings[0]?.auctionBidIncrement || 1;

    this.privateAssets = privateAssets;
    this.bids = bids;
    this.auctionPage = auctionPage;
    this.perPage = perPage;
    this.setBids = setBids;
    this.setTotalBids = setTotalBids;
    this.transactionHistory = transactionHistory;
    this.bidAmount = bidAmount;
    this.setPrivateAssets = setPrivateAssets;
  }

  getHistoryStatus = (): HistoryStatus => {
    const isAuction =
      this.product?.activeProductListings[0]?.saleType === 'auction' ||
      this.product?.upcomingProductListings[0]?.saleType === 'auction';
    const activeListings = this.product?.activeProductListings?.length !== 0;
    const upcomingListings =
      this.product?.upcomingProductListings?.length !== 0;

    if (isAuction && upcomingListings && !activeListings)
      return 'upcoming-auction';
    if (isAuction && !upcomingListings && activeListings)
      return 'active-auction';
    if (this.isAuthenticated) {
      const userIsOwner = this.loggedInUser.id === this.product?.owner._id;
      if (userIsOwner && !activeListings && !upcomingListings) return 'owner';

      if (userIsOwner && activeListings && !upcomingListings)
        return 'active-sale';
    }

    if (!activeListings && !upcomingListings && !isAuction)
      return 'not-for-sale';
    if (activeListings && !upcomingListings && !isAuction) return 'buy-now';
    if (!activeListings && upcomingListings && !isAuction) return 'upcoming';
    return '';
  };

  getAuctionStatus = (): AuctionStatus => {
    const upcomingListings =
      this.product?.upcomingProductListings?.length !== 0;
    const activeListings = this.product?.activeProductListings?.length !== 0;
    const areBids = this.bids.length !== 0;
    const userIsOwner = this.product?.owner?._id === this.loggedInUser.id;
    const isAuction =
      this.product?.activeProductListings[0]?.saleType === 'auction' ||
      this.product?.upcomingProductListings[0]?.saleType === 'auction';

    if (userIsOwner) {
      if (!upcomingListings && activeListings && !areBids)
        return 'active-auction-no-bid-owner';
      if (!upcomingListings && activeListings && areBids)
        return 'active-auction-bid-owner';
      if (upcomingListings && !activeListings && isAuction)
        return 'upcoming-auction-owner';
    }

    if (upcomingListings && !activeListings && isAuction)
      return 'upcoming-auction-user';
    if (!upcomingListings && activeListings && areBids)
      return 'active-auction-bid-user';
    if (!upcomingListings && activeListings && !areBids)
      return 'active-auction-no-bid-user';

    return '';
  };

  countDown = () => {
    const parsedStartDate =
      this.product &&
      new Date(
        this.product?.activeProductListings[0]?.endDate ||
          this.product?.upcomingProductListings[0]?.startDate
      );
    return useCountdown(parsedStartDate);
  };

  productListingExists = () => {
    return (
      this.product?.activeProductListings.some(
        (item) => item._id === this.product._id
      ) ||
      this.product?.upcomingProductListings.some(
        (item) => item._id === this.product._id
      )
    );
  };

  getPriceWithFee = () => {
    let bidComparer = 0;
    if (this.product)
      bidComparer =
        this.bidAmount * (1 + this.product?.resaleBuyersFeePercentage / 100);
    return bidComparer;
  };

  getMinBid = () => {
    if (!this.product) return 0;
    return this.bids.length === 0
      ? this.product.activeProductListings[0].minBid
      : this.bids[0].bidAmt + this.bidIncrement;
  };

  fetchBids = async () => {
    const res = await getBids(
      '',
      this.product?.activeProductListings[0]?._id,
      this.auctionPage,
      this.perPage
    );

    if (res) {
      this.setBids(res.data);
      this.setTotalBids(res.data[0]?.listing?.bids?.length);
    }
  };

  fetchPrivateAssets = async (token) => {
    const res = await getPrivateAssets(this.product.sku._id, token);
    if (res) {
      this.setPrivateAssets(res.data);
    }
  };

  auctionOrWillBeAuction = () =>
    (this.product?.activeProductListings.length !== 0 &&
      this.product?.activeProductListings[0]?.saleType === 'auction') ||
    (this.product?.upcomingProductListings.length !== 0 &&
      this.product?.upcomingProductListings[0]?.saleType === 'auction');

  isActiveAuction = () =>
    this.product?.activeProductListings.length !== 0 &&
    this.product?.activeProductListings[0]?.saleType === 'auction' &&
    this.product?.upcomingProductListings.length === 0;

  isUpcomingAuction = () =>
    this.product?.activeProductListings.length === 0 &&
    this.product?.activeProductListings[0]?.saleType === 'auction' &&
    this.product?.upcomingProductListings.length !== 0;
}
