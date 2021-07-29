import * as S from '../styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import padlock from 'assets/svg/icons/padlock-icon.svg';
import { formatDate } from 'utils/dates';
import { useCountdown } from 'hooks/useCountdown';
import { useEffect } from 'react';
import MobileDropDown from '../components/mobileTabDropDown';
import { Util } from '../util';

interface ExpiresInCompProps {
  util: Util;
  countdown: string;
}

const ExpiresInText = ({ util, countdown }: ExpiresInCompProps) => {
  return (
    <S.TextContainer borderBottom={true}>
      <S.Text color="#9e9e9e" size="18px" fontWeight={600} padding="0 5px">
        Expires in
      </S.Text>
      <S.Text color="white" size="18px" fontWeight={600} padding="0 5px">
        {util.product?.activeProductListings[0] && countdown}
      </S.Text>{' '}
      <S.Text color="#7c7c7c" size="14px" fontWeight={400} padding="0 5px">
        {util.product?.activeProductListings[0] &&
          `(${formatDate(
            new Date(util.product?.activeProductListings[0].endDate)
          )})`}
      </S.Text>
    </S.TextContainer>
  );
};

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
  const matchesMobile = useMediaQuery('(max-width:1140px)');
  const parsedStartDate =
    util.product && new Date(util.product?.activeProductListings[0]?.endDate);
  const countdown = parsedStartDate && useCountdown(parsedStartDate);
  const selectedTabIsAuction = selectedTab === 'auction';

  const arePrivateAssets = util?.privateAssets?.length > 0;

  const isUserOwner = util.loggedInUser.id === util.product?.owner?._id;

  useEffect(() => {
    if (countdown === '0h 0m 0s' || countdown.includes('-')) {
      window.location.reload();
    }
  }, [countdown]);

  useEffect(() => {
    if (isActiveAuction || isAuctionOrWillBe) {
      setSelectedTab('auction');
    }
  }, []);

  const DesktopLayout = () => {
    return (
      <>
        {isAuctionOrWillBe && (
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

        <S.GrayLine
          paddingBottom="38px"
          marginRight={selectedTabIsAuction ? '' : '80px'}
        />
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
      {isActiveAuction &&
        selectedTab === 'auction' &&
        (matchesMobile ? null : (
          <ExpiresInText util={util} countdown={countdown} />
        ))}
    </S.TabBar>
  );
};
