import React, { useState } from 'react';
import styled from 'styled-components/macro';

export interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
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
        {images &&
          images.map((el, index) => {
            <ThumbnailItem
              active={selectedImage === 0}
              onClick={() => handleImageChange(0)}
            />;
          })}
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
  overflow: hidden;

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
