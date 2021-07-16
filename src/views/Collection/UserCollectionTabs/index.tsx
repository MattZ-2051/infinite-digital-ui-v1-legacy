import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Local
import Items from './Items';
import Releases from './Releases';
import { User } from 'entities/user';
import { useAppSelector } from 'store/hooks';
import {
  getProductsOwnedByUser,
  getReleasesOwnedByUser,
} from 'services/api/productService';
import { ProductWithFunctions } from 'entities/product';
import { Sku } from 'entities/sku';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import * as S from './styles';
import PageLoader from 'components/PageLoader';

interface IProps {
  user: User;
  isAuthenticated: boolean;
}

const UserCollectionTabs = ({ user, isAuthenticated }: IProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<'items' | 'releases' | ''>('');
  const [themeStyle, setThemeStyle] = useState<'light' | 'dark'>('dark');
  const [userStatus, setUserStatus] = useState<string>('');
  const history = useHistory();
  const loggedInUser = useAppSelector((state) => state.session.user);
  const [userItems, setUserItems] = useState<
    ProductWithFunctions[] | undefined
  >();
  const [userReleases, setUserReleases] = useState<Sku[] | undefined>();
  const userId = history.location.pathname.split('/')[2];
  const [page, setPage] = useState(1);
  const [totalReleases, setTotalReleases] = useState(1);
  const [totalProducts, setTotalProducts] = useState(1);
  const matchesMobile = useMediaQuery('(max-width:1140px)', { noSsr: true });
  const perPage = matchesMobile ? 4 : 8;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const queryParams = '?sortBy=startDate:1';

  async function fetchData() {
    const itemsRes = await getProductsOwnedByUser(user._id, '', page, perPage);
    setIsLoading(false);
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
        queryParams
      );
      if (releasesRes.data) {
        setUserReleases(releasesRes.data);
        setTotalReleases(releasesRes.totalReleases);
      }
    } else {
      setThemeStyle('light');
    }
  }

  useEffect(() => {
    setPage(1);
  }, [selectedTab]);

  useEffect(() => {
    fetchData();
  }, [userId, page, user]);

  const getWidth = () => {
    return window.innerWidth;
  };
  useEffect(() => {
    (() => {
      if (isAuthenticated === true) {
        if (userId === loggedInUser.id && user.role === 'issuer') {
          setUserStatus('loggedInIssuer');
          setSelectedTab('releases');
        } else if (userId === loggedInUser.id) {
          setUserStatus('loggedIn');
          setSelectedTab('items');
        } else if (userId !== loggedInUser.id && user.role === 'issuer') {
          setUserStatus('notCurrentUserProfileIssuer');
          setSelectedTab('releases');
        } else if (userId !== loggedInUser.id) {
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
  };
  if (isLoading)
    return <PageLoader color={'white'} backGroundColor={'black'} />;
  return (
    <S.WhiteContainerForBigScreen screenWidth={window.innerWidth}>
      <S.Container themeStyle={themeStyle}>
        {userStatus === 'loggedIn' && (
          <>
            <div style={{ position: 'relative', paddingBottom: '30px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
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
                </S.TabBar>
                <span style={{ padding: '0 20px' }}></span>
              </div>
              <S.GrayLine style={{ width: '100%' }}></S.GrayLine>
            </div>

            {selectedTab === 'items' && (
              <Items
                themeStyle={themeStyle}
                userItems={userItems}
                collection={true}
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
                  justifyContent: 'space-between',
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
                  justifyContent: 'space-between',
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
                  justifyContent: 'space-between',
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
              />
            )}
          </>
        )}
        {((selectedTab) => {
          let total = 0;
          if (selectedTab === 'releases') {
            total = totalReleases;
          } else {
            total = totalProducts;
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
    </S.WhiteContainerForBigScreen>
  );
};

export default UserCollectionTabs;
