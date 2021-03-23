import styled from 'styled-components';
import ProductPanel from 'components/ProductPanel';
import dropBoxImg from 'assets/img/backgrounds/drop-box-image.jpg';
import { useAppSelector } from 'hooks/store';
import DropBoxPanel from 'components/ProductPanel/DropBoxPanel';
import CircularButton from 'components/Buttons/CircularButton';

const DropBoxes = () => {
  const { dropBoxes } = useAppSelector((state) => state.dropBoxes);

  return (
    <>
      <HeaderContainer>
        <Header>Latest Products</Header>
        <CircularButton to="drop-boxes" label="See More" />
      </HeaderContainer>
      <ProductContainer>
        {dropBoxes instanceof Array &&
          dropBoxes.map((el, index) => {
            if (index >= 16) return null;
            return (
              <ProductDiv first={index === 0 ? true : false} key={el._id}>
                <DropBoxPanel
                  imageSrc={el.config.imageUrl || dropBoxImg}
                  releaseDate={el.config.createdAt}
                  title={el.config.name}
                  series={el.config.series}
                  skuNum={el.config.id}
                  quantity={el.config.amount}
                  price={el.config.price}
                  type='dropBox'
                  backgroundColor="black"
                />
              </ProductDiv>
            );
          })}
      </ProductContainer>
    </>
  );
};

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

export default DropBoxes;
