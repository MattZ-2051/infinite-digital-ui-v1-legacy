import { useRef, useState, useEffect } from 'react';
import AudioIcon from 'assets/img/icons/audio-icon.png';
import { FileAsset } from 'entities/sku';
import InfiniteLogo from 'assets/img/logos/iso-black-512.jpeg';
import * as S from './styles';

export interface ImageGalleryProps {
  nftPublicAsset: FileAsset[];
  height?: string;
}

const VideoView = ({ src }: { src: string }) => {
  const vidRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    vidRef.current?.play();
    return () => {
      vidRef.current?.pause();
    };
  }, []);
  return (
    <video
      ref={vidRef}
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

const ImageView = ({ src }: { src: string }) => {
  return <img src={src} alt="" />;
};

const VectaryView = ({ src }: { src: string }) => {
  return (
    <iframe
      id={'3d-ar'}
      src={src}
      frameBorder="0"
      width="100%"
      height="480"
    ></iframe>
  );
};

const VectaryThumbnail = ({ src }: { src: string }) => {
  // extract id from url
  const id = src.match(/\w+-\w+-\w+-\w+-\w+/g);
  return (
    <img
      src={
        'https://www.vectary.com/viewer/data/' +
        id +
        '/gltf/' +
        id +
        '.viewerthumb.png'
      }
    />
  );
};

const MediaView = ({
  assets,
  assetIndex,
}: {
  assets: FileAsset[];
  assetIndex: number;
}) => {
  let source = '';
  if (assets) source = assets[assetIndex].previewUrl || assets[assetIndex].url;
  if (source.endsWith('mov') || source.endsWith('mp4'))
    return <VideoView src={source} />;

  if (
    source.endsWith('jpg') ||
    source.endsWith('jpeg') ||
    source.endsWith('png')
  )
    return <ImageView src={source} />;

  if (source.endsWith('mp3')) return <AudioView src={source} />;

  if (source.includes('vectary')) return <VectaryView src={source} />;

  return <ImageView src={InfiniteLogo} />;
};

const ImageGallery = ({ nftPublicAsset, height }: ImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageChange = (imageNumber: number) => {
    setSelectedImage(imageNumber);
  };
  const getImage = (asset: FileAsset) => {
    if (asset.previewUrl) return asset.previewUrl;
    if (asset.url) return asset.url;
    return InfiniteLogo;
  };

  const handleError = (e) => {
    e.target.src = InfiniteLogo;
  };

  const vidRefs = useRef<(HTMLVideoElement | null)[]>([]);
  useEffect(() => {
    for (const ref of vidRefs.current) ref?.play();
    return () => {
      for (const ref of vidRefs.current) ref?.pause();
    };
  }, []);

  return (
    <S.Container height={height}>
      <S.ImageContainer>
        <MediaView assets={nftPublicAsset} assetIndex={selectedImage} />
      </S.ImageContainer>
      <S.ThumbnailMenu>
        {nftPublicAsset &&
          nftPublicAsset.map((el: FileAsset, index) => {
            return (
              <S.Thumbnail
                key={index}
                active={selectedImage === index}
                onClick={() => handleImageChange(index)}
              >
                {/* <STDGraphicIcon /> */}
                {getImage(el).endsWith('mov') ||
                getImage(el).endsWith('mp4') ? (
                  <video
                    ref={(el) => vidRefs.current?.push(el)}
                    style={{
                      width: '100%',
                    }}
                    autoPlay={true}
                    controls={false}
                    loop={true}
                    muted={true}
                    src={getImage(el)}
                  ></video>
                ) : getImage(el).endsWith('mp3') ? (
                  <img src={AudioIcon} onError={handleError} />
                ) : getImage(el).includes('vectary') ? (
                  <VectaryThumbnail src={getImage(el)} />
                ) : (
                  <img src={getImage(el)} onError={handleError} />
                )}
              </S.Thumbnail>
            );
          })}
      </S.ThumbnailMenu>
    </S.Container>
  );
};

export default ImageGallery;
