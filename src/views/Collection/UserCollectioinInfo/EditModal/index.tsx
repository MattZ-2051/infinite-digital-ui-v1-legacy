import { useState } from 'react';
import ModalComponent from 'components/Modal';
import exitIconImg from 'assets/img/icons/exit-icon.png';
import checkIconImg from 'assets/img/icons/check-icon.png';
import { updateUsernameThunk } from 'store/session/sessionThunks';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import * as S from './styles';
import Loader from 'components/Loader';

interface Props {
  isModalOpen: boolean;
  handleClose: () => void;
}

const EditModal = ({ isModalOpen, handleClose }: Props) => {
  let currentUserName = useAppSelector((state) => state.session.user.username);
  const updateMessage = 'Update Username';
  const [newUsername, setNewUsername] = useState<string>(currentUserName);
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.session.user.id);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonMessage, setButtonMessage] = useState<string>(updateMessage);

  const handleSubmit = async () => {
    const token = await getAccessTokenSilently();
    const data = { token: token, userId: userId, username: newUsername };
    if (newUsername.length === 0 || newUsername === currentUserName) {
      return setErrorMessage('Please enter a new username');
    }
    if (
      /[!@#$%^&*)(+=.<>{} \[\]:;'"|~\/]/g.test(newUsername) ||
      newUsername.length < 3 ||
      newUsername.length > 12
    ) {
      return setErrorMessage(
        `${'Your username must be between 3 and 12 characters long and cannot include spaces or these characters:/  ! @ # $ % ^ & * ( ) + = < > { }[ ] . : ;\'"|~'}`
      );
    }
    setLoading(true);
    const res = await dispatch(updateUsernameThunk(data));
    if (res.type.split('/')[3] === 'rejected') {
      setConfirmed(false);
      setErrorMessage('An Error Occurred');
    } else {
      setConfirmed(true);
      setErrorMessage('');
      setTimeout(() => {
        resetAndHandleClose();
      }, 1500);
    }
    setLoading(false);
    setButtonMessage('Done!');
    currentUserName = newUsername;
    return;
  };
  const resetAndHandleClose = () => {
    setErrorMessage('');
    setButtonMessage(updateMessage);
    setConfirmed(false);
    handleClose();
  };
  const handleChange = (e) => {
    setErrorMessage('');
    setConfirmed(false);
    setLoading(false);
    setNewUsername(e.target.value);
  };

  return (
    <>
      <ModalComponent open={isModalOpen} height="280px">
        <S.Container>
          {
            <S.Body>
              <S.Icon>
                <S.ExitIconImg
                  src={exitIconImg}
                  onClick={resetAndHandleClose}
                />
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
                  <S.Button onClick={handleSubmit}>
                    {loading && <Loader color="white" size={10} />}
                    {!loading && buttonMessage}
                  </S.Button>
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
