import React, { useState } from 'react';
import ModalComponent from 'components/Modal';
import exitIconImg from 'assets/img/icons/exit-icon.png';
import notifyIcon from 'assets/svg/icons/notify-black.svg';
import { Link } from 'react-router-dom';
import Toast from 'utils/Toast';
import * as S from './styles';

interface Props {
  isModalOpen: boolean;
  handleClose: () => void;
  username?: string;
  userId?: string;
}

const NotifyModal = ({ isModalOpen, handleClose, username }: Props) => {
  const [email, setEmail] = useState<string>('');
  // const { getAccessTokenSilently } = useAuth0();
  // const dispatch = useAppDispatch();
  // const userId = useAppSelector((state) => state.session.user.id);
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    //call the api and on success show success toaster. In case of error show the error toaster - To be done in the integration
    Toast.success(
      "Success, you'll now be notified of upcoming news from this creator."
    );
    setError(false);
    setEmail('');
    handleClose();
    if (error) {
      Toast.error(
        'There was an error processing your request. Please try again'
      );
    }
  };

  const onChange = (event) => {
    setEmail(event?.target?.value);
    setError(!isValidEmail(event?.target?.value));
  };

  const isValidEmail = (input) => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(input);
  };

  return (
    <>
      <ModalComponent open={isModalOpen} height="388px">
        <S.Container>
          <S.Icon>
            <S.ExitIconImg src={exitIconImg} onClick={handleClose} />
          </S.Icon>

          <S.Content>
            <S.Header>
              <S.NotifyIconImg src={notifyIcon} />
              Notify me
            </S.Header>
            <S.SubHeader>
              Subscribe and stay up to date on the newest updates from{' '}
              <Link to={`/collection/${username}`} onClick={handleClose}>
                {username}
              </Link>
              .
            </S.SubHeader>
            <S.EmailInput
              name="subscribe"
              type="email"
              onChange={onChange}
              value={email}
              placeholder="Enter your email"
              error={error}
              helperText={error ? 'Invalid Email address' : ''}
            ></S.EmailInput>
            <S.SubscribeButton
              disabled={error || !email}
              onClick={handleSubmit}
              style={{
                height: '56px',
                borderRadius: '25px',
              }}
            >
              Subscribe
            </S.SubscribeButton>
          </S.Content>
        </S.Container>
      </ModalComponent>
    </>
  );
};

export default NotifyModal;
