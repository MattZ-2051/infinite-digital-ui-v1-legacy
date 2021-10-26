import * as S from './styles';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import NavBar from 'components/Layout/NavBar';

const Intro = ({
  authenticated,
  login,
}: {
  authenticated: boolean;
  login: any;
}) => {
  const video = useRef<HTMLVideoElement>(null);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    video.current?.play();
    return () => {
      video.current?.pause();
    };
  }, []);

  return (
    <S.Background>
      <S.BgContainer>
        <S.BgImage />
      </S.BgContainer>
      <S.BodyContainer>
        <S.OnTop>
          <S.Title>Become an early member of InfiniteWorld</S.Title>
          <S.SubTitle>We{`'`}re creating the Megaverse!</S.SubTitle>
          <S.ScreenBG>
            <S.VideoScreen
              autoPlay={true}
              loop={true}
              ref={video}
              controls
              muted={true}
            >
              <source
                src="https://infinite-digital-prod.s3.amazonaws.com/vip-landing/InfiniteWorld-NYCVIP_VF_F.mp4"
                type="video/mp4"
              />
            </S.VideoScreen>
          </S.ScreenBG>
          <S.SubScreen>
            The InfiniteWorld Megaverse is launching soon with a universe of
            ways to collect NFTs, engage, play, and earn within a community of
            peers, brands, creators, artists, musicians, and athletes.
          </S.SubScreen>
          <S.SignSection>
            <S.SignUp>
              Sign Up now for VIP early access to InfiniteWorld.
            </S.SignUp>
            <S.LastText>
              {' '}
              Stay tuned for upcoming NFT drops, avatar collections, games, and
              features as they release.{' '}
            </S.LastText>

            {authenticated ? (
              <S.Link to="/marketplace/617047d7ae96a50793a11561">
                <S.Button2> Redeem your free NFT now</S.Button2>
              </S.Link>
            ) : (
              <S.Button2
                onClick={() => {
                  login({
                    appState: { returnTo: window.location.pathname },
                    redirectUri: window.location.origin,
                    screen_hint: 'signup',
                  });
                }}
                style={{ width: '250px' }}
              >
                {' '}
                Sign up
              </S.Button2>
            )}
          </S.SignSection>
        </S.OnTop>
        <S.Gradient1 />
        <S.Gradient2 />
        <S.Gradient3 />
      </S.BodyContainer>
    </S.Background>
  );
};

export default Intro;
