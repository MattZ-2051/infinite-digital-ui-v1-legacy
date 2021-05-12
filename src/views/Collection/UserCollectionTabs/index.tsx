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

interface IProps {
  user: User;
  isAuthenticated: boolean;
}

const UserCollectionTabs = ({ user, isAuthenticated }: IProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [themeStyle, setThemeStyle] = useState<'light' | 'dark'>('dark');
  const history = useHistory();
  const loggedInUser = useAppSelector((state) => state.session.user);
  const [userItems, setUserItems] = useState<
    ProductWithFunctions[] | undefined
  >();
  const [userReleases, setUserReleases] = useState<Sku[] | undefined>();
  const userId = history.location.pathname.split('/')[2];
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const perPage = 6;

  async function fetchData() {
    const itemsRes = await getProductsOwnedByUser(user._id, '', page, perPage);
    if (itemsRes.data) {
      setUserItems(itemsRes.data);
      setTotal(itemsRes.total);
    }

    if (user.role === 'issuer') {
      const releasesRes = await getReleasesOwnedByUser(user._id);
      if (releasesRes) {
        setUserReleases(releasesRes);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [selectedTab, userId, user]);

  let userStatus = '';

  const checkStatus = () => {
    if (isAuthenticated === true) {
      if (userId === loggedInUser.id && user.role === 'issuer') {
        userStatus = 'loggedInIssuer';
        return userStatus;
      } else if (userId === loggedInUser.id) {
        userStatus = 'loggedIn';
        return userStatus;
      } else if (userId !== loggedInUser.id && user.role === 'issuer') {
        userStatus = 'notCurrentUserProfileIssuer';
        return userStatus;
      } else if (userId !== loggedInUser.id) {
        userStatus = 'notCurrentUserProfile';
        return userStatus;
      }
    } else {
      if (user.role === 'issuer') {
        userStatus = 'notCurrentUserProfileIssuer';
        return userStatus;
      } else {
        userStatus = 'notCurrentUserProfile';
        return userStatus;
      }
    }
  };

  checkStatus();

  const handlePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    //dispatch(updatePagination({ page: String(value), perPage: '6' }));
  };

  // TODO: REVIEW
  const placeHolderFunc = () => null;
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
                  selected={selectedTab === 0}
                  onClick={() => setSelectedTab(0)}
                >
                  My Items
                </Tab>
              </TabBar>
              <span style={{ padding: '0 20px' }}></span>
            </div>
            <GrayLine style={{ width: '100%' }}></GrayLine>
          </div>

          {selectedTab === 0 && (
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
                  selected={selectedTab === 0}
                  themeStyle={themeStyle}
                  onClick={() => setSelectedTab(0)}
                >
                  My Releases
                </Tab>
                <span style={{ padding: '0 20px' }}></span>
                <Tab
                  selected={selectedTab === 1}
                  themeStyle={themeStyle}
                  onClick={() => setSelectedTab(1)}
                >
                  My Items
                </Tab>
              </TabBar>
            </div>
            <GrayLine style={{ width: '100%' }}></GrayLine>
          </div>
          {selectedTab === 0 && (
            <Releases
              userReleases={userReleases}
              collection={true}
              themeStyle={themeStyle}
            />
          )}
          {selectedTab === 1 && (
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
                  selected={selectedTab === 0}
                  themeStyle={themeStyle}
                  onClick={() => setSelectedTab(0)}
                >
                  Releases
                </Tab>
                <span style={{ padding: '0 20px' }}></span>
                <Tab
                  selected={selectedTab === 1}
                  themeStyle={themeStyle}
                  onClick={() => setSelectedTab(1)}
                >
                  Items
                </Tab>
              </TabBar>
            </div>

            <GrayLine style={{ width: '100%' }}></GrayLine>
          </div>
          {selectedTab === 0 && (
            <Releases
              userReleases={userReleases}
              collection={true}
              themeStyle={themeStyle}
            />
          )}
          {selectedTab === 1 && (
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
                  selected={selectedTab === 0}
                  themeStyle={themeStyle}
                  onClick={() => setSelectedTab(0)}
                >
                  Items
                </Tab>
              </TabBar>
              <span style={{ padding: '0 20px' }}></span>
            </div>

            <GrayLine style={{ width: '100%' }}></GrayLine>
          </div>
          {selectedTab === 0 && (
            <Items
              userItems={userItems}
              collection={true}
              themeStyle={themeStyle}
            />
          )}
        </>
      )}
      <Pagination
        count={Math.ceil(total / perPage)}
        page={page}
        onChange={handlePagination}
      />
    </Container>
  );
};

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
