import React from 'react';
import IconClaimedGray from 'assets/svg/icons/claimed-gray.svg';
import IconClaimedWhite from 'assets/svg/icons/claimed-white.svg';
import * as S from './styles';

interface IProps {
  claimed: boolean;
  handleClick: () => void;
}

const TileClaimPill = ({ claimed, handleClick }: IProps) => {
  return (
    <S.Container onClick={handleClick}>
      <S.Pill claimed={claimed}>
        <S.TextClaim claimed={claimed}>
          {claimed ? 'Claimed' : 'Claim'}
        </S.TextClaim>
        <img src={claimed ? IconClaimedGray : IconClaimedWhite} />
      </S.Pill>
    </S.Container>
  );
};

export default TileClaimPill;
