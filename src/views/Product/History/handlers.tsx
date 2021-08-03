import * as TM from './toastMessages';
import { Util } from './util';

export class Handlers {
  setIsModalOpen;
  loginWithRedirect;
  util: Util;
  history;
  setIsSaleModalOpen;
  userBalance;
  setIsBidModalOpen;
  setAuctionPage;
  setHistoryPage;
  selectedTab;
  setIsCancelModalOpen;

  constructor(
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
  ) {
    this.setIsModalOpen = setIsModalOpen;
    this.loginWithRedirect = loginWithRedirect;
    this.util = util;
    this.history = history;
    this.setIsSaleModalOpen = setIsSaleModalOpen;
    this.userBalance = userBalance;
    this.setIsBidModalOpen = setIsBidModalOpen;
    this.setAuctionPage = setAuctionPage;
    this.setHistoryPage = setHistoryPage;
    this.selectedTab = selectedTab;
    this.setIsCancelModalOpen = setIsCancelModalOpen;
  }

  handleRedirectToOwnerPage = () => {
    this.history.push(`/collection/${this.util.product?.owner.username}`);
  };

  handleSaleAction = () => {
    if (this.util.productListingExists()) {
      return TM.repeatedListingError();
    }
    if (!this.util.isAuthenticated)
      return TM.needToSignUp(this.loginWithRedirect);

    this.setIsModalOpen(true);
  };

  handleCreateSale = () => {
    if (this.util.productListingExists()) return TM.repeatedListingError();
    if (!this.util.isAuthenticated)
      return TM.needToSignUp(this.loginWithRedirect);

    this.setIsSaleModalOpen(true);
  };

  handleCancelSale = () => {
    if (this.util.productListingExists()) return TM.repeatedListingError();
    if (!this.util.isAuthenticated)
      return TM.needToSignUp(this.loginWithRedirect);
    this.setIsCancelModalOpen(true);
  };

  handleBid = () => {
    if (!this.util.product) return;
    if (!this.util.isAuthenticated)
      return TM.loginWarning(this.loginWithRedirect);
    if (!this.util.bidAmount) return TM.bidIsEmpty();

    const minPrice = this.util.getMinBid();
    const priceWithFee = this.util.getPriceWithFee();
    let parsedBidAmount = 0;
    if (this.util.bidAmount) parsedBidAmount = parseFloat(this.util.bidAmount);

    if (parsedBidAmount < minPrice) {
      return TM.higherBidNeeded(this.util.bidIncrement);
    }
    if (this.userBalance < parsedBidAmount || this.userBalance < priceWithFee)
      return TM.insuficientFounds(
        this.userBalance,
        priceWithFee.toFixed(2),
        this.history
      );
    if (parsedBidAmount >= minPrice) return this.setIsBidModalOpen(true);
  };

  handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    if (this.selectedTab === 'auction') {
      this.setAuctionPage(value);
    } else if (this.selectedTab === 'history') {
      this.setHistoryPage(value);
    }
  };
}
