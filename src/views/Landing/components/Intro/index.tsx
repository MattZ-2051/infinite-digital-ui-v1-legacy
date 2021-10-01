import * as S from './styles';

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
      <S.StyledWaves />
    </div>
  );
};

export default Intro;
