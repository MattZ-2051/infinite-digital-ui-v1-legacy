import { useState } from 'react';
import * as S from './styles';
export const FilterHamburguer = ({ isHidden, setIsHidden }) => {
  return (
    <S.Circle onClick={() => setIsHidden(!isHidden)}>
      <S.Container>
        <S.Bar1 change={isHidden} />
        <S.Bar2 change={isHidden} />
        <S.Bar3 change={isHidden} />
      </S.Container>
    </S.Circle>
  );
};
