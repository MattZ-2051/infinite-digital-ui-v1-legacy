import * as S from './styles';

const Maintenance = () => {
  return (
    <div style={{ height: '100vh' }}>
      <S.Container>
        <div>
          <S.Title>
            {"We're re down for maintenance and will be right back!"}
          </S.Title>
          <S.SubTitle>
            The Hedera Hashgraph network is being updated, please check{' '}
            <a href={'https://status.hedera.com/'}>hedera</a> for the latest
            status.
          </S.SubTitle>
        </div>
      </S.Container>
    </div>
  );
};

export default Maintenance;
