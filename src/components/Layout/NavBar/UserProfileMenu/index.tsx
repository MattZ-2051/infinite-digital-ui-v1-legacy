import styled from 'styled-components/macro';
import { ReactComponent as WalletSvg } from 'assets/svg/icons/wallet.svg';
import { ReactComponent as SignOutSvg } from 'assets/svg/icons/signout.svg'
import { ReactComponent as AccountSettingsSvg } from 'assets/svg/icons/account-settings.svg'
import { useAuth0 } from '@auth0/auth0-react';

const UserProfileMenu = () => {

  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const handleLogout = () => {
    console.log('here')
  }



  return (
    <Container>
      <ButtonContainer>
        <Button>
          <IconContainer  >
            <AcountSettingsIcon className="icon_settings" />
          </IconContainer>
          <Label >Account Settings</Label>
        </Button>
        <Button>
          <IconContainer >
            <WalletIcon className="icon_wallet" />
          </IconContainer>
          <Label>My Wallet</Label>
        </Button>
        <Button onClick={() => logout({ returnTo: window.location.origin })}>
          <IconContainer  >
            <SignOutIcon className="icon_signout" />
          </IconContainer>
          <Label>Sign Out</Label>
        </Button>
      </ButtonContainer>
    </Container >
  )
}

const Container = styled.div`
  position: absolute;
  background-color: #252525;
  top: 30px;
  right: 32px;
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
  color: #7C7C7C;
  :hover {
    background-color: #3A3A3A;
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

const ButtonContainer = styled.div`
  padding: 5px;
`;

const Label = styled.span`
  padding-left: 10px;
  font-size: 16px;
  font-weight: 600;
`;

const AcountSettingsIcon = styled(AccountSettingsSvg)`
  fill: #7C7C7C;
`;

const WalletIcon = styled(WalletSvg)`
  fill: none;
  stroke: #7C7C7C;
`;

const SignOutIcon = styled(SignOutSvg)`
  fill: none;
  stroke: #7C7C7C;
`;

export default UserProfileMenu;
