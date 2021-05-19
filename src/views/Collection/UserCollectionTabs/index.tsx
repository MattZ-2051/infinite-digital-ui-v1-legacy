import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components/macro';
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
import { Theme } from 'theme/theme';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { CollectionsBookmarkOutlined } from '@material-ui/icons';

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
  const perPage = 8;
  const matchesMobile = useMediaQuery('(max-width:1140px)');

  async function fetchData() {
    const itemsRes = await getProductsOwnedByUser(user._id, '', page, perPage);
    if (itemsRes.data) {
      setUserItems(itemsRes.data);
      setTotalProducts(itemsRes.total);
    }

    if (user.role === 'issuer') {
      const releasesRes = await getReleasesOwnedByUser(userId, page, perPage);
      if (releasesRes.data) {
        setUserReleases(releasesRes.data);
        setTotalReleases(releasesRes.total);
      }
    }
  }

  useEffect(() => {
    setPage(1);
  }, [selectedTab]);

  useEffect(() => {
    fetchData();
  }, [userId, page, user]);

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

  return (
    <Container themeStyle={themeStyle}>
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
              <TabBar>
                <Tab
                  themeStyle={themeStyle}
                  selected={selectedTab === 'items'}
                  onClick={() => setSelectedTab('items')}
                >
                  My Items
                </Tab>
              </TabBar>
              <span style={{ padding: '0 20px' }}></span>
            </div>
            <GrayLine style={{ width: '100%' }}></GrayLine>
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
              <TabBar>
                <Tab
                  selected={selectedTab === 'releases'}
                  themeStyle={themeStyle}
                  onClick={() => setSelectedTab('releases')}
                >
                  My Releases
                </Tab>
                <span style={{ padding: '0 20px' }}></span>
                <Tab
                  selected={selectedTab === 'items'}
                  themeStyle={themeStyle}
                  onClick={() => setSelectedTab('items')}
                >
                  My Items
                </Tab>
              </TabBar>
            </div>
            <GrayLine style={{ width: '100%' }}></GrayLine>
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
              <TabBar>
                <Tab
                  selected={selectedTab === 'releases'}
                  themeStyle={themeStyle}
                  onClick={() => setSelectedTab('releases')}
                >
                  Releases
                </Tab>
                <span style={{ padding: '0 20px' }}></span>
                <Tab
                  selected={selectedTab === 'items'}
                  themeStyle={themeStyle}
                  onClick={() => setSelectedTab('items')}
                >
                  Items
                </Tab>
              </TabBar>
            </div>

            <GrayLine style={{ width: '100%' }}></GrayLine>
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
              <TabBar>
                <Tab
                  selected={selectedTab === 'items'}
                  themeStyle={themeStyle}
                  onClick={() => setSelectedTab('items')}
                >
                  Items
                </Tab>
              </TabBar>
              <span style={{ padding: '0 20px' }}></span>
            </div>

            <GrayLine style={{ width: '100%' }}></GrayLine>
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
        if (total > 8)
          return (
            <StyledPagination
              themeStyle={themeStyle}
              count={Math.ceil(total / perPage)}
              page={page}
              onChange={handlePagination}
              siblingCount={matchesMobile ? 0 : 1}
            />
          );
      })(selectedTab)}
    </Container>
  );
};

const StyledPagination = styled(Pagination)<{ theme; themeStyle }>`
  .MuiButtonBase-root.MuiPaginationItem-page.Mui-selected {
    background-color: ${({ themeStyle, theme }) =>
      themeStyle === 'dark'
        ? theme.palette.light.baseMain
        : theme.palette.dark.baseMain};

    color: ${({ themeStyle, theme }) =>
      themeStyle === 'dark'
        ? theme.palette.dark.baseMain
        : theme.palette.light.baseMain};
    &:hover {
    }
  }
  .MuiButtonBase-root.MuiPaginationItem-root {
    background-color: ${({ themeStyle, theme }) =>
      themeStyle === 'dark' ? theme.palette.dark.baseMain : 'inherit'};
    color: ${({ themeStyle, theme }) =>
      themeStyle === 'dark' ? theme.palette.light.baseMain : 'inherit'};
  }
  .MuiPaginationItem-ellipsis {
    color: ${({ themeStyle, theme }) =>
      themeStyle === 'dark' ? theme.palette.light.baseMain : 'inherit'};
  }
`;

const Container = styled.div<{ theme; themeStyle?: 'light' | 'dark' }>`
  background-color: ${({ themeStyle, theme }) =>
    themeStyle === 'dark'
      ? theme.palette.dark.baseMain
      : theme.palette.light.baseMain};
  color: ${({ themeStyle, theme }) =>
    themeStyle === 'dark'
      ? theme.palette.dark.baseComplement
      : theme.palette.light.baseComplement};
  width: 100%;
  padding: 40px;
`;

const GrayLine = styled.div`
  border-bottom: 2px solid #d8d8d8;
  width: 80%;
  padding-bottom: 14px;
`;

const TabBar = styled.div`
  display: flex;
  flex-direction: row;
`;

const Tab = styled.div<{
  selected: boolean;
  theme: Theme;
  themeStyle?: 'light' | 'dark';
}>`
  background-color: ${({ themeStyle, theme }) =>
    themeStyle === 'dark'
      ? theme.palette.dark.baseMain
      : theme.palette.light.baseMain};
  color: ${({ themeStyle, theme, selected }) =>
    themeStyle === 'dark'
      ? selected
        ? theme.palette.dark.baseComplement
        : theme.palette.dark.greyText
      : selected
      ? theme.palette.light.baseComplement
      : theme.palette.light.greyText};
  border-bottom: ${({ themeStyle, theme, selected }) =>
    selected
      ? themeStyle === 'dark'
        ? '2px solid ' + theme.palette.dark.baseComplement
        : '2px solid ' + theme.palette.light.baseComplement
      : 'none'};
  font-weight: 600;
  font-size: 22px;
  line-height: 27.83px;
  padding-bottom: 14px;
  border: none;
  position: relative;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: none;
  }
`;

export default UserCollectionTabs;