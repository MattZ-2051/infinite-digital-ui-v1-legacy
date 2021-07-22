import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from 'store/hooks';
import { config } from 'config';
import { subscribeMail } from 'services/api/subscribe';
import Toast from 'utils/Toast';

const Subscribe = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const loggedInUser = useAppSelector((state) => state.session.user);
  const [subscribed, setSubscribed] = useState<string>('');
  const [header, setHeader] = useState<string>(
    'Stay up to date on the latest updates!'
  );
  const [tagline, setTagline] = useState<string>(
    "Want to know what's coming next?"
  );
  const [buttonText, setButtonText] = useState<string>(
    'Join our mailing list!'
  );
  const buttonTextDone = 'Done';
  const onChange = (event) => {
    setEmail(event?.target?.value);
    setError(!isValidEmail(event?.target?.value));
  };

  const isValidEmail = (input) => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(input);
  };

  const { isAuthenticated } = useAuth0();

  const subscribe = async () => {
    const fields = [{ name: 'email', value: email }];
    if (isAuthenticated) {
      fields.push({ name: 'infinite_userid', value: loggedInUser.id });
      fields.push({
        name: 'infinite_username',
        value: loggedInUser.username,
      });
    }
    try {
      const resp = await subscribeMail(fields);
      setSubscribed(resp);
      Toast.success(
        'Thanks for signing up for the INFINITE newsletter! Stay tuned for more updates coming soon.'
      );
      setHeader('Thanks for signing up!');
      setTagline('Newsletter signup successful');
      setButtonText(buttonTextDone);
    } catch (error) {
      Toast.error('Whoops! Something went wrong, Please try again.');
    }
  };

  useEffect(() => {
    if (subscribed) {
      const timer = setTimeout(() => {
        setSubscribed('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [subscribed]);
  return (
    <S.Container>
      <S.Tagline>{tagline}</S.Tagline>
      <S.Header>{header}</S.Header>
      <>
        <S.EmailInput
          name="subscribe"
          type="email"
          id="standard-basic"
          onChange={onChange}
          value={email}
          placeholder="Enter your email"
          error={error}
          helperText={error ? 'Email must be formatted correctly.' : ''}
          isDisabled={buttonText == buttonTextDone}
        />
        <S.SubscribeButton
          disabled={error || !email || buttonText == buttonTextDone}
          color="gray"
          style={{
            height: '56px',
            borderRadius: '25px',
          }}
          onClick={subscribe}
        >
          {buttonText}
        </S.SubscribeButton>{' '}
      </>
    </S.Container>
  );
};

export default Subscribe;
