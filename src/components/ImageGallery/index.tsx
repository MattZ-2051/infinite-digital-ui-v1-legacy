import React, { useState } from 'react';
import styled from 'styled-components/macro';
// Local
// import productBig from 'assets/img/marketplace/sku-example.png';
// import productSmall1 from 'assets/img/marketplace/sku-example-small-1.png';
// import productSmall2 from 'assets/img/marketplace/sku-example-small-2.png';
// import productSmall3 from 'assets/img/marketplace/sku-example-small-3.png';
// import productSmall4 from 'assets/img/marketplace/sku-example-small-4.png';

const images = [
  'https://stockx-360.imgix.net/Air-Jordan-11-Retro-Space-Jam-2016/Images/Air-Jordan-11-Retro-Space-Jam-2016/Lv2/img36.jpg?auto=format,compress&w=559&q=90&dpr=2&updated_at=1606319512',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYtaeIUQiLip8ROnlVfvLIpgT3jY6i6UMwDg&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHArgo7FDBh1wOujs9RNt5WKbmlJQt3TAL1g&usqp=CAU',
];

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageChange = (imageNumber: number) => {
    setSelectedImage(imageNumber);
  };

  return (
    <Container>
      <ImageContainer>
        <img src={images[selectedImage]} alt="" />
      </ImageContainer>

      <ThumbnailMenu>
        <ThumbnailItem
          active={selectedImage === 0}
          onClick={() => {
            handleImageChange(0);
          }}
        >
          <img src={images[0]} alt="" />
        </ThumbnailItem>
        <ThumbnailItem
          active={selectedImage === 1}
          onClick={() => {
            handleImageChange(1);
          }}
        >
          <img src={images[1]} alt="" />
        </ThumbnailItem>
        <ThumbnailItem
          active={selectedImage === 2}
          onClick={() => {
            handleImageChange(2);
          }}
        >
          <img src={images[2]} alt="" />
        </ThumbnailItem>
      </ThumbnailMenu>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f4f4f4;
  height: 100%;
  width: 100%;
  max-width: 700px;
  max-height: 700px;

  img {
    width: 100%;
    user-select: none;
  }
`;

const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ThumbnailMenu = styled.div`
  position: absolute;
  display: inline-grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 8px;
  left: 20px;
  bottom: 20px;
`;

interface ThumbnailItemProps {
  active?: boolean;
}

const ThumbnailItem = styled.div<ThumbnailItemProps>`
  transition: 0.4s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85px;
  height: 85px;
  border: 1px solid;
  border-color: ${(props) => (props.active ? 'black' : '#d2d2d2')};
  background-color: #f4f4f4;
  cursor: pointer;

  &:hover {
    border-color: black;
  }
`;

export default ImageGallery;
