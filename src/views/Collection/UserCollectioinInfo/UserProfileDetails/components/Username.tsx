import { useState } from 'react';
import checkIconImg from 'assets/img/icons/check-icon.png';
import { updateUsernameThunk } from 'store/session/sessionThunks';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import * as S from '../styles';
import Loader from 'components/Loader';

interface IEditUsernameProps {
  currentUsername: string;
}

const EditUsername = ({ currentUsername }) => {
  let currentUserName = useAppSelector((state) => state.session.user.username);
  const updateMessage = 'Save';
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
  };
  const handleChange = (e) => {
    setErrorMessage('');
    setConfirmed(false);
    setLoading(false);
    setNewUsername(e.target.value);
  };

  return (
    <S.ModalSection>
      <S.ModalSectionTitle>Username</S.ModalSectionTitle>
      <S.FlexSpaceBetween>
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
        <S.TextWithIcon>
          <span>Edit</span>
          <S.ToggleButton onClick={handleSubmit}>
            <S.EditIcon />
          </S.ToggleButton>
        </S.TextWithIcon>
      </S.FlexSpaceBetween>
    </S.ModalSection>
  );
};

export default EditUsername;
