import { useAppDispatch } from 'hooks/store';
import { Redirect } from 'react-router-dom';
import { logout } from 'store/session/sessionSlice';
import { deleteToken } from 'lib/utils/auth';

const SignOut = () => {
  const dispatch = useAppDispatch();
  deleteToken();
  dispatch(logout());
  return <Redirect to="/" />;
};

export default SignOut;
