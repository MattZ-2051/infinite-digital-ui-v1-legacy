import * as S from './styles';
import Collapsible from '../../components/Collapsible';

export interface IProps {
  description: string;
}

const SkuDescription = ({ description }: IProps): JSX.Element => {
  const createMarkup = (markup) => ({
    __html: markup,
  });
  const body = (
    <S.Description
      dangerouslySetInnerHTML={createMarkup(description) || ''}
    ></S.Description>
  );

  return (
    <S.Container>
      <Collapsible title="Description" body={body} />
    </S.Container>
  );
};

export default SkuDescription;
