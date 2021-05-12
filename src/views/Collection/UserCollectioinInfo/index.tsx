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
    history.push(`/wallet/${loggedInUser.username}`);
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
    <Container>
      {userStatus === 'loggedInIssuer' && (
        <>
          {user?.profilePhotoUrl ? (
            <img
              style={{
                width: '140px',
                height: '140px',
              }}
              src={user.profilePhotoUrl}
            />
          ) : (
            <AccountIcon />
          )}
          <UsernameIconContainer>
            <span style={{ paddingRight: '10px', fontSize: '24px' }}>
              @ {loggedInUser.username}
            </span>
            <EditIconContainer>
              <StyledEditIcon style={{ fontSize: '14px' }} />
            </EditIconContainer>
          </UsernameIconContainer>
          <ButtonContainer>
            <ProfileButton label="My Account" />
            <div style={{ padding: '0 10px' }}>
              {/* <ButtonDivider></ButtonDivider> */}
            </div>
            <ProfileButton label="My Wallet" />
          </ButtonContainer>
        </>
      )}
      {userStatus === 'loggedIn' && (
        <>
          <UsernameIconContainer>
            <span style={{ paddingRight: '10px', fontSize: '24px' }}>
              @ {loggedInUser.username}
            </span>
            <EditIconContainer>
              <StyledEditIcon onClick={handleUsernameEdit}>
                <img src={editIconImg} />
              </StyledEditIcon>
            </EditIconContainer>
          </UsernameIconContainer>
          <ButtonContainer>
            <ProfileButton
              label="My Wallet"
              handleClick={handleWalletRedirect}
            />
          </ButtonContainer>
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
          {user?.profilePhotoUrl ? (
            <img
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50px',
              }}
              src={user.profilePhotoUrl}
            />
          ) : (
            <AccountIcon />
          )}
          <span style={{ paddingRight: '10px', fontSize: '24px' }}>
            @ {user?.username}
          </span>
        </>
      )}
      <EditModal isModalOpen={isModalOpen} handleClose={handleModalClose} />
    </Container>
  );
};

const EditIconContainer = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  width: 100%;
  height: 30vh;
  flex-direction: column;
  position: relative;
`;

const StyledEditIcon = styled(EditIcon)`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  background-color: #252525;
  width: 232px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const AccountIcon = styled(AccountCircleIcon)`
  font-size: 120px;
`;

const UsernameIconContainer = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 16px;
`;

const ExitIcon = styled.img`
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const UsernameInput = styled.input`
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
