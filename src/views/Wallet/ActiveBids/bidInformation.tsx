import * as S from './styles';

const BidInformation = ({ activeColor, currentActiveBid }) => {
  return (
    <S.ContainerRow>
      <S.TranscriptionContainer style={{ justifyContent: 'flex-start' }}>
        <S.TransactionDescription
          style={{
            color: activeColor.grey,
          }}
        >
          You bid{' '}
          {currentActiveBid.bidType === 'exceeded'
            ? `$${currentActiveBid?.bidAmt}`
            : ''}
        </S.TransactionDescription>
        <S.ArrowIcon style={{ fontSize: '12px', margin: '0 5px' }} />

        {currentActiveBid.bidType === 'exceeded' && (
          <>
            <S.TransactionDescription style={{ color: activeColor.red }}>
              Bid exceeded
            </S.TransactionDescription>
            <S.ArrowIcon
              style={{
                fontSize: '12px',
                margin: '0 5px',
                color: activeColor.red,
              }}
            />
          </>
        )}
        <span
          style={{
            fontSize: '16px',
            fontWeight: 400,
            color: `${
              currentActiveBid.bidType === 'not-exceeded'
                ? activeColor.black
                : activeColor.red
            }`,
          }}
        >
          ${currentActiveBid?.highestAmt?.toFixed(2)}
        </span>
      </S.TranscriptionContainer>
      <S.TransactionDescription style={{ justifyContent: 'flex-start' }}>
        Expires in {currentActiveBid?.expiresIn}
      </S.TransactionDescription>
    </S.ContainerRow>
  );
};

export default BidInformation;
