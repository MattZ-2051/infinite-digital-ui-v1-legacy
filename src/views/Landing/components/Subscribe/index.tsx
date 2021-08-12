import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from 'store/hooks';
import { config } from 'config';
import { subscribeMail } from 'services/api/subscribe';
import Toast from 'utils/Toast';
import { useMediaQuery } from '@material-ui/core';

const Subscribe = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const loggedInUser = useAppSelector((state) => state.session.user);
  const [subscribed, setSubscribed] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('Join the mailing list');
  const matchesSmallMobile = useMediaQuery('(max-width:460px)', {
    noSsr: true,
  });

  const buttonTextDone = 'Done';
  const onChange = (event) => {
    setEmail(event?.target?.value);
    setError(!isValidEmail(event?.target?.value));
    setSubmitted(false);
  };

  const isValidEmail = (input) => {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(input);
  };

  const isButtonDisable =
    (error && submitted) || !email || buttonText == buttonTextDone;

  const { isAuthenticated } = useAuth0();

  const subscribe = async () => {
    setSubmitted(true);
    if (!error) {
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
          'Thanks for signing up for the Infinite newsletter! Stay tuned for more updates coming soon.'
        );
        setButtonText(buttonTextDone);
      } catch (error) {
        Toast.error('Whoops! Something went wrong, Please try again.');
      }
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
    <S.BackgroundContainer>
      <S.Container>
        <S.SubHeader color="#3e4818" margin="240px 0 16px 0">
          Our Vision
        </S.SubHeader>
        <S.Header>
          The premier NFT Solution Provider for market leading brands and global
          influencers
        </S.Header>
        <S.SubHeader
          color="black"
          margin="56px 0 56px 0"
          style={{ opacity: 1, fontWeight: 600 }}
        >
          Sign up for our mailing list to be {matchesSmallMobile && <br />}the
          first to know!
        </S.SubHeader>
        <>
          <S.EmailInput
            name="subscribe"
            type="email"
            id="standard-basic"
            onChange={onChange}
            value={email}
            placeholder="Enter your email"
            error={error && submitted}
            helperText={
              error && submitted ? 'Email must be formatted correctly.' : ''
            }
            isDisabled={buttonText == buttonTextDone}
          />
          <S.SubscribeButton
            disabled={isButtonDisable}
            style={{
              height: '56px',
              borderRadius: '25px',
              backgroundColor: isButtonDisable
                ? 'rgba(0, 0, 0, 0.16)'
                : 'black',
              color: isButtonDisable ? 'black' : 'white',
            }}
            onClick={subscribe}
          >
            {buttonText}
          </S.SubscribeButton>{' '}
        </>
      </S.Container>
    </S.BackgroundContainer>
  );
};

export default Subscribe;
