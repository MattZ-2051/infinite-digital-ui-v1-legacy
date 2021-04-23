import React, { useState } from 'react';
import styled from 'styled-components/macro';
// Local
import shoe1 from 'assets/img/temp/shoes/shoe-1.jpg';
import shoe2 from 'assets/img/temp/shoes/shoe-2.jpg';
import shoe3 from 'assets/img/temp/shoes/shoe-3.jpg';
import shoe4 from 'assets/img/temp/shoes/shoe-4.jpg';

const images = [
   shoe1,
   shoe2,
   shoe3,
   shoe4,
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
        <ThumbnailItem
          active={selectedImage === 3}
          onClick={() => {
            handleImageChange(3);
          }}
        >
          <img src={images[3]} alt="" />
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
