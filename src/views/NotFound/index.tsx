import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Buttons';

import * as S from './styles';

const NotFound = (): JSX.Element => {
  return (
    <S.Container>
      <S.ColoredHeader>Oh,no!</S.ColoredHeader>
      <S.Header>This page does not exist.</S.Header>
      <S.SubTitle>
        The page you are looking for was moved, removed, renamed or might never
        existed!
      </S.SubTitle>
      <Link to="/">
        <Button color="white" style={{ padding: '14px 24px' }}>
          Go to homepage
        </Button>
      </Link>
    </S.Container>
  );
};

export default NotFound;
