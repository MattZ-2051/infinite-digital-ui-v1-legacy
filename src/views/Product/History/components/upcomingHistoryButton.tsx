import * as S from '../styles';
export const UpcomingHistoryButton = ({ setShowLink, showLink }) => {
  return (
    <S.ButtonContainer
      onMouseEnter={() => setShowLink(true)}
      onMouseLeave={() => setShowLink(false)}
    >
      {showLink && (
        <div>
          <S.ToolTip title="Testing">Testing</S.ToolTip>
          <S.ToolTipText>NFT Sale Upcoming</S.ToolTipText>
        </div>
      )}
      <S.Button hover={false} width="130px" height="40px" fontSize="16px">
        Upcoming
      </S.Button>
    </S.ButtonContainer>
  );
};
