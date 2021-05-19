import React, { useState } from 'react';
import styled from 'styled-components/macro';
import AudioIcon from 'assets/img/icons/audio-icon.png';
import { ReactComponent as TDRotationIcon } from 'assets/svg/icons/3drotation.svg';
import { ReactComponent as TDGraphicIcon } from 'assets/svg/icons/3d-graphic-icon.svg';
import Squircle from 'components/Squircle';

export interface ImageGalleryProps {
  images: string[];
  height?: string;
}

const VideoView = ({ src }: { src: string }) => {
  return (
    <video
      style={{
        width: '100%',
        height: '100%',
      }}
      autoPlay={true}
      controls={true}
      loop={true}
      muted={true}
      src={src}
    ></video>
  );
};

const AudioView = ({ src }: { src: string }) => {
  return (
    <audio controls autoPlay muted>
      <source src={src} type="audio/mpeg" />
      Your browser does not support audio elements.
    </audio>
  );
};

const ImageGallery = ({ images, height }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageChange = (imageNumber: number) => {
    setSelectedImage(imageNumber);
  };

  return (
    <Container height={height}>
      <ImageContainer>
        {images[selectedImage]?.endsWith('mov') ||
        images[selectedImage]?.endsWith('mp4') ? (
          <VideoView src={images[selectedImage]} />
        ) : images[selectedImage]?.endsWith('mp3') ? (
          <AudioView src={images[selectedImage]} />
        ) : (
          <img src={images[selectedImage]} alt="" />
        )}
        {/* <Squircle
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
        </Squircle> */}
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
                {/* <STDGraphicIcon /> */}
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
                ) : el?.endsWith('mp3') ? (
                  <img src={AudioIcon} alt="" />
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

// const STDGraphicIcon = styled(TDGraphicIcon)`
//   position: absolute;
//   top: 10px;
//   right: 10px;
//   z-index: 222;
//   padding: 3px;
//   width: 23px;
//   height: 23px;
//   background-color: #ffffff;
// `;

const Container = styled.div<{ height?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fffff;
  height: ${(props) => (props.height ? `${props.height};` : `100%`)};
  width: 100%;
  max-width: 700px;
  max-height: 700px;
  overflow: hidden;

  img {
    width: 100%;
    user-select: none;
  }

  @media screen and (max-width: 1160px) {
    max-width: 100%;
  }

  @media screen and (max-width: 640px) {
    overflow: auto;
    height: auto !important;
  }
`;

const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ThumbnailMenu = styled.div`
  position: absolute;
  display: inline-grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 8px;
  left: 30px;
  bottom: 30px;
`;

interface ThumbnailItemProps {
  active?: boolean;
}

const Thumbnail = styled.div<ThumbnailItemProps>`
  transition: 0.4s;
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85px;
  height: 85px;
  border: 1px solid;
  border-color: ${(props) => (props.active ? 'black' : '#d2d2d2')};
  background-color: #f4f4f4;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    border-color: black;
  }
`;

export default ImageGallery;