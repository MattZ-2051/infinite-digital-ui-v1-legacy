import * as S from '../styles';
import { ClipLoader } from 'react-spinners';
const Spinner = (): JSX.Element => (
  <S.BodyContainer style={{ minHeight: '551px' }}>
    <S.Centered>
      <ClipLoader size={80} />
      <p style={{ color: '#7d7d7d', maxWidth: '16ch' }}>
        Processing your request. Do not close this window.
      </p>
    </S.Centered>
  </S.BodyContainer>
);

export default Spinner;
