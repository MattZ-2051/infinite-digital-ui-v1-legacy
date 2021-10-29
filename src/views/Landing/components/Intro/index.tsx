import { useEffect, useRef } from 'react';
import * as S from './styles';

const Intro = () => {
  const vidRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    vidRef.current?.play();
    return () => {
      vidRef.current?.pause();
    };
  }, []);
  return (
    <S.Wrapper>
      <S.Container>
        <div>
          <S.Text color="#ddf874">
            We bring brands and creators into the Megaverse
          </S.Text>
          <S.Text color="white">
            the virtual and physical worlds combined
          </S.Text>
        </div>
      </S.Container>
      <S.StyledBackgroundVideo
        ref={vidRef}
        autoPlay={true}
        preload="metadata"
        loop={true}
        muted={true}
        controls={false}
        src="https://infinite-digital-prod.s3.amazonaws.com/WaveAnimation.mp4"
      />
    </S.Wrapper>
  );
};

export default Intro;
