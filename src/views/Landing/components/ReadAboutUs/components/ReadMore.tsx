import { IReadMore } from './IReadMore';
import * as S from './styles';

export const ReadMore = ({ title, text, link, white }: IReadMore) => {
  const handleClick = () => {
    window.open(link, '_blank');
  };
  return (
    <S.Container isWhite={white}>
      <S.Title>{title}</S.Title>
      <S.Row isWhite={white}>
        <S.Text>{text}</S.Text>
        <S.Button onClick={handleClick}>
          <S.ReadMore>Read more</S.ReadMore>
          <S.Icon> {'>'}</S.Icon>
        </S.Button>
      </S.Row>
    </S.Container>
  );
};
