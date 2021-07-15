import { useState } from 'react';
import ModalComponent from 'components/Modal';
import * as S from './styles';
import exitIconImg from 'assets/img/icons/exit-icon.png';
import styled from 'styled-components/macro';
import { ReactComponent as UserProfileSvg } from 'assets/svg/icons/user-profile-icon.svg';
import { useAppSelector } from 'store/hooks';
import Username from './components/Username';
import EmailAddress from './components/EmailAddress';
import Password from './components/Password';
import { requestPasswordReset } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';
interface Props {
  isModalOpen: boolean;
  handleClose: () => void;
}

const UserProfileDetails = ({
  isModalOpen,
  handleClose,
}: Props): JSX.Element => {
  const currentUsername = useAppSelector(
    (state) => state.session.user.username
  );
  const userIsSocial = useAppSelector(
    (state) =>
      state.session.user[
        'http://schemas.microsoft.com/ws/2008/06/identity/id/meta'
      ].isSocial
  );
  const userId = useAppSelector((state) => state.session.user.id);
  const currentEmail = useAppSelector((state) => state.session.user.email);
  const [editingUsername, setEditingUsername] = useState<boolean>(false);

  const handleCloseAndReset = () => {
    handleClose();
    setEditingUsername(false);
  };
  const { getAccessTokenSilently } = useAuth0();
  return (
    <ModalComponent open={isModalOpen}>
      <S.Body>
        <S.Icon>
          <S.ExitIconImg src={exitIconImg} onClick={handleCloseAndReset} />
        </S.Icon>
        <ModalHeader>
          <BorderWrapper>
            <FlexAlignCenter>
              <UserProfileIcon />
              <ModalTitle>Profile Details</ModalTitle>
            </FlexAlignCenter>
          </BorderWrapper>
          <Grayline />
        </ModalHeader>
        <S.Content>
          <Username
            currentUsername={currentUsername}
            editingUsername={editingUsername}
            setEditingUsername={setEditingUsername}
          />
          <EmailAddress currentEmail={currentEmail} />
          {!userIsSocial && <Password currentEmail={currentEmail}/>}
        </S.Content>
      </S.Body>
    </ModalComponent>
  );
};

const ModalHeader = styled.header`
  width: 100%;
`;

const FlexAlignCenter = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: row;
`;

const ModalTitle = styled.h2`
  font-size: 22px;
  line-height: 28px;
  width: max-content;
  display: inline;
`;

const BorderWrapper = styled.span`
  border-bottom: 2px solid black;
  display: inline;
  padding-bottom: 19px;
  width: max-content;
`;

const Grayline = styled.div`
  border-bottom: 2px solid #d8d8d8;
  padding-top: 16px;
`;

const UserProfileIcon = styled(UserProfileSvg)`
  fill: none;
  stroke: black;
  margin-right: 10px;
`;

export default UserProfileDetails;
