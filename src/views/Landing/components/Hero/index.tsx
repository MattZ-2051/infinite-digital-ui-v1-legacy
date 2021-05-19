import Button from 'components/Buttons/Button';
import * as S from './styles';
import HeroImg from 'assets/img/backgrounds/hero-bg.png';
//import { useHistory } from 'react-router-dom';

interface IProps {
  login: (options?: { screen_hint: string }) => void;
  isAuthenticated: boolean;
}

const Hero = ({ login, isAuthenticated }: IProps): JSX.Element => {
  //const history = useHistory();

  const handleClick = () => {
    // if (isAuthenticated) {
    //   history.push('/marketplace?page=1&per_page=6&sortBy=startDate:asc');
    // } else {
    //   login({ screen_hint: 'signup' });
    // }
    login({ screen_hint: 'signup' });
  };
  return (
    <S.Container>
      <S.Img src={HeroImg} />

      <S.Title>
        Start your INFINITE <br /> <span>Collection today!</span>
      </S.Title>

      <S.Subtitle>
        Our team at Suku has partnered with industry leaders to bring you <br />{' '}
        exclusive NFTs on the INFINITE beta platform.
      </S.Subtitle>

      {!isAuthenticated && (
        <Button
          color="white"
          onClick={handleClick}
          data-testid="start-collection-btn"
        >
          Sign Up Now
        </Button>
      )}
    </S.Container>
  );
};

export default Hero;
