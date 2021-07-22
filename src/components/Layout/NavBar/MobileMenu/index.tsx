import { useAppSelector } from 'store/hooks';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TextButton from 'components/Buttons/TextButton';
import IconButton from 'components/Buttons/IconButton';
import { useState } from 'react';
import * as S from './styles';
//import EditModal from 'views/Collection/UserCollectioinInfo/EditModal';
import UserProfileDetails from 'views/Collection/UserCollectioinInfo/UserProfileDetails';
interface IProps {
  login: (options?: { screen_hint: string }) => void;
  logout: (redirect?: any) => void;
  isAuthenticated: boolean;
  user?: { name: string };
  onSelect?: () => void;
}

const MobileMenu = ({
  login,
  logout,
  isAuthenticated,
  user,
  onSelect,
}: IProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const userData = useAppSelector((state) => state.session.user);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
    return isModalOpen;
  };

  return (
    <>
      {!isAuthenticated && (
        <S.AuthButtonsWrapper>
          <S.Item>
            <TextButton
              type="link"
              color="white"
              to="/marketplace"
              onClick={onSelect}
            >
              Marketplace
            </TextButton>
          </S.Item>
          <TextButton
            color="white"
            size="big"
            onClick={() => login({ screen_hint: 'signup' })}
          >
            Sign Up
          </TextButton>{' '}
          |{' '}
          <TextButton color="white" size="big" onClick={() => login()}>
            Sign In
          </TextButton>
        </S.AuthButtonsWrapper>
      )}
      {isAuthenticated && (
        <>
          {' '}
          <S.Title data-testid="user-name">Hello {user?.name || ''}!</S.Title>
          <S.ListMenu>
            <S.Item>
              <TextButton
                type="link"
                color="white"
                to="/marketplace"
                onClick={onSelect}
              >
                Marketplace
              </TextButton>
            </S.Item>
            <S.Item>
              <TextButton
                type="link"
                to={`/collection/${userData.username}`}
                color="white"
                onClick={onSelect}
              >
                My Collection
              </TextButton>
            </S.Item>

            <S.Item>
              <TextButton
                type="link"
                to={`/wallet`}
                color="white"
                onClick={onSelect}
              >
                My Wallet
              </TextButton>
            </S.Item>

            <S.Item>
              <TextButton type="link" color="white" onClick={openModal}>
                Profile Details
              </TextButton>
            </S.Item>
          </S.ListMenu>
          <UserProfileDetails
            isModalOpen={isModalOpen}
            handleClose={openModal}
          />
          <IconButton
            icon={ExitToAppIcon}
            color="white"
            onClick={() => logout({ returnTo: window.location.origin })}
            style={{ position: 'absolute', bottom: '40px', right: '40px' }}
            data-testid="logout-btn"
          />
        </>
      )}
    </>
  );
};

export default MobileMenu;
