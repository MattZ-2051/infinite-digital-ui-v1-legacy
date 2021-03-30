import styled from 'styled-components';
import ProfileButton from 'components/Buttons/ProfileButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const ProfileInfo = () => {
  return (
    <ProfileInfoContainer>
      <AccountCircleIcon />
      <span>@username</span>
      <span>Lorem Ipsum ipsdy ekngv Loreum Ipsum</span>
      <div>
        <ProfileButton />
        <ProfileButton />
      </div>
    </ProfileInfoContainer>
  )
}

const ProfileInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  width: 100%;
  height: 30vh;
  flex-direction: column;
`;

export default ProfileInfo;
