import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Local
import Items from './Items';
import Releases from './Releases';
import Claims from './Claims';
import { User } from 'entities/user';
import { useAppDispatch, useAppSelector } from 'store/hooks';
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
import { Username } from 'views/Product/History/Transaction/styles';
import { SearchBar } from './SearchBar/searchBar';
import { useWindowScroll } from 'react-use';
import { Grid } from '@material-ui/core';
import { HowItWorksCollapsible } from './Claims/howItWorksCollapsible';

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
  const mobileSearchBar = useMediaQuery('(max-width:960px)', { noSsr: true });

  const [userReleases, setUserReleases] = useState<Sku[] | undefined>();
  const [userClaims, setUserClaims] = useState<{
    data: Sku[];
    total: number;
  }>();
  const userName = history.location.pathname.split('/')[2];
  const [page, setPage] = useState(1);
  const [totalReleases, setTotalReleases] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);
  const matchesMobile = useMediaQuery('(max-width:960px)', { noSsr: true });
  const [totalItems, setTotalItems] = useState<number>(0);
  const perPage = matchesMobile ? 4 : 8;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [claimLoading, setIsClaimLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const [searchCriteria, setSearchCriteria] = useState<string>('');

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

  const handleSearch = (searchInput: string) => {
    setIsLoadingPage(true);
    setSearchCriteria(searchInput);
    setPage(1);
  };

  const [isLoadingPage, setIsLoadingPage] = useState<boolean>(false);

  async function fetchData() {
    const itemsRes = await getProductsOwnedByUser(
      user._id,
      '',
      page,
      perPage,
      undefined,
      sortByItems,
      searchCriteria
    );

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

    setIsLoadingPage(false);
    setIsLoading(false);
  }

  useEffect(() => {
    setPage(1);
  }, [selectedTab]);

  useEffect(() => {
    fetchData();
  }, [userName, page, user, sortByItems, sortByReleases, searchCriteria]);

  useEffect(() => {
    if (selectedTab === 'claims') {
      fetchClaimData();
    }
  }, [userName, page, user, sortByClaims, selectedTab]);

  useEffect(() => {
    let status = 'loggedIn';
    let tab: 'items' | 'releases' | 'claims' | '' = 'items';
    const isIssuer = user.role == 'issuer';
    const isOwner = userName == loggedInUser.username;

    if (isIssuer && isAuthenticated && isOwner) {
      status = 'loggedInIssuer';
      tab = 'releases';
    }

    if (!isIssuer && isAuthenticated && isOwner) {
      status = 'loggedIn';
      tab = 'items';
    }

    if (isIssuer && (!isAuthenticated || !isOwner)) {
      status = 'notCurrentUserProfileIssuer';
      tab = 'releases';
    }

    if (!isIssuer && (!isAuthenticated || !isOwner)) {
      status = 'notCurrentUserProfile';
      tab = 'items';
    }

    setSelectedTab(tab);
    setUserStatus(status);
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
  const backgroundTheme = user.role === 'issuer' ? 'dark' : 'light';

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

                  {/* <S.TabSeparator /> */}
                  {/* <S.Tab
                    selected={selectedTab === 'claims'}
                    themeStyle={themeStyle}
                    onClick={() => setSelectedTab('claims')}
                  >
                    My Claims
                  </S.Tab> */}
                </S.TabBar>
                <S.SearchAndSortContainer>
                  {selectedTab === 'items' && !mobileSearchBar && (
                    <SearchBar
                      handleSearch={handleSearch}
                      mobileView={mobileSearchBar}
                      themeStyle={backgroundTheme}
                    />
                  )}

                  <SortByFilter
                    handleSort={(value) => {
                      setIsLoadingPage(true);
                      selectedTab === 'claims'
                        ? setSortByClaims(value)
                        : setSortByItems(value);
                    }}
                    activeSort={
                      selectedTab === 'claims' ? sortByClaims : sortByItems
                    }
                    options={[
                      { value: 'newest', name: 'Newest' },
                      { value: 'oldest', name: 'Oldest' },
                    ]}
                    theme={themeStyle}
                  />
                </S.SearchAndSortContainer>
              </div>
              {selectedTab === 'items' && mobileSearchBar && (
                <SearchBar
                  handleSearch={handleSearch}
                  mobileView={mobileSearchBar}
                  themeStyle={backgroundTheme}
                />
              )}
              <S.GrayLine style={{ width: '100%' }}></S.GrayLine>
            </div>

            {selectedTab === 'items' && (
              <Items
                themeStyle={backgroundTheme}
                userItems={userItems}
                collection={true}
                isLoading={isLoadingPage}
                isUserCollection={true}
                isSearchResult={searchCriteria != ''}
              />
            )}
            {/* {selectedTab === 'claims' && (
              <>
                <Claims
                  userClaims={userClaims?.data}
                  onChangeClaim={onChangeClaim}
                  themeStyle={themeStyle}
                  loading={claimLoading}
                />
                {matchesMobile && (
                  <HowItWorksCollapsible themeStyle={themeStyle} />
                )}
              </>
            )} */}
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
                  <S.TabSeparator />
                  <S.Tab
                    selected={selectedTab === 'items'}
                    themeStyle={themeStyle}
                    onClick={() => setSelectedTab('items')}
                  >
                    {'NFTs'}
                  </S.Tab>
                  <S.TabSeparator />
                  <S.Tab
                    selected={selectedTab === 'claims'}
                    themeStyle={themeStyle}
                    onClick={() => setSelectedTab('claims')}
                  >
                    My Claims
                  </S.Tab>
                </S.TabBar>

                <S.SearchAndSortContainer>
                  {selectedTab === 'items' && !mobileSearchBar && (
                    <SearchBar
                      handleSearch={handleSearch}
                      mobileView={mobileSearchBar}
                      themeStyle={backgroundTheme}
                    />
                  )}

                  <SortByFilter
                    handleSort={(value) => {
                      setIsLoadingPage(true);
                      selectedTab === 'claims'
                        ? setSortByClaims(value)
                        : selectedTab === 'items'
                        ? setSortByItems(value)
                        : setSortByReleases(value);
                    }}
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
                </S.SearchAndSortContainer>
              </div>
              {selectedTab === 'items' && mobileSearchBar && (
                <SearchBar
                  handleSearch={handleSearch}
                  mobileView={mobileSearchBar}
                  themeStyle={backgroundTheme}
                />
              )}
              <S.GrayLine style={{ width: '100%' }}></S.GrayLine>
            </div>
            {selectedTab === 'releases' && (
              <Releases
                userReleases={userReleases}
                collection={true}
                themeStyle={backgroundTheme}
                isUserCollection={true}
                isSearchResult={searchCriteria != ''}
              />
            )}
            {selectedTab === 'items' && (
              <Items
                userItems={userItems}
                collection={true}
                themeStyle={backgroundTheme}
                isLoading={isLoadingPage}
                isUserCollection={true}
                isSearchResult={searchCriteria != ''}
              />
            )}
            {selectedTab === 'claims' && (
              <>
                <Claims
                  userClaims={userClaims?.data}
                  onChangeClaim={onChangeClaim}
                  themeStyle={themeStyle}
                  loading={claimLoading}
                />
                {matchesMobile && (
                  <HowItWorksCollapsible themeStyle={themeStyle} />
                )}
              </>
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
                  <S.TabSeparator />
                  <S.Tab
                    selected={selectedTab === 'items'}
                    themeStyle={themeStyle}
                    onClick={() => setSelectedTab('items')}
                  >
                    {'NFTs'}
                  </S.Tab>
                </S.TabBar>
                <S.SearchAndSortContainer>
                  {selectedTab === 'items' && !mobileSearchBar && (
                    <SearchBar
                      handleSearch={handleSearch}
                      mobileView={mobileSearchBar}
                      themeStyle={backgroundTheme}
                    />
                  )}

                  <SortByFilter
                    handleSort={(value) => {
                      setIsLoadingPage(true);
                      selectedTab === 'claims'
                        ? setSortByClaims(value)
                        : setSortByItems(value);
                    }}
                    activeSort={
                      selectedTab === 'claims' ? sortByClaims : sortByItems
                    }
                    options={[
                      { value: 'newest', name: 'Newest' },
                      { value: 'oldest', name: 'Oldest' },
                    ]}
                    theme={themeStyle}
                  />
                </S.SearchAndSortContainer>
              </div>
              {selectedTab === 'items' && mobileSearchBar && (
                <SearchBar
                  handleSearch={handleSearch}
                  mobileView={mobileSearchBar}
                  themeStyle={backgroundTheme}
                />
              )}
              <S.GrayLine />
            </div>
            {selectedTab === 'releases' && (
              <Releases
                userReleases={userReleases}
                collection={true}
                themeStyle={backgroundTheme}
                isUserCollection={false}
                isSearchResult={searchCriteria != ''}
              />
            )}
            {selectedTab === 'items' && (
              <Items
                userItems={userItems}
                collection={true}
                themeStyle={backgroundTheme}
                isLoading={isLoadingPage}
                isUserCollection={false}
                isSearchResult={searchCriteria != ''}
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
                <S.TabSeparator />
                <S.SearchAndSortContainer>
                  {selectedTab === 'items' && !mobileSearchBar && (
                    <SearchBar
                      handleSearch={handleSearch}
                      mobileView={mobileSearchBar}
                      themeStyle={backgroundTheme}
                    />
                  )}

                  <SortByFilter
                    handleSort={(value) => {
                      setIsLoadingPage(true);
                      selectedTab === 'claims'
                        ? setSortByClaims(value)
                        : setSortByItems(value);
                    }}
                    activeSort={
                      selectedTab === 'claims' ? sortByClaims : sortByItems
                    }
                    options={[
                      { value: 'newest', name: 'Newest' },
                      { value: 'oldest', name: 'Oldest' },
                    ]}
                    theme={themeStyle}
                  />
                </S.SearchAndSortContainer>
              </div>
              {selectedTab === 'items' && mobileSearchBar && (
                <SearchBar
                  handleSearch={handleSearch}
                  mobileView={mobileSearchBar}
                  themeStyle={backgroundTheme}
                />
              )}
              <S.GrayLine style={{ width: '100%' }}></S.GrayLine>
            </div>
            {selectedTab === 'items' && (
              <Items
                userItems={userItems}
                collection={true}
                themeStyle={backgroundTheme}
                isLoading={isLoadingPage}
                isUserCollection={false}
                isSearchResult={searchCriteria != ''}
              />
            )}
          </>
        )}
        {((selectedTab) => {
          let total = 0;
          if (selectedTab === 'releases') {
            total = totalReleases;
          }
          if (selectedTab === 'items') {
            total = totalProducts;
          } else if (selectedTab === 'claims') {
            total = userClaims?.total || 0;
          }
          if (selectedTab === 'claims') {
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
