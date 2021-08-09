import { useState } from 'react';
import { IOption } from './IOption';
import * as S from './styles';

export const CollapsibleOption = ({ title, text }: IOption) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <S.Container isOpen={isOpen}>
      <S.MenuOptionTitle onClick={handleOpen} isOpen={isOpen}>
        <S.Title>{title}</S.Title>
        <S.Sign>{isOpen ? '-' : '+'}</S.Sign>
      </S.MenuOptionTitle>
      {isOpen && <S.Text>{text}</S.Text>}
    </S.Container>
  );
};
