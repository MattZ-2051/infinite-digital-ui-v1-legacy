import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { ReactComponent as TDRotationIcon } from 'assets/svg/icons/3drotation.svg';
import { ReactComponent as TDGraphicIcon } from 'assets/svg/icons/3d-graphic-icon.svg';
import Squircle from 'components/Squircle';

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
        {images[selectedImage]?.endsWith('mov') ||
        images[selectedImage]?.endsWith('mp4') ? (
          <video
            style={{
              width: '100%',
            }}
            autoPlay={true}
            controls={false}
            loop={true}
            muted={true}
            src={images[selectedImage]}
          ></video>
        ) : (
          <img src={images[selectedImage]} alt="" />
        )}

        <Squircle
          size={40}
          bgColor="white"
          style={{
            position: 'absolute',
            right: '24px',
            top: '24px',
            cursor: 'pointer',
          }} //TODO: create StyledComponent
        >
          <TDRotationIcon />
        </Squircle>
      </ImageContainer>

      <ThumbnailMenu>
        {images &&
          images.map((el, index) => {
            return (
              <Thumbnail
                key={index}
                active={selectedImage === index}
                onClick={() => handleImageChange(index)}
              >
                <STDGraphicIcon />
                {el?.endsWith('mov') || el?.endsWith('mp4') ? (
                  <video
                    style={{
                      width: '100%',
                    }}
                    autoPlay={true}
                    controls={false}
                    loop={true}
                    muted={true}
                    src={el}
                  ></video>
                ) : (
                  <img src={el} alt="" />
                )}
              </Thumbnail>
            );
          })}
      </ThumbnailMenu>
    </Container>
  );
};

const STDGraphicIcon = styled(TDGraphicIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 222;
  padding: 3px;
  width: 23px;
  height: 23px;
  background-color: #ffffff;
`;

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

const Thumbnail = styled.div<ThumbnailItemProps>`
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
