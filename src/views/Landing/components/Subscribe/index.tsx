import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from 'store/hooks';
import { config } from 'config';
import { subscribeMail } from 'services/api/subscribe';

const Subscribe = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const loggedInUser = useAppSelector((state) => state.session.user);
  const [subscribed, setSubscribed] = useState<string>('');

  const onChange = (event) => {
    setEmail(event?.target?.value);
    setError(!isValidEmail(event?.target?.value));
  };

  const isValidEmail = (input) => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(input);
  };

  const subscribe = () => {
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
      } catch (error) {}
      setEmail('');
    };
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
      <S.Tagline>Want to know what is coming next?</S.Tagline>
      <S.Header>Stay up to date on the newest updates.</S.Header>
      {subscribed === '' ? (
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
          />
          <S.SubscribeButton
            disabled={error || !email}
            color="gray"
            style={{
              height: '56px',
              borderRadius: '25px',
            }}
            onClick={subscribe}
          >
            Subscribe now!
          </S.SubscribeButton>{' '}
        </>
      ) : (
        <span style={{ color: 'white', marginTop: 20, fontSize: '18px' }}>
          Thanks for subscribing!
        </span>
      )}
    </S.Container>
  );
};

export default Subscribe;
