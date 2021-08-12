import * as S from './styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DropImg from 'assets/img/backgrounds/spencer-hero.png';
import { useHistory } from 'react-router';
import HeroLoadingImg from 'assets/img/backgrounds/hero-loading.png';
import { useEffect, useRef } from 'react';

interface IProps {
  login: (options?: { screen_hint: string }) => void;
  isAuthenticated: boolean;
}

const Hero = ({ login, isAuthenticated }: IProps): JSX.Element => {
  const matchesMobile = useMediaQuery('(max-width:1140px)', { noSsr: true });
  const history = useHistory();
  const handleSignUp = () => {
    login({ screen_hint: 'signup' });
  };
  const vidRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    vidRef.current?.play();
    return () => {
      vidRef.current?.pause();
    };
  }, []);
  return (
    <div style={{ backgroundColor: 'black' }}>
      <S.Container>
        <S.SubContainer order={matchesMobile ? 1 : 0}>
          <S.Title fontSize={matchesMobile ? '32px' : '64px'}>
            Spencer Dinwiddie’s <br /> <span>1st NFT Release!</span>
          </S.Title>
          <div style={{ paddingTop: matchesMobile ? '0' : '24px' }}>
            <S.Subtitle color="white" fontSize="18px" fontWeight={600}>
              {"Redeemable 3D/AR NFTs from Spencer's K8IROS sneaker line"}
            </S.Subtitle>
          </div>

          <div
            style={{
              padding: matchesMobile ? '10px 0 14px 0' : '8px 0 16px 0',
            }}
          >
            <S.Subtitle
              color="#9da1a8"
              fontSize={matchesMobile ? '16px' : '18px'}
              fontWeight={400}
              style={{ margin: '0', whiteSpace: 'pre-wrap' }}
            >
              {matchesMobile
                ? `In support of the The Dinwiddie Family Foundation with 4 lucky NFT owners able to redeem their NFTs for a signed physical pair of Spencer's original K8IROS shoes`
                : `In support of the The Dinwiddie Family Foundation with 4 lucky NFT \nowners able to redeem their NFTs for a signed physical pair of Spencer's \noriginal K8IROS shoes`}
            </S.Subtitle>
          </div>
          <S.Subtitle color="#ddf874" fontSize="16px" fontWeight={600}>
            Auction ended. Congrats to the winner{' '}
            {matchesMobile ? <br /> : '- '}
            <span
              style={{ margin: 0 }}
              onClick={() => history.push('/product/60f9981d66f64e3a01c860e7')}
            >
              @nerooweb
            </span>
          </S.Subtitle>

          {!matchesMobile ? (
            <div
              style={{
                display: 'flex',
                width: '100%',
                paddingTop: '32px',
              }}
            >
              {!isAuthenticated && (
                <S.Button width="179px" onClick={handleSignUp}>
                  Sign Up Now
                </S.Button>
              )}
              <S.DropButtonContainer
                paddingLeft={isAuthenticated ? '0' : '32px'}
                paddingTop="0"
                onClick={() => history.push('/collection/SDinwiddie25')}
              >
                <S.DropButton>{"Go to Spencer's Drops "}</S.DropButton>
                <S.DropArrow />
              </S.DropButtonContainer>
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '24px',
              }}
            >
              {!isAuthenticated && (
                <S.Button width="100%" onClick={handleSignUp}>
                  Sign Up Now
                </S.Button>
              )}
              <S.DropButtonContainer
                paddingLeft="0"
                paddingTop="30px"
                onClick={() => history.push('/collection/SDinwiddie25')}
              >
                <S.DropButton>{"Go to Spencer's Drops "}</S.DropButton>
                <S.DropArrow />
              </S.DropButtonContainer>
            </div>
          )}
        </S.SubContainer>
        <S.SubContainer
          order={matchesMobile ? 0 : 1}
          padding={matchesMobile ? '0' : '0 0 0 94px'}
        >
          <S.ImgContainer>
            <video
              ref={vidRef}
              style={{
                width: matchesMobile ? '265px' : '380px',
                height: matchesMobile ? '265px' : '380px',
              }}
              autoPlay={true}
              preload="metadata"
              loop={true}
              muted={true}
              controls={false}
              src="https://infinite-digital-prod.s3.amazonaws.com/spencer/profile/K8IROS+Turntable+mashup.mp4"
              poster={HeroLoadingImg}
            />
            <S.DropImg src={DropImg} alt="" />
          </S.ImgContainer>
        </S.SubContainer>
      </S.Container>
    </div>
  );
};

export default Hero;
