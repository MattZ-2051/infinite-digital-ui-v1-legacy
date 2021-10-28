import * as S from './styles';

const CollectSection = () => {
  return (
    <S.MainContainer>
      <S.BoxContainer>
        <S.BigCard>
          <S.CardTitle>Collect</S.CardTitle>
          <S.CardSubtitle>
            Avatars! Gaming! Videos! Music! NFTs like you’ve never seen.
          </S.CardSubtitle>
          <S.TextBlock>
            NFTs (Non-Fungible Tokens) are virtual items like images, 3D models,
            in-game assets, videos, and audio files which use blockchain
            technology to represent authentic, proven ownership. The
            InfiniteWorld megaverse is built on utility, where you’ll use your
            NFTs within the community to engage, play, and earn in the
            Megaverse.
          </S.TextBlock>
          <S.TextBlock>
            {' '}
            In InfiniteWorld, even real-world items may be connected to your
            NFTs, through our smart tag NFC technology.
          </S.TextBlock>
          <S.TextBlock style={{ opacity: '1' }}>
            Virtual and physical worlds combined.
          </S.TextBlock>
        </S.BigCard>
        <S.GroupedCards>
          <S.Card>
            <S.CardTitle>Engage</S.CardTitle>
            <S.TextBlock style={{ opacity: '1' }}>
              InfiniteWorld is a place to create and be social.
            </S.TextBlock>
            <S.TextBlock>
              Our members are rewarded for interacting with their NFTs and
              sharing their experiences. SHARE TO EARN. Read on to find out
              about ways you’ll be able to EARN in the Megaverse.
            </S.TextBlock>
          </S.Card>
          <S.Card>
            <S.CardTitle>Play</S.CardTitle>
            <S.TextBlock>
              Amazing blockchain gaming and activities are coming to the
              InfiniteWorld Megaverse. Get set for infinite ways to compete
              using your NFTs to earn cred, upgrades, and crypto!
            </S.TextBlock>
          </S.Card>
          <S.Card style={{ marginRight: 0 }}>
            <S.CardTitle>Earn</S.CardTitle>
            <S.TextBlock>
              InfiniteWorld citizens earn SUKU token (real-world crypto) as
              rewards for social sharing, playing games, and engaging in the
              Megaverse’s activities.
            </S.TextBlock>
          </S.Card>
        </S.GroupedCards>
      </S.BoxContainer>
    </S.MainContainer>
  );
};

export default CollectSection;
