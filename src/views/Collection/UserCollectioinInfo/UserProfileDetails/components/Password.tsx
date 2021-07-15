import * as S from '../styles';
import Toast from 'utils/Toast';
import { requestPasswordReset } from 'services/api/userService';
import { useAuth0 } from '@auth0/auth0-react';

interface IPasswordProps {
  currentEmail: string;
}

const Password = ({ currentEmail }: IPasswordProps): JSX.Element => {
  const { getAccessTokenSilently } = useAuth0();
  const handleResetPassword = async () => {
    const response = await requestPasswordReset(
      await getAccessTokenSilently(),
      currentEmail
    );

    const ToastMessage = () => (
      <>
        Check your email address for the email with the link we sent you to
        reset your password. Didn’t receive it?{' '}
        <a onClick={handleResetPassword}>Try Again</a>
      </>
    );

    if (response.status === 200) {
      Toast.success(<ToastMessage />, 'reset-success-toast');
    }
  };

  return (
    <S.ModalSection>
      <S.ModalSectionTitle>Password</S.ModalSectionTitle>
      <S.FlexSpaceBetween>
        <span style={{ color: '#000', minWidth: 'max-content' }}>
          • • • • • •
        </span>
        <S.ButtonWithIcon onClick={handleResetPassword}>
          <span>Send password reset email</span>
          <S.IconContainer>
            <S.ResetIcon />
          </S.IconContainer>
        </S.ButtonWithIcon>
      </S.FlexSpaceBetween>
    </S.ModalSection>
  );
};

export default Password;
