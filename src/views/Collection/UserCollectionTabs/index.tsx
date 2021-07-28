import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Local
import Items from './Items';
import Releases from './Releases';
import Claims from './Claims';
import { User } from 'entities/user';
import { useAppSelector } from 'store/hooks';
import {
  getProductsOwnedByUser,
  getReleasesOwnedByUser,
} from 'services/api/productService';
import { getSkusPhysicalClaims } from 'services/api/sku';
import { ProductWithFunctions } from 'entities/product';
import { Sku } from 'entities/sku';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useAuth0 } from '@auth0/auth0-react';
import SortByFilter from 'views/MarketPlace/components/Filters/SortByFilter';
import * as S from './styles';
import PageLoader from 'components/PageLoader';

interface IProps {
  user: User;
  isAuthenticated: boolean;
}

const UserCollectionTabs = ({ user, isAuthenticated }: IProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<
    'items' | 'releases' | 'claims' | ''
  >('');
  const [themeStyle, setThemeStyle] = useState<'light' | 'dark'>('dark');
  const [userStatus, setUserStatus] = useState<string>('');
  const history = useHistory();
  const loggedInUser = useAppSelector((state) => state.session.user);
  const [userItems, setUserItems] = useState<
    ProductWithFunctions[] | undefined
  >();

  const [userReleases, setUserReleases] = useState<Sku[] | undefined>();
  const [userClaims, setUserClaims] = useState<{
    data: Sku[];
    total: number;
  }>();
  const userName = history.location.pathname.split('/')[2];
  const [page, setPage] = useState(1);
  const [totalReleases, setTotalReleases] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);
  const matchesMobile = useMediaQuery('(max-width:1140px)', { noSsr: true });
  const perPage = matchesMobile ? 4 : 8;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [claimLoading, setIsClaimLoading] = useState<boolean>(false);

  const { getAccessTokenSilently } = useAuth0();

  const [sortByItems, setSortByItems] = useState<'newest' | 'oldest'>('newest');
  const [sortByClaims, setSortByClaims] = useState<'newest' | 'oldest'>(
    'newest'
  );
  const [sortByReleases, setSortByReleases] = useState<'newest' | 'oldest'>(
    'newest'
  );

  const fetchClaimData = async () => {
    setIsClaimLoading(true);
    const token = await getAccessTokenSilently();
    const claimRes = await getSkusPhysicalClaims(page, perPage, {
      token: token,
      sortBy: sortByClaims,
    });
    setIsClaimLoading(false);
    if (claimRes.data) {
      setUserClaims(claimRes);
    }
  };

  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);
  const queryParams = '?sortBy=startDate:1';

  async function fetchData() {
    const itemsRes = await getProductsOwnedByUser(user._id, '', page, perPage);
    setIsLoading(false);
    setIsLoadingPage(false);
    if (itemsRes.data) {
      setUserItems(itemsRes.data);
      setTotalProducts(itemsRes.totalProducts);
    }

    if (user.role === 'issuer') {
      setThemeStyle('dark');
      const releasesRes = await getReleasesOwnedByUser(
        user._id,
        page,
        perPage,
        sortByReleases
      );
      if (releasesRes.data) {
        setUserReleases(releasesRes.data);
        setTotalReleases(releasesRes.totalReleases);
      }
    } else {
      setThemeStyle('light');
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setPage(1);
  }, [selectedTab]);

  useEffect(() => {
    fetchData();
  }, [userName, page, user, sortByItems, sortByReleases]);

  useEffect(() => {
    if (selectedTab === 'claims') {
      fetchClaimData();
    }
  }, [userName, page, user, sortByClaims, selectedTab]);

  const getWidth = () => {
    return window.innerWidth;
  };
  useEffect(() => {
    (() => {
      if (isAuthenticated === true) {
        if (userName === loggedInUser.username && user.role === 'issuer') {
          setUserStatus('loggedInIssuer');
          setSelectedTab('releases');
        } else if (userName === loggedInUser.username) {
          setUserStatus('loggedIn');
          setSelectedTab('items');
        } else if (
          userName !== loggedInUser.username &&
          user.role === 'issuer'
        ) {
          setUserStatus('notCurrentUserProfileIssuer');
          setSelectedTab('releases');
        } else if (userName !== loggedInUser.username) {
          setUserStatus('notCurrentUserProfile');
          setSelectedTab('items');
        }
      } else {
        if (user.role === 'issuer') {
          setUserStatus('notCurrentUserProfileIssuer');
          setSelectedTab('releases');
        } else {
          setUserStatus('notCurrentUserProfile');
          setSelectedTab('items');
        }
      }
    })();
  }, []);

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setIsLoadingPage(true);
  };

  const onChangeClaim = (claimId, { newDigitalProductId, newSerialNumber }) => {
    setUserClaims(
      (prevState) =>
        prevState && {
          ...prevState,
          data: prevState.data.map((oClaim) =>
            oClaim._id === claimId
              ? {
                  ...oClaim,
                  digitalProductId: newDigitalProductId,
                  serialNumber: newSerialNumber,
                }
              : oClaim
          ),
        }
    );
  };

  if (isLoading)
    return <PageLoader color={'white'} backGroundColor={'black'} />;

  const getWidthMinusScrollbar = () => {
    let width = window.innerWidth;

    if (window.innerWidth && document.documentElement.clientWidth) {
      width = Math.min(window.innerWidth, document.documentElement.clientWidth);
    } else {
      width =
        document.documentElement.clientWidth ||
        document.getElementsByTagName('body')[0].clientWidth;
    }

    return width;
  };

  return (
    <S.ContainerForBigScreen
      screenWidth={getWidthMinusScrollbar()}
      backgroundColor={user.role === 'issuer' ? 'black' : 'white'}
    >
      <S.Container themeStyle={themeStyle}>
        {userStatus === 'loggedIn' && (
          <>
            <div style={{ position: 'relative', paddingBottom: '30px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <S.TabBar>
                  <S.Tab
                    themeStyle={themeStyle}
                    selected={selectedTab === 'items'}
                    onClick={() => setSelectedTab('items')}
                  >
                    {'NFTs'}
                  </S.Tab>

                  <span style={{ padding: '0 20px' }}></span>
                  <S.Tab
                    selected={selectedTab === 'claims'}
                    themeStyle={themeStyle}
                    onClick={() => setSelectedTab('claims')}
                  >
                    My Claims
                  </S.Tab>
                </S.TabBar>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flex: 1,
                  }}
                >
                  <SortByFilter
                    handleSort={(value) =>
                      selectedTab === 'claims'
                        ? setSortByClaims(value)
                        : setSortByItems(value)
                    }
                    activeSort={
                      selectedTab === 'claims' ? sortByClaims : sortByItems
                    }
                    options={[
                      { value: 'newest', name: 'Newest' },
                      { value: 'oldest', name: 'Oldest' },
                    ]}
                    theme={themeStyle}
                  />
                </div>
              </div>
              <S.GrayLine style={{ width: '100%' }}></S.GrayLine>
            </div>

            {selectedTab === 'items' && (
              <Items
                themeStyle={themeStyle}
                userItems={userItems}
                collection={true}
                isLoading={isLoadingPage}
              />
            )}
            {selectedTab === 'claims' && (
              <Claims
                userClaims={userClaims?.data}
                onChangeClaim={onChangeClaim}
                themeStyle={themeStyle}
                loading={claimLoading}
              />
            )}
          </>
        )}
        {userStatus === 'loggedInIssuer' && (
          <>
            <div style={{ position: 'relative', paddingBottom: '30px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <S.TabBar>
                  <S.Tab
                    selected={selectedTab === 'releases'}
                    themeStyle={themeStyle}
                    onClick={() => setSelectedTab('releases')}
                  >
                    Releases
                  </S.Tab>
                  <span style={{ padding: '0 20px' }}></span>
                  <S.Tab
                    selected={selectedTab === 'items'}
                    themeStyle={themeStyle}
                    onClick={() => setSelectedTab('items')}
                  >
                    {'NFTs'}
                  </S.Tab>
                  <span style={{ padding: '0 20px' }}></span>
                  <S.Tab
                    selected={selectedTab === 'claims'}
                    themeStyle={themeStyle}
                    onClick={() => setSelectedTab('claims')}
                  >
                    My Claims
                  </S.Tab>
                </S.TabBar>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flex: 1,
                  }}
                >
                  <SortByFilter
                    handleSort={(value) =>
                      selectedTab === 'claims'
                        ? setSortByClaims(value)
                        : selectedTab === 'items'
                        ? setSortByItems(value)
                        : setSortByReleases(value)
                    }
                    activeSort={
                      selectedTab === 'claims'
                        ? sortByClaims
                        : selectedTab === 'items'
                        ? sortByItems
                        : sortByReleases
                    }
                    options={[
                      { value: 'newest', name: 'Newest' },
                      { value: 'oldest', name: 'Oldest' },
                    ]}
                    theme={themeStyle}
                  />
                </div>
              </div>
              <S.GrayLine style={{ width: '100%' }}></S.GrayLine>
            </div>
            {selectedTab === 'releases' && (
              <Releases
                userReleases={userReleases}
                collection={true}
                themeStyle={themeStyle}
              />
            )}
            {selectedTab === 'items' && (
              <Items
                userItems={userItems}
                collection={true}
                themeStyle={themeStyle}
                isLoading={isLoadingPage}
              />
            )}
            {selectedTab === 'claims' && (
              <Claims
                userClaims={userClaims?.data}
                onChangeClaim={onChangeClaim}
                themeStyle={themeStyle}
                loading={claimLoading}
              />
            )}
          </>
        )}
        {userStatus === 'notCurrentUserProfileIssuer' && (
          <>
            <div style={{ position: 'relative', paddingBottom: '30px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <S.TabBar>
                  <S.Tab
                    selected={selectedTab === 'releases'}
                    themeStyle={themeStyle}
                    onClick={() => setSelectedTab('releases')}
                  >
                    Releases
                  </S.Tab>
                  <span style={{ padding: '0 20px' }}></span>
                  <S.Tab
                    selected={selectedTab === 'items'}
                    themeStyle={themeStyle}
                    onClick={() => setSelectedTab('items')}
                  >
                    {'NFTs'}
                  </S.Tab>
                </S.TabBar>
              </div>

              <S.GrayLine />
            </div>
            {selectedTab === 'releases' && (
              <Releases
                userReleases={userReleases}
                collection={true}
                themeStyle={themeStyle}
              />
            )}
            {selectedTab === 'items' && (
              <Items
                userItems={userItems}
                collection={true}
                themeStyle={themeStyle}
                isLoading={isLoadingPage}
              />
            )}
          </>
        )}
        {userStatus === 'notCurrentUserProfile' && (
          <>
            <div style={{ position: 'relative', paddingBottom: '30px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <S.TabBar>
                  <S.Tab
                    selected={selectedTab === 'items'}
                    themeStyle={themeStyle}
                    onClick={() => setSelectedTab('items')}
                  >
                    {'NFTs'}
                  </S.Tab>
                </S.TabBar>
                <span style={{ padding: '0 20px' }}></span>
              </div>

              <S.GrayLine style={{ width: '100%' }}></S.GrayLine>
            </div>
            {selectedTab === 'items' && (
              <Items
                userItems={userItems}
                collection={true}
                themeStyle={themeStyle}
                isLoading={isLoadingPage}
              />
            )}
          </>
        )}
        {((selectedTab) => {
          let total = 0;
          if (selectedTab === 'releases') {
            total = totalReleases;
          } else if (selectedTab === 'items') {
            total = totalProducts;
          } else if (selectedTab === 'claims') {
            total = userClaims?.total || 0;
          }
          if (total > perPage)
            return (
              <S.PaginationContainer>
                <S.StyledPagination
                  themeStyle={themeStyle}
                  count={Math.ceil(total / perPage)}
                  page={page}
                  onChange={handlePagination}
                  siblingCount={matchesMobile ? 0 : 1}
                />
              </S.PaginationContainer>
            );
        })(selectedTab)}
      </S.Container>
    </S.ContainerForBigScreen>
  );
};

export default UserCollectionTabs;
