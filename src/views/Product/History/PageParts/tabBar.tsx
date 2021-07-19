import * as S from '../styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import padlock from 'assets/svg/icons/padlock-icon.svg';
import { formatDate } from 'utils/dates';
import { useCountdown } from 'hooks/useCountdown';

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

  const arePrivateAssets = util?.privateAssets?.length > 0;

  const isUserOwner = util.loggedInUser.id === util.product?.owner?._id;

  if (countdown === '0h 0m 0s') {
    window.location.reload();
  }

  return (
    <S.TabBar>
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
      <S.Padding
      // style={{
      //   borderBottom:
      //     selectedTab === 'history' ? 'none' : ': 2px solid #2e2e2e;',
      // }}
      />

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
        marginRight={
          (!matchesMobile && selectedTab === 'history') ||
          selectedTab === 'owner_access' ||
          auctionStatus.split('-')[0] === 'upcoming'
        }
        width={
          selectedTab === 'history' ||
          selectedTab === 'owner_access' ||
          auctionStatus.split('-')[0] === 'upcoming'
        }
      />
      {isActiveAuction &&
        selectedTab === 'auction' &&
        (matchesMobile ? (
          <S.TextContainer
            borderBottom={true}
            marginRight="0"
            padding="0 0 0 10px"
          >
            {' '}
            <S.Text color="#7c7c7c" size="14px" fontWeight={400}>
              {util.product?.activeProductListings[0] &&
                `(${formatDate(
                  new Date(util.product?.activeProductListings[0].endDate)
                )})`}
            </S.Text>
          </S.TextContainer>
        ) : (
          <S.TextContainer borderBottom={true}>
            <S.Text color="#9e9e9e" size="18px" fontWeight={600}>
              Expires in
            </S.Text>
            <S.Text color="white" size="18px" fontWeight={600}>
              {util.product?.activeProductListings[0] && countdown}
            </S.Text>{' '}
            <S.Text color="#7c7c7c" size="14px" fontWeight={400}>
              {util.product?.activeProductListings[0] &&
                `(${formatDate(
                  new Date(util.product?.activeProductListings[0].endDate)
                )})`}
            </S.Text>
          </S.TextContainer>
        ))}
    </S.TabBar>
  );
};
