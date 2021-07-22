import * as S from '../styles';

interface Props {
  matchesMobile: boolean;
  isRedeemable: boolean;
}

export const RedeemMessage = ({ matchesMobile, isRedeemable }: Props) => {
  return (
    <>
      {!matchesMobile && <S.Slash>/</S.Slash>}
      {isRedeemable ? (
        <S.FlexDiv padding={matchesMobile ? '0' : '0 0 0 16px'}>
          <S.RedeemIcon />
          <S.Redeemed color="white">Redeemable</S.Redeemed>
        </S.FlexDiv>
      ) : (
        <S.FlexDiv padding={matchesMobile ? '0' : '0 0 0 16px'}>
          <S.IsRedeemedIcon />
          <S.Redeemed color="#7c7c7c">Redeemed</S.Redeemed>
        </S.FlexDiv>
      )}
    </>
  );
};
