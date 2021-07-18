import * as S from './styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ReactComponent as ShoeImg } from 'assets/svg/logos/dinwiddie-shoe.svg';
import DropImg from 'assets/svg/logos/dinwiddie-drop-img.png';
import { useHistory } from 'react-router';
interface IProps {
  login: (options?: { screen_hint: string }) => void;
  isAuthenticated: boolean;
}

const Hero = ({ login, isAuthenticated }: IProps): JSX.Element => {
  const matchesMobile = useMediaQuery('(max-width:1140px)', { noSsr: true });
  const history = useHistory();
  const handleClick = () => {
    login({ screen_hint: 'signup' });
  };
  return (
    <div style={{ backgroundColor: 'black' }}>
      <S.Container>
        <S.SubContainer order={matchesMobile ? 1 : 0}>
          <S.Title>
            Spencer Dinwiddie’s <br /> <span>1st NFT Release!</span>
          </S.Title>

          <S.Subtitle color="white" fontSize="18px" fontWeight={600}>
            {"Redeemable 3D/AR NFTs from Spencer's K8IROS sneaker line"}
          </S.Subtitle>
          <S.Subtitle
            color="#9da1a8"
            fontSize="18px"
            fontWeight={600}
            style={{ margin: '0' }}
          >
            {
              'In support of the The Dinwiddie Family Foundation with 4 lucky NFT'
            }
          </S.Subtitle>
          <S.Subtitle
            color="#9da1a8"
            fontSize="18px"
            fontWeight={600}
            style={{ margin: '0' }}
          >
            {
              "owners able to redeem their NFTs for a signed physical pair of Spencer's"
            }
          </S.Subtitle>
          <S.Subtitle color="#9da1a8" fontSize="18px" fontWeight={600}>
            {'original K8IROS shoes'}
          </S.Subtitle>

          <S.Subtitle color="#ddf874" fontSize="16px" fontWeight={600}>
            Launching Thursday, July 22st, 12:00 PM (ET)
          </S.Subtitle>

          <div style={{ display: 'flex', width: '100%' }}>
            {!isAuthenticated && (
              <S.Button onClick={handleClick}>Sign Up Now</S.Button>
            )}
            <S.DropButtonContainer
              paddingLeft={isAuthenticated ? '0' : '32px'}
              onClick={() =>
                history.push('/marketplace/60ee02eb2411640e7bad6c50')
              }
            >
              <S.DropButton>Go to K8IROS Drops </S.DropButton>
              <S.DropArrow />
            </S.DropButtonContainer>
          </div>
        </S.SubContainer>
        <S.SubContainer order={matchesMobile ? 0 : 1}>
          <S.ImgContainer>
            <ShoeImg
              style={
                matchesMobile
                  ? { width: '265px', height: 'auto' }
                  : { width: '380px', height: 'auto' }
              }
            />
            <S.DropImg src={DropImg} alt="" />
          </S.ImgContainer>
        </S.SubContainer>
      </S.Container>
    </div>
  );
};

export default Hero;
