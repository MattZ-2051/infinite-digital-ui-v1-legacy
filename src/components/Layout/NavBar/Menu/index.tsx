import styled from 'styled-components/macro';
import { useState } from 'react';
import Divider from 'components/Divider';
import TextButton from 'components/Buttons/TextButton';
import UserProfileMenu from '../UserProfileMenu';
import { useOutsideAlert } from 'hooks/oustideAlerter';
import { useAppSelector } from 'store/hooks';
import avatarIcon from 'assets/img/icons/avatar-icon.png';
//import EditModal from 'views/Collection/UserCollectioinInfo/EditModal';
import UserProfileDetails from 'views/Collection/UserCollectioinInfo/UserProfileDetails';

interface IProps {
  login: (options?: { screen_hint: string }) => void;
  isAuthenticated: boolean;
}

const Menu = ({ login, isAuthenticated }: IProps) => {
  const { visible, setVisible, ref } = useOutsideAlert(false);
  const user = useAppSelector((state) => state.session.user);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Container>
        <Divider gap={32}>
          <TextButton
            to="/marketplace?page=1&per_page=6&sortBy=startDate:asc"
            color="grey"
          >
            Marketplace
          </TextButton>

          {isAuthenticated && (
            <TextButton to={`/collection/${user.username}`} color="grey">
              My Collection
            </TextButton>
          )}

          {isAuthenticated && (
            <AcountInfoContainer>
              <div
                ref={ref}
                onClick={() => setVisible(!visible)}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <AccountIcon src={avatarIcon} />
                {visible ? (
                  <UserProfileMenu
                    setVisible={setVisible}
                    setIsModalOpen={setIsModalOpen}
                  />
                ) : null}
                <Username>{user.username}</Username>
              </div>
            </AcountInfoContainer>
          )}

          {!isAuthenticated && (
            <>
              {/* <TextButton
                onClick={() => login({ screen_hint: 'signup' })}
                color="grey"
                size="medium"
              >
                Sign Up
              </TextButton> */}

              <TextButton onClick={() => login()} color="grey" size="medium">
                Log In
              </TextButton>
            </>
          )}
        </Divider>
      </Container>
      <UserProfileDetails
        isModalOpen={isModalOpen}
        handleClose={handleModalClose}
      />
    </>
  );
};

const Container = styled.div`
  background-color: black;
  color: white;
`;

const AcountInfoContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Username = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-right: 32px;
  cursor: pointer;
`;

const AccountIcon = styled.img`
  margin-right: 15px;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export default Menu;
