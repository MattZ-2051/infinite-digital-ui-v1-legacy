import * as S from '../styles';

const Password = () => (
  <S.ModalSection>
    <S.ModalSectionTitle>Password</S.ModalSectionTitle>
    <S.FlexSpaceBetween>
      <span style={{ color: '#000' }}>• • • • • •</span>
      <S.TextWithIcon>
        <span>Send password reset email</span>
        <S.ToggleButton>
          <S.ResetIcon />
        </S.ToggleButton>
      </S.TextWithIcon>
    </S.FlexSpaceBetween>
  </S.ModalSection>
);

export default Password;
