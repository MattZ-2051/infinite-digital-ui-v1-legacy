import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as WalletSvg } from 'assets/svg/icons/wallet.svg';
import { ReactComponent as SignOutSvg } from 'assets/svg/icons/signout.svg';
import { ReactComponent as AccountSettingsSvg } from 'assets/svg/icons/account-settings.svg';
import { ReactComponent as EditProfileSvg } from 'assets/svg/icons/edit-profile-icon.svg';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { deleteUser } from 'store/session/sessionThunks';
import EditModal from 'views/Collection/UserCollectioinInfo/EditModal';

interface IProps {
  visible?: any;
  setVisible?: any;
  setIsModalOpen: (a: boolean) => void;
}

const UserProfileMenu = ({ visible, setVisible, setIsModalOpen }: IProps) => {
  const dispatch = useAppDispatch();
  const { logout } = useAuth0();
  const username = useAppSelector((state) => state.session.user.username);
  const history = useHistory();

  const handleWalletRedirect = () => {
    history.push(`/wallet/${username}`);
    setVisible(false);
  };

  const handleLogout = () => {
    dispatch(deleteUser());
    logout({ returnTo: window.location.origin });
    setVisible(false);
  };

  const handleUsernameEdit = () => {
    setIsModalOpen(true);
  };
  return (
    <div style={{ position: 'relative' }}>
      <Container>
        <ButtonContainer>
          <Button onClick={handleUsernameEdit}>
            <IconContainer>
              <EditProfileIcon className="icon_wallet" />
            </IconContainer>
            <Label>Edit Username</Label>
          </Button>
          <Button onClick={handleWalletRedirect}>
            <IconContainer>
              <WalletIcon className="icon_wallet" />
            </IconContainer>
            <Label>My Wallet</Label>
          </Button>
          <Button onClick={handleLogout}>
            <IconContainer>
              <SignOutIcon className="icon_signout" />
            </IconContainer>
            <Label>Sign Out</Label>
          </Button>
        </ButtonContainer>
      </Container>
    </div>
  );
};

const Container = styled.div`
  position: absolute;
  background-color: #252525;
  top: 20px;
  right: -60px;
  border-radius: 20px;
  display: flex;
  flex-direction: column:
  justify-content: center;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
`;

const Button = styled.div`
  padding: 9px;
  margin: 0;
  border-radius: 35px;
  height: 42px;
  width: 200px;
  display: flex;
  align-items: center;
  color: #7c7c7c;
  :hover {
    background-color: #3a3a3a;
    cursor: pointer;
    color: white;
  }
  :hover .icon_settings {
    fill: white;
  }

  :hover .icon_wallet {
    stroke: white;
  }

  :hover .icon_signout {
    stroke: white;
  }
`;

const ButtonContainer = styled.div``;

const Label = styled.span`
  padding-left: 10px;
  font-size: 16px;
  font-weight: 600;
`;

const AcountSettingsIcon = styled(AccountSettingsSvg)`
  fill: #7c7c7c;
`;

const WalletIcon = styled(WalletSvg)`
  fill: none;
  stroke: #7c7c7c;
`;

const EditProfileIcon = styled(EditProfileSvg)`
  fill: none;
  stroke: #7c7c7c;
`;

const SignOutIcon = styled(SignOutSvg)`
  fill: none;
  stroke: #7c7c7c;
`;

export default UserProfileMenu;
