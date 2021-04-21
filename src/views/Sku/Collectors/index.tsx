import styled from 'styled-components/macro';

export interface IProps {}
const S: any = {};

const Collectors: React.FC<IProps> = () => {
  return (
    <S.Container>
      <S.Gallery>
        Galeria
      </S.Gallery>

      <S.Content>
        Marketplace / XXX / XXX
      </S.Content>

    </S.Container>
  );
};

S.Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

S.Gallery = styled.div`
  max-width: 488px;

`;

S.Content = styled.div`
  padding: 48px;
`;

export default Collectors;