import { useState } from 'react';
import ModalComponent from 'components/Modal';
import * as S from './styles';
import exitIconImg from 'assets/img/icons/exit-icon.png';
import styled from 'styled-components/macro';
import { ReactComponent as UserProfileSvg } from 'assets/svg/icons/user-profile-icon.svg';
import Toast from 'utils/Toast';
import { useAppSelector } from 'store/hooks';
import Username from './components/Username';
import EmailAddress from './components/EmailAddress';
import Password from './components/Password';

interface Props {
  isModalOpen: boolean;
  handleClose: () => void;
}

const UserProfileDetails = ({ isModalOpen, handleClose }) => {
  const currentUsername = useAppSelector(
    (state) => state.session.user.username
  );
  const currentEmail = useAppSelector((state) => state.session.user.email);
  const [editingUsername, setEditingUsername] = useState<boolean>(false);
  return (
    <ModalComponent open={isModalOpen}>
      <S.Body>
        <S.Icon>
          <S.ExitIconImg src={exitIconImg} onClick={handleClose} />
        </S.Icon>
        <ModalHeader style={{ width: '100%' }}>
          <BorderWrapper>
            <FlexAlignCenter>
              <UserProfileIcon />
              <ModalTitle>Profile Details</ModalTitle>
            </FlexAlignCenter>
          </BorderWrapper>
          <Grayline />
        </ModalHeader>
        <S.Content>
          <Username currentUsername={currentUsername} />
          <EmailAddress currentEmail={currentEmail} />
          <Password />
        </S.Content>
      </S.Body>
    </ModalComponent>
  );
};

const ModalHeader = styled.header``;

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
  padding-bottom: 17px;
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
