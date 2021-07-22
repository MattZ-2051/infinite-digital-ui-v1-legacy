import { Dispatch, SetStateAction, useState, useRef, useEffect } from 'react';
import { updateUsernameThunk } from 'store/session/sessionThunks';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getUser } from 'services/api/userService';
import * as S from '../styles';
import { ClipLoader } from 'react-spinners';

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
  const [newUsername, setNewUsername] = useState<string>(currentUsername);
  useEffect(() => {
    setNewUsername(currentUsername);
  }, [currentUsername, editingUsername]);

  // Update username dispatch
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.session.user.id);

  // State for feedback
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [modified, setModified] = useState<boolean>(false);
  const [usernameInvalid, setUsernameInvalid] = useState<boolean>(false);

  const handleReset = () => {
    setErrorMessage('');
    setUsernameInvalid(false);
    setModified(false);
    setEditingUsername(false);
  };

  const handleSubmit = async () => {
    const token = await getAccessTokenSilently();
    const data = { token: token, userId: userId, username: newUsername };

    const userWithName = await getUser(newUsername, 1, 1);
    if (userWithName[0]) {
      setErrorMessage('The username you selected is already taken.');
      setUsernameInvalid(true);
      return;
    }

    setLoading(true);
    const res = await dispatch(updateUsernameThunk(data));

    if (res.type.split('/')[3] === 'rejected') {
      setErrorMessage('An Error Occurred');
    } else {
      setErrorMessage('');
    }
    setLoading(false);
    handleReset();
    return;
  };

  const handleChange = (e) => {
    if (!modified) setModified(true);
    setNewUsername(e.target.value);
  };

  useEffect(() => {
    if (!editingUsername) return;

    let notValid = false;
    setUsernameInvalid(false);
    setErrorMessage('');

    if (newUsername.length === 0 || newUsername === currentUsername) {
      setUsernameInvalid(true);
      setErrorMessage('Please enter a new username');
      notValid = true;
    }
    if (/[!@#$%^&*)(+=.<>{} \[\]:;'"|~\/]/g.test(newUsername)) {
      setUsernameInvalid(true);
      setErrorMessage(
        `${'Your username must be between 3 and 18 characters long and cannot include spaces or these characters: / ! @ # $ % ^ & * ( ) + = < > { }[ ] . : ;\'"|~'}`
      );
      notValid = true;
    }
    if (newUsername.length < 3 || newUsername.length > 18) {
      setUsernameInvalid(true);
      setErrorMessage(
        `${'Your username must be between 3 and 18 characters long and cannot include spaces or these characters: / ! @ # $ % ^ & * ( ) + = < > { }[ ] . : ;\'"|~'}`
      );
      notValid = true;
    }
    if (!notValid) {
      const debounceCheckAvailable = setTimeout(async () => {
        const userWithName = await getUser(newUsername, 1, 1);
        if (userWithName[0]) {
          setErrorMessage('The username you selected is already taken.');
          setUsernameInvalid(true);
        }
      }, 1000);
      return () => clearTimeout(debounceCheckAvailable);
    }
  }, [newUsername]);

  const usernameInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editingUsername) {
      usernameInputRef.current?.focus();
    }
  }, [editingUsername]);

  return (
    <>
      <S.ModalSection error={modified && usernameInvalid}>
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
          </S.Input>
          {editingUsername ? (
            <>
              <S.Button className="button__cancel" onClick={handleReset}>
                Cancel
              </S.Button>

              <S.Button
                disabled={
                  usernameInvalid || newUsername === currentUsername || loading
                }
                onClick={handleSubmit}
              >
                {loading ? <ClipLoader size={20} color="#fff" /> : 'Save'}
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
      {editingUsername && modified && usernameInvalid && (
        <S.Error>{errorMessage}</S.Error>
      )}
    </>
  );
};

export default EditUsername;
