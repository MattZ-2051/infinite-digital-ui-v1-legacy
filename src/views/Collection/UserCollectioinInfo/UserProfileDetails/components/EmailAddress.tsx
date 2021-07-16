import * as S from '../styles';

interface IEmailAddressProps {
  currentEmail: string;
}
const EmailAddress = ({ currentEmail }: IEmailAddressProps): JSX.Element => (
  <S.ModalSection>
    <S.ModalSectionTitle>Email Address</S.ModalSectionTitle>
    <p>{currentEmail}</p>
  </S.ModalSection>
);

export default EmailAddress;
