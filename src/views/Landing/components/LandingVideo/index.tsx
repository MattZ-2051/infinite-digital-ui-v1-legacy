import { useEffect, useRef } from 'react';
import { useMediaQuery } from '@material-ui/core';
import * as S from './styles';

const VideoView = ({ src }: { src: string }) => {
  const vidRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    vidRef.current?.play();
    return () => {
      vidRef.current?.pause();
    };
  }, []);
  return (
    <video
      ref={vidRef}
      style={{
        width: '100%',
        height: '100%',
      }}
      autoPlay={true}
      controls={true}
      loop={true}
      muted={true}
      src={src}
    ></video>
  );
};

interface IProps {
  login: (options?: { screen_hint: string }) => void;
  isAuthenticated: boolean;
}

const LandingVideo = ({ isAuthenticated, login }: IProps) => {
  const matchesMobile = useMediaQuery('(max-width: 460px)');

  const handleSignUp = () => {
    login({ screen_hint: 'signup' });
  };
  return (
    <S.BackgroundContainer>
      <S.Container>
        <VideoView src="https://infinite-digital-prod.s3.amazonaws.com/InfiniteWorld-CarsPromo_v1_August2021.mp4" />
        <S.Header>
          Take your passion for the road
          {!matchesMobile && <br />} to the metaverse
        </S.Header>
        <S.SubHeader>
          We’re utilizing blockchain technology to connect the physical and
          digital world to {!matchesMobile && <br />}
          create interactive NFT experiences for the automotive industry. Stay
          tuned for updates!
        </S.SubHeader>
        <S.FlexDiv>
          {!isAuthenticated && (
            <S.Button width="179px" onClick={handleSignUp}>
              Sign Up Now
            </S.Button>
          )}
        </S.FlexDiv>
      </S.Container>
    </S.BackgroundContainer>
  );
};

export default LandingVideo;
