import styled from 'styled-components';
import CircularButton from 'components/Buttons/CircularButton';
import ProductPanel from 'components/ProductPanel';

const MyCollection = () => {
  return (
    <>
      <HeaderContainer>
        <Header>My Items</Header>
        <CircularButton to="my-collection" label="See More" />
      </HeaderContainer>
      <ProductContainer>
        <ProductDiv first={true} >
          <ProductPanel
            type='legendary'
            header="black"
            backgroundColor="white"
          />
        </ProductDiv>
      </ProductContainer>
    </>
  )
}

const ProductDiv = styled(({ first, ...rest }) => <div {...rest} />)`
  padding: ${(props) => (props.first ? '0 24px 0 0' : '0 24px')};
`;

const HeaderContainer = styled.div`
  @media screen and (max-width: 600px) {
    display: flex;
    align-items: center;
    margin: auto;
  }
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding-bottom: 28px;
`;

const Header = styled.h3`
  padding-top: 40px;
  font-size: 32px;
  line-height: 51.2px;
`;

const ProductContainer = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  height: 36em;

  @media screen and (max-width: 600px) {
    margin: auto;
    width: 320px;
  }

  ::-webkit-scrollbar {
    height: 0.4em;
  }
  ::-webkit-scrollbar-button {
    width: 0.1em;
  }
  ::-webkit-scrollbar-track-piece {
  }
  ::-webkit-scrollbar-thumb {
    background: var(--grey-40);
    width: 1px !important;
    border-radius: 10px;
  }
`;

export default MyCollection;
