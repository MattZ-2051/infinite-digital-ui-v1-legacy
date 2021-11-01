import { useEffect, useRef } from 'react';
import arrowIcon from '../../../../assets/svg/icons/landing-arrow.svg';
import metaverseIcon from '../../../../assets/img/icons/metaverse-icon.png';
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
        <S.TextContainer>
          <S.FirstRowContainer>
            <S.TextFirstRow>We bring</S.TextFirstRow>
            <S.ArrowIcon src={arrowIcon} />
          </S.FirstRowContainer>
          <S.MiddleRowContainer>
            <S.TextMiddleRow>brands and creators</S.TextMiddleRow>
          </S.MiddleRowContainer>
          <S.LastRowContainer>
            <S.Pill>into</S.Pill>
            <S.TextLastRow>The Metaverse</S.TextLastRow>
            <S.MetaverseIcon src={metaverseIcon} />
          </S.LastRowContainer>
        </S.TextContainer>
        <S.SubText color="white">
          The virtual and physical worlds combined.
        </S.SubText>
      </S.Container>
      <S.StyledBackgroundVideo
        ref={vidRef}
        autoPlay={true}
        playsInline={true}
        preload="metadata"
        loop={true}
        muted={true}
        controls={false}
        src="https://infinite-digital-prod.s3.amazonaws.com/WaveAnimation2.mp4"
      />
    </S.Wrapper>
  );
};

export default Intro;
