import { useState } from 'react';
import ModalComponent from 'components/Modal';
import * as S from './styles';
import exitIconImg from 'assets/img/icons/exit-icon.png';
import { useAppSelector } from 'store/hooks';
import Username from './components/Username';
import EmailAddress from './components/EmailAddress';
import Password from './components/Password';

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

  return (
    <ModalComponent open={isModalOpen}>
      <S.Body>
        <S.Icon>
          <S.ExitIconImg src={exitIconImg} onClick={handleCloseAndReset} />
        </S.Icon>
        <S.ModalHeader>
          <S.BorderWrapper>
            <S.FlexAlignCenter>
              <S.UserProfileIcon />
              <S.ModalTitle>Profile Details</S.ModalTitle>
            </S.FlexAlignCenter>
          </S.BorderWrapper>
          <S.Grayline />
        </S.ModalHeader>
        <S.Content>
          <Username
            currentUsername={currentUsername}
            editingUsername={editingUsername}
            setEditingUsername={setEditingUsername}
          />
          <EmailAddress currentEmail={currentEmail} />
          {!userIsSocial && <Password currentEmail={currentEmail} />}
        </S.Content>
      </S.Body>
    </ModalComponent>
  );
};

export default UserProfileDetails;
