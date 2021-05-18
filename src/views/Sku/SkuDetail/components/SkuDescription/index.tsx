import * as S from './styles';
import Collapsible from '../../components/Collapsible';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as hederaIcon } from 'assets/svg/logos/hedera.svg';

export interface IProps {
  description: string;
}

const HederaIcon = () => (
  <SvgIcon viewBox="-7 -7 30 30" component={hederaIcon} />
);

const SkuDescription = ({ description }: IProps): JSX.Element => {
  const createMarkup = (markup) => ({
    __html: markup,
  });
  const body = (
    <>
      <S.Description
        dangerouslySetInnerHTML={createMarkup(description) || ''}
      />
      <S.Hedera>
        <S.IconContainer>
          <HederaIcon />
        </S.IconContainer>
        <span>INFINITE NFTs are minted on the Hedera Hashgraph</span>
        <a
          href=" https://support.suku.world/infinite/hedera-hashgraph-hts"
          target="_blank"
        >
          Learn more
        </a>
      </S.Hedera>
    </>
  );

  return (
    <S.Container>
      <Collapsible title="Description" body={body} />
    </S.Container>
  );
};

export default SkuDescription;
