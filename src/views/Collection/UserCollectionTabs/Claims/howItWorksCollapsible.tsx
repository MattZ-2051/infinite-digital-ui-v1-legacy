import Collapsible from 'components/Collpasible';
import * as S from './styles';

interface IProps {
  themeStyle: 'dark' | 'light';
  open?: boolean;
}
export const HowItWorksCollapsible = ({ themeStyle, open }: IProps) => {
  const collapsibleBody = (
    <div>
      <S.Text>
        In order to claim digital NFTs of INFINITE tagged products you must
      </S.Text>
      <div>
        <ul>
          <S.Li>
            Own an INFINITE tagged physical product that offers a digital NFT
            claim.
          </S.Li>
          <S.Li>
            Have your{' '}
            <S.Link themeStyle={themeStyle} href="https://getinfinite.io">
              INFINITE iOS app
            </S.Link>{' '}
            account linked to the same email as your marketplace account.
          </S.Li>
          <S.Li>Have not yet claimed a digital NFT for the product.</S.Li>
        </ul>
        <S.Text>
          Learn more about the process{' '}
          <S.Link
            themeStyle={themeStyle}
            onClick={() => {
              window.open(
                'https://support.suku.world/infinite/claiming-a-product',
                '_blank'
              );
            }}
          >
            here
          </S.Link>
          .
        </S.Text>
      </div>
    </div>
  );
  return (
    <Collapsible
      title="How it works?"
      body={collapsibleBody}
      breakPointSize="xs"
      borderTitle={true}
      themeStyle={themeStyle}
      open={open}
    />
  );
};
