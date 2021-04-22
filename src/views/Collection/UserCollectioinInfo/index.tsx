import { useState } from 'react';
import styled from 'styled-components/macro';
import ProfileButton from 'components/Buttons/ProfileButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import EditIcon from '@material-ui/icons/Edit';

interface IProps {
  userStatus?: string;
}

const S: any = {};

const UserCollectioinInfo = ({ userStatus }: IProps) => {
  return (
    <S.Container>
      {userStatus === 'loggedInIssuer' && (
        <>
          <S.AccountIcon />
          <S.UsernameIconContainer>
            <span style={{ paddingRight: '10px', fontSize: '24px' }}>
              @username
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
              @username
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
      {userStatus === 'notCurrentUserProfile' && (
        <>
          <span style={{ paddingRight: '10px', fontSize: '24px' }}>
            @username
          </span>
        </>
      )}
      {userStatus === 'notCurrentUserProfileIssuer' && (
        <>
          <S.AccountIcon />
          <span style={{ paddingRight: '10px', fontSize: '24px' }}>
            @username
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
