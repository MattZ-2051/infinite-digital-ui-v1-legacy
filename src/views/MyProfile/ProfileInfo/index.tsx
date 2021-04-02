import { useState } from 'react'
import styled from 'styled-components/macro';
import ProfileButton from 'components/Buttons/ProfileButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import EditIcon from '@material-ui/icons/Edit';

const ProfileInfo = () => {

  const [showEditIcon, setShowEditIcon] = useState<boolean | undefined>(false);

  return (
    <ProfileInfoContainer>
      <AccountIcon onMouseEnter={() => setShowEditIcon(true)} onMouseLeave={() => setShowEditIcon(false)} />
      {showEditIcon
        ? <ChangeImgIconContainer onMouseEnter={() => setShowEditIcon(true)}>
          <ChangeImgIcon />
        </ChangeImgIconContainer>
        : null
      }
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ paddingRight: '10px', fontSize: '24px' }}>@username</span>
        <EditIconContainer>
          <EditIcon style={{ fontSize: '14px' }} />
        </EditIconContainer>
      </div>
      <ButtonContainer>
        <ProfileButton label="My Account" />
        <div style={{ padding: '0 10px' }}>
          <div style={{ width: '2px', height: '16px', backgroundColor: 'lightgray' }}></div>
        </div>
        <ProfileButton label="My Wallet" />
      </ButtonContainer>
    </ProfileInfoContainer>
  )
}

const EditIconContainer = styled.div`
  width: 24px;
  height: 24px;
  background-color: black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: -webkit-linear-gradient(45deg, #FF9412 0%, #FFF72D 98.96%);;
  color: white;
  width: 100%;
  height: 40vh;
  flex-direction: column;
  position: relative;
`;

const ButtonContainer = styled.div`
  background-color: black;
  width: 232px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const AccountIcon = styled(AccountCircleIcon)`
  font-size: 120px;
  :hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

const ChangeImgIcon = styled(CropOriginalIcon)`
`;

const ChangeImgIconContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: black;
  border-radius: 50%;
  top: 35%;
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

export default ProfileInfo;
