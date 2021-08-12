import * as S from './styles';
import { ReactComponent as CloseModal } from 'assets/svg/icons/close-modal.svg';
import {Link} from "react-router-dom";
import React from "react";

interface IProps {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const CookieBanner = ({ isVisible, setIsVisible }: IProps): JSX.Element => {
  return (
    <>
      {isVisible && (
        <S.Container>
          <S.CloseButton onClick={() => setIsVisible(false)}>
            <CloseModal style={{ cursor: 'pointer' }} />
          </S.CloseButton>
          <S.Text>
            By using this website, you agree to our use of cookies as outlined
            in our <Link to="/privacy">Privacy Policy.</Link>
            <br />
            We use cookies to provide you with a great experience and to help
            our website run effectively.
          </S.Text>
        </S.Container>
      )}
    </>
  );
};

export default CookieBanner;
