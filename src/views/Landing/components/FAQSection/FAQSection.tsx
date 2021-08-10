import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { CollapsibleOption } from './CollapsibleOption/collapsibleOption';
import * as S from './styles';
import { options } from './TextOptions/textOptions';
export const FAQSection = () => {
  const handleRedirection = () => {
    window.open('https://support.suku.world/infinite-powered-by-suku');
  };
  return (
    <S.MainContainer>
      <S.Container>
        <S.TitleContainer>
          <S.Title> Frequently Asked questions </S.Title>
        </S.TitleContainer>
        <S.CollapsibleContainer>
          {options.map((x, i) => (
            <CollapsibleOption key={i} title={x.title} text={x.text} />
          ))}
        </S.CollapsibleContainer>
        <S.Button onClick={handleRedirection}>
          <S.ButtonText>Read more FAQs</S.ButtonText>
        </S.Button>
      </S.Container>
    </S.MainContainer>
  );
};
