import * as S from '../styles';

const Password = () => (
  <S.ModalSection>
    <S.ModalSectionTitle>Password</S.ModalSectionTitle>
    <S.FlexSpaceBetween>
      <span style={{ color: '#000' }}>• • • • • •</span>
      <S.ButtonWithIcon>
        <span>Send password reset email</span>
        <S.IconContainer>
          <S.ResetIcon />
        </S.IconContainer>
      </S.ButtonWithIcon>
    </S.FlexSpaceBetween>
  </S.ModalSection>
);

export default Password;
