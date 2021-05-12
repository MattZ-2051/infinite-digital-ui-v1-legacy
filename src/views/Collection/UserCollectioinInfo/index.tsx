import { useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { useHistory } from 'react-router-dom';
import ProfileButton from 'components/Buttons/ProfileButton';
import { User } from 'entities/user';
import editIconImg from 'assets/img/icons/edit-icon.png';
import EditModal from './EditModal';
import * as S from './styles';

interface IProps {
  user: User | undefined;
  isAuthenticated: boolean;
}

const UserCollectioinInfo = ({ user, isAuthenticated }: IProps) => {
  const loggedInUser = useAppSelector((state) => state.session.user);
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const userId = history.location.pathname.split('/')[2];

  let userStatus = '';

  const handleWalletRedirect = () => {
    history.push(`/wallet/${loggedInUser.username}`);
  };

  const checkStatus = () => {
    if (isAuthenticated) {
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

  const handleUsernameEdit = () => {
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
              <S.EditIcon onClick={handleUsernameEdit} src={editIconImg} />
            </S.EditIconContainer>
          </S.UsernameIconContainer>
          <S.ButtonContainer>
            <ProfileButton
              label="My Wallet"
              handleClick={handleWalletRedirect}
            />
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
      <EditModal isModalOpen={isModalOpen} handleClose={handleModalClose} />
    </S.Container>
  );
};

export default UserCollectioinInfo;
