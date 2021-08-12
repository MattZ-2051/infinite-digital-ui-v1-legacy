import { useState } from 'react';
import { IOption } from './IOption';
import * as S from './styles';
import { ReactComponent as PlusSign } from 'assets/svg/icons/plusplusSign.svg';
import { ReactComponent as MinusSign } from 'assets/svg/icons/minusSign.svg';

export const CollapsibleOption = ({ title, text }: IOption) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <S.Container isOpen={isOpen}>
      <S.MenuOptionTitle onClick={handleOpen} isOpen={isOpen}>
        <S.Title>{title}</S.Title>

        <S.Sign>{isOpen ? <MinusSign /> : <PlusSign />}</S.Sign>
      </S.MenuOptionTitle>
      {isOpen && <S.Text>{text}</S.Text>}
    </S.Container>
  );
};
