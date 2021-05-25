import { useState } from 'react';
import ModalComponent from 'components/Modal';
import exitIconImg from 'assets/img/icons/exit-icon.png';
import checkIconImg from 'assets/img/icons/check-icon.png';
import { updateUsernameThunk } from 'store/session/sessionThunks';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import * as S from './styles';

interface Props {
  isModalOpen: boolean;
  handleClose: () => void;
}

const EditModal = ({ isModalOpen, handleClose }: Props) => {
  const [newUsername, setNewUsername] = useState<string>('');
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.session.user.id);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async () => {
    const token = await getAccessTokenSilently();
    const data = { token: token, userId: userId, username: newUsername };
    if (newUsername.length === 0) {
      setErrorMessage('Please enter a new username');
      return;
    }
    const res = await dispatch(updateUsernameThunk(data));
    if (res.type.split('/')[3] === 'rejected') {
      setConfirmed(false);
      setErrorMessage('An Error Occurred');
    } else {
      setConfirmed(true);
      setErrorMessage('');
      setTimeout(() => {
        setConfirmed(false);
        handleClose();
      }, 1500);
    }

    setNewUsername('');
    return;
  };

  const handleChange = (e) => {
    setConfirmed(false);
    setNewUsername(e.target.value);
  };

  return (
    <>
      <ModalComponent open={isModalOpen} height="280px">
        <S.Container>
          {
            <S.Body>
              <S.Icon>
                <S.ExitIconImg src={exitIconImg} onClick={handleClose} />
              </S.Icon>
              <S.Content>
                <S.Header>Edit Your Username</S.Header>
                {errorMessage === '' ? null : (
                  <S.SubHeader style={{ color: 'red' }}>
                    {errorMessage}
                  </S.SubHeader>
                )}

                <S.Input>
                  <S.At>@</S.At>
                  <S.UsernameInput
                    onChange={handleChange}
                    value={newUsername}
                    placeholder="Username"
                  />
                  <S.CheckIcon>
                    {confirmed && <S.CheckIconImg src={checkIconImg} />}
                  </S.CheckIcon>
                </S.Input>
                <S.Border></S.Border>
                <div style={{ paddingTop: '40px' }}>
                  <S.Button onClick={handleSubmit}>Update Username</S.Button>
                </div>
              </S.Content>
            </S.Body>
          }
        </S.Container>
      </ModalComponent>
    </>
  );
};

export default EditModal;
