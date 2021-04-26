import React from 'react';
import { useAppSelector } from 'store/hooks';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import ProfileButton from 'components/Buttons/ProfileButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import { User } from 'entities/user';

interface IProps {
  user?: User | null;
  isAuthenticated: boolean;
}

const S: any = {};

const UserCollectioinInfo = ({ user, isAuthenticated }: IProps) => {
  const loggedInUser = useAppSelector((state) => state.session.user);
  const history = useHistory();
  const userId = history.location.pathname.split('/')[2];

  let userStatus = '';

  const handleWalletRedirect = () => {
    history.push(`/wallet/${loggedInUser}`);
  };

  if (isAuthenticated === true) {
    if (userId === loggedInUser.id && loggedInUser.role === 'issuer') {
      userStatus = 'loggedInIssuer';
    } else if (userId === loggedInUser.id) {
      userStatus = 'loggedIn';
    } else if (userId !== loggedInUser.id && user?.role === 'issuer') {
      userStatus = 'notCurrentUserProfileIssuer';
    } else if (userId !== loggedInUser.id) {
      userStatus = 'notCurrentUserProfile';
    }
  } else {
    if (user?.role === 'issuer') {
      userStatus = 'notCurrentUserProfileIssuer';
    } else {
      userStatus = 'notCurrentUserProfile';
    }
  }

  return (
    <S.Container>
      {userStatus === 'loggedInIssuer' && (
        <>
          <S.AccountIcon />
          <S.UsernameIconContainer>
            <span style={{ paddingRight: '10px', fontSize: '24px' }}>
              @ {user?.username}
            </span>
            <S.EditIconContainer>
              <EditIcon style={{ fontSize: '14px' }} />
            </S.EditIconContainer>
          </S.UsernameIconContainer>
          <S.ButtonContainer>
            <ProfileButton label="My Account" />
            <div style={{ padding: '0 10px' }}>
              <S.ButtonDivider></S.ButtonDivider>
            </div>
            <ProfileButton label="My Wallet" />
          </S.ButtonContainer>
        </>
      )}
      {userStatus === 'loggedIn' && (
        <>
          <S.UsernameIconContainer>
            <span style={{ paddingRight: '10px', fontSize: '24px' }}>
              @ {user?.username}
            </span>
            <S.EditIconContainer>
              <EditIcon style={{ fontSize: '14px' }} />
            </S.EditIconContainer>
          </S.UsernameIconContainer>
          <S.ButtonContainer>
            <ProfileButton label="My Account" />
            <div style={{ padding: '0 10px' }}>
              <S.ButtonDivider></S.ButtonDivider>
            </div>
            <ProfileButton
              label="My Wallet"
              handleClick={handleWalletRedirect}
            />
          </S.ButtonContainer>
        </>
      )}
      {userStatus === 'notCurrentUserProfile' && (
        <>
          <span style={{ paddingRight: '10px', fontSize: '24px' }}>
            @ {user?.username}
          </span>
        </>
      )}
      {userStatus === 'notCurrentUserProfileIssuer' && (
        <>
          <S.AccountIcon />
          <span style={{ paddingRight: '10px', fontSize: '24px' }}>
            @ {user?.username}
          </span>
        </>
      )}
    </S.Container>
  );
};

S.EditIconContainer = styled.div`
  width: 24px;
  height: 24px;
  background-color: black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

S.Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  color: white;
  width: 100%;
  height: 30vh;
  flex-direction: column;
  position: relative;
`;

S.ButtonContainer = styled.div`
  background-color: black;
  width: 232px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

S.AccountIcon = styled(AccountCircleIcon)`
  font-size: 120px;
`;

S.ButtonDivider = styled.div`
  width: 2px;
  height: 16px;
  background-color: lightgray;
`;

S.UsernameIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
`;

export default UserCollectioinInfo;
