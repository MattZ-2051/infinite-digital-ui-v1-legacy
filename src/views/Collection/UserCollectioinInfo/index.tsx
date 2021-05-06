import React, { useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import ProfileButton from 'components/Buttons/ProfileButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import { User } from 'entities/user';
import editIconImg from 'assets/img/icons/edit-icon.png';
import EditModal from './EditModal';

interface IProps {
  user: User | undefined;
  isAuthenticated: boolean;
}

const S: any = {};

const UserCollectioinInfo = ({
  user,
  isAuthenticated,
}: IProps): JSX.Element => {
  const loggedInUser = useAppSelector((state) => state.session.user);
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const userId = history.location.pathname.split('/')[2];

  let userStatus = '';

  const handleWalletRedirect = () => {
    history.push(`/wallet/${loggedInUser}`);
  };

  const checkStatus = () => {
    if (isAuthenticated === true) {
      if (userId === loggedInUser.id && loggedInUser.role === 'issuer') {
        userStatus = 'loggedInIssuer';
        return userStatus;
      } else if (userId === loggedInUser.id) {
        userStatus = 'loggedIn';
        return userStatus;
      } else if (userId !== loggedInUser.id && user?.role === 'issuer') {
        userStatus = 'notCurrentUserProfileIssuer';
        return userStatus;
      } else if (userId !== loggedInUser.id) {
        userStatus = 'notCurrentUserProfile';
        return userStatus;
      }
    } else {
      if (user?.role === 'issuer') {
        userStatus = 'notCurrentUserProfileIssuer';
        return userStatus;
      } else {
        userStatus = 'notCurrentUserProfile';
        return userStatus;
      }
    }
  };

  const handleUsernameEdit = (e) => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  checkStatus();

  return (
    <S.Container>
      {userStatus === 'loggedInIssuer' && (
        <>
          <S.AccountIcon />
          <S.UsernameIconContainer>
            <span style={{ paddingRight: '10px', fontSize: '24px' }}>
              @ {loggedInUser.username}
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
              @ {loggedInUser.username}
            </span>
            <S.EditIconContainer>
              <S.EditIcon onClick={handleUsernameEdit} src={editIconImg} />
            </S.EditIconContainer>
          </S.UsernameIconContainer>
          <S.ButtonContainer>
            <ProfileButton
              label="My Wallet (Coming Soon)"
              // TODO: ADD Later - Disable for ARIA MVP - handleClick={handleWalletRedirect}
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
      <EditModal isModalOpen={isModalOpen} handleClose={handleModalClose} />
    </S.Container>
  );
};

S.EditIconContainer = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
`;

S.Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
  height: 30vh;
  flex-direction: column;
  position: relative;
`;

S.EditIcon = styled.img`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

S.ButtonContainer = styled.div`
  background-color: #252525;
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

S.UsernameIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 16px;
`;

S.ExitIcon = styled.img`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

S.UsernameInput = styled.input`
  font-size: 24px;
  background: none;
  border: none;
  color: white;
  text-align: center;
  :focus {
    outline: none;
  }
  width: fit-content;
`;
export default UserCollectioinInfo;
