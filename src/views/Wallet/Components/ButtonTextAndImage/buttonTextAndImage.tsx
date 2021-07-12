import { useState } from 'react';
import * as S from './styles';
import { IButtonTextAndImage } from './IButtonTextAndImage';

const ButtonTextAndImage = ({
  text,
  handlerOnClick,
  normalIcon,
  hoverIcon,
}: IButtonTextAndImage) => {
  const [icon, setIcon] = useState<string>(normalIcon);
  return (
    <S.ButtonContainer>
      <S.ActionButton
        onClick={handlerOnClick}
        onMouseEnter={() => {
          setIcon(hoverIcon);
        }}
        onMouseLeave={() => {
          setIcon(normalIcon);
        }}
      >
        <S.TextInButton>{text}</S.TextInButton>
        <S.IconContainer>
          <S.Icon src={icon} />
        </S.IconContainer>
      </S.ActionButton>
    </S.ButtonContainer>
  );
};

export default ButtonTextAndImage;
