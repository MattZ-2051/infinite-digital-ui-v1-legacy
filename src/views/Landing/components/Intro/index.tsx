import * as S from './styles';
import Waves from './Waves';

const Intro = () => {
  return (
    <div style={{ background: 'black' }}>
      <S.Container>
        <div style={{ height: '35%' }}>
          <S.Text color="#ddf874">
            We bring brands and creators into the Megaverse
          </S.Text>
          <S.Text color="white">
            the virtual and physical worlds combined
          </S.Text>
        </div>
      </S.Container>
      <Waves />
    </div>
  );
};

export default Intro;
