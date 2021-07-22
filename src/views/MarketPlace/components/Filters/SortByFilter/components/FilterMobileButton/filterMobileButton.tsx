import { useState } from 'react';
import * as S from './styles';
export const FilterHamburguer = ({ change }) => {
  return (
    <S.Circle>
      <S.Container>
        <S.Bar1 change={change} />
        <S.Bar2 change={change} />
        <S.Bar3 change={change} />
      </S.Container>
    </S.Circle>
  );
};
