import * as S from '../styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import padlock from 'assets/svg/icons/padlock-icon.svg';
import { useCountdown } from 'hooks/useCountdown';
import { useEffect } from 'react';
import MobileDropDown from '../components/mobileTabDropDown';
import { Util } from '../util';

const getTabOptionsArr = (isAuctionOrWillBe, arePrivateAssets) => {
  const options: ['History' | 'Auction' | 'Owner Access'] = ['History'];
  isAuctionOrWillBe && options.unshift('Auction');
  arePrivateAssets && options.push('Owner Access');
  return options;
};

export const TabBar = ({
  util,
  selectedTab,
  setSelectedTab,
  themeStyle,
  auctionStatus,
}) => {
  const isAuctionOrWillBe = util.auctionOrWillBeAuction();
  const isActiveAuction = util.isActiveAuction();
  const isPastAuction = util.isPastAuction();
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const parsedStartDate =
    util.product && new Date(util.product?.activeProductListings[0]?.endDate);
  const countdown = parsedStartDate && useCountdown(parsedStartDate);

  const arePrivateAssets = util?.privateAssets?.length > 0;

  const isUserOwner = util.loggedInUser.id === util.product?.owner?._id;

  useEffect(() => {
    if (countdown === '0h 0m 0s' || countdown.includes('-')) {
      window.location.reload();
    }
  }, [countdown]);

  useEffect(() => {
    if (isActiveAuction || isPastAuction) {
      setSelectedTab('auction');
    }
  }, []);

  const DesktopLayout = () => {
    return (
      <>
        {(isActiveAuction || isPastAuction) && (
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
        {arePrivateAssets && (
          <S.Tab
            themeStyle={themeStyle}
            selected={selectedTab === 'owner_access'}
            onClick={() => setSelectedTab('owner_access')}
          >
            <S.ContainerImgLabel>
              {!isUserOwner && <img src={padlock} alt="padlock-icon"></img>}{' '}
              <S.LabelOwnerAccess>Owner Access</S.LabelOwnerAccess>
            </S.ContainerImgLabel>
          </S.Tab>
        )}

        <S.GrayLine paddingBottom="38px" marginRight="80px" />
      </>
    );
  };

  return (
    <S.TabBar>
      {matchesMobile ? (
        <MobileDropDown
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          tabOptions={getTabOptionsArr(isAuctionOrWillBe, arePrivateAssets)}
          auctionStatus={auctionStatus}
          matchesMobile={matchesMobile}
        />
      ) : (
        <DesktopLayout />
      )}
    </S.TabBar>
  );
};
