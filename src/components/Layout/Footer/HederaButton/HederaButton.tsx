import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as hederaIcon } from 'assets/svg/logos/hedera.svg';
import IconButton from 'components/Buttons/IconButton';
import { useState } from 'react';
import * as S from './styles';

const HederaIcon = () => <SvgIcon viewBox="0 0 15 16" component={hederaIcon} />;

const HederaButton = () => {
  const [showLink, setShowLink] = useState<boolean>(false);
  return (
    <S.ShowLinkDiv>
      {showLink && (
        <div style={{ width: '363px', position: 'absolute' }}>
          <S.StyledToolTip />
          <S.ToolTipText>
            INFINITE NFTs are minted on the Hedera Hashgraph
          </S.ToolTipText>
        </div>
      )}
      <IconButton
        onMouseEnter={() => setShowLink(true)}
        onMouseLeave={() => setShowLink(false)}
        icon={HederaIcon}
        color="grey"
        radius={20}
        onClick={() =>
          window.open(
            'https://support.suku.world/infinite/hedera-hashgraph-hts',
            '_blank'
          )
        }
      />
    </S.ShowLinkDiv>
  );
};
export default HederaButton;
