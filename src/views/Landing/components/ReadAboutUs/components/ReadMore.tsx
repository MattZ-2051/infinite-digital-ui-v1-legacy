import { IReadMore } from './IReadMore';
import * as S from './styles';

export const ReadMore = ({ title, text, link }: IReadMore) => {
  const handleClick = () => {
    window.open(link, '_blank');
  };
  return (
    <S.Container onClick={handleClick}>
      <S.Title>{title}</S.Title>
      <S.Row>
        <S.Text>{text}</S.Text>
        <S.Button>
          <S.ReadMore>Read more</S.ReadMore>
          <S.Icon>
            <S.Arrow />
          </S.Icon>
        </S.Button>
      </S.Row>
    </S.Container>
  );
};
