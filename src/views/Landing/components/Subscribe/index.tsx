import React, { useState } from 'react';
import * as S from './styles';

const Subscribe = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const onChange = (event) => {
    setEmail(event?.target?.value);
    setError(!isValidEmail(event?.target?.value));
  };

  const isValidEmail = (input) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(input);
  };

  const subscribe = () => {
    console.log('subscribed!');
  };
  return (
    <S.Container>
      <S.Tagline>Want to know what is coming next?</S.Tagline>
      <S.Header>Stay up to date on the newest updates.</S.Header>
      <S.EmailInput
        name="subscribe"
        type="email"
        id="standard-basic"
        onChange={onChange}
        value={email}
        placeholder="Enter your email"
        error={error}
        helperText={error ? 'Invalid Email address' : ''}
      ></S.EmailInput>
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
      </S.SubscribeButton>
    </S.Container>
  );
};

export default Subscribe;
