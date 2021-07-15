import { Dispatch, SetStateAction, useState, useRef, useEffect } from 'react';
import checkIconImg from 'assets/img/icons/check-icon.png';
import { updateUsernameThunk } from 'store/session/sessionThunks';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import * as S from '../styles';
import Loader from 'components/Loader';
import { getUser } from 'services/api/userService';
interface IEditUsernameProps {
  currentUsername: string;
  editingUsername: boolean;
  setEditingUsername: Dispatch<SetStateAction<boolean>>;
}

const EditUsername = ({
  currentUsername,
  editingUsername,
  setEditingUsername,
}: IEditUsernameProps): JSX.Element => {
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

  const [usernameInvalid, setUsernameInvalid] = useState<boolean>(false);

  const handleSubmit = async () => {
    const token = await getAccessTokenSilently();
    const data = { token: token, userId: userId, username: newUsername };

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

    setConfirmed(false);
  };

  useEffect(() => {
    let isValid = true;
    setErrorMessage('');
    if (newUsername.length === 0 || newUsername === currentUserName) {
      isValid = false;
      setErrorMessage('Please enter a new username');
      // hide save button?
    }
    if (/[!@#$%^&*)(+=.<>{} \[\]:;'"|~\/]/g.test(newUsername)) {
      isValid = false;
      setErrorMessage(
        `${'Your username cannot include spaces or these characters:/  ! @ # $ % ^ & * ( ) + = < > { }[ ] . : ;\'"|~'}`
      );
    }
    if (newUsername.length < 3 || newUsername.length > 18) {
      isValid = false;
      setErrorMessage(
        'Your username must be between 3 and 18 characters long.'
      );
    }
    if (isValid) {
      const debounceCheckAvailable = setTimeout(async () => {
        const userWithName = await getUser(newUsername, 1, 1);
        if (userWithName[0]) {
          console.log(userWithName);
          setErrorMessage('The username you selected is already taken.');
        }
      }, 1000);
      return () => clearTimeout(debounceCheckAvailable);
    }
  }, [newUsername]);

  const handleChange = (e) => {
    //setErrorMessage('');
    //setConfirmed(false);
    //setLoading(false);
    setNewUsername(e.target.value);
  };

  const usernameInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editingUsername) {
      usernameInputRef.current?.focus();
    }
  }, [editingUsername]);

  return (
    <>
      <S.ModalSection>
        <S.ModalSectionTitle>Username</S.ModalSectionTitle>
        <S.FlexSpaceBetween>
          <S.Input>
            <S.At>@</S.At>
            {editingUsername ? (
              <>
                <S.UsernameInput
                  onChange={handleChange}
                  value={newUsername}
                  placeholder="Username"
                  ref={usernameInputRef}
                />
              </>
            ) : (
              <>
                <S.UsernameDisplay>{currentUsername}</S.UsernameDisplay>
                <S.CheckIcon />
              </>
            )}

            {/*confirmed && */}
            {/*<S.IconContainer onClick={handleSubmit}>*/}
          </S.Input>
          {editingUsername ? (
            <>
              <S.Button onClick={() => setEditingUsername(false)}>
                Save
              </S.Button>
              <S.Button
                style={{ backgroundColor: 'unset', color: '#000' }}
                onClick={() => setEditingUsername(false)}
              >
                Cancel
              </S.Button>
            </>
          ) : (
            <S.ButtonWithIcon onClick={() => setEditingUsername(true)}>
              <span>Edit</span>
              <S.IconContainer>
                <S.EditIcon />
              </S.IconContainer>
            </S.ButtonWithIcon>
          )}
        </S.FlexSpaceBetween>
      </S.ModalSection>
      <p>{errorMessage}</p>
    </>
  );
};

export default EditUsername;
