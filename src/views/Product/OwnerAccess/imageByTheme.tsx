import React from 'react';
import alreadyDownloadWhite from 'assets/svg/icons/download-background-white.svg';
import alreadyDownloadBlack from 'assets/svg/icons/download-background-black.svg';
import downloadIconWhite from 'assets/svg/icons/download-icon-white.svg';
import downloadIconBlack from 'assets/svg/icons/download-icon-black.svg';
import loadingGif from 'assets/gif/loading.gif';
import loadingGif2 from 'assets/gif/loading2.gif';

interface IProps {
  download: boolean;
  presignedUrl: string;
  handleDownload: () => any;
  themeStyle: 'light' | 'dark';
}

const ImageByTheme = ({
  download,
  presignedUrl,
  handleDownload,
  themeStyle,
}: IProps) => {
  return (
    <>
      {!download ? (
        themeStyle === 'light' ? (
          <img
            src={presignedUrl ? alreadyDownloadBlack : downloadIconBlack}
            alt="download-icon-black"
            onClick={handleDownload}
          />
        ) : (
          <img
            src={presignedUrl ? alreadyDownloadWhite : downloadIconWhite}
            alt="download-icon-white"
            onClick={handleDownload}
          />
        )
      ) : (
        <img
          src={themeStyle === 'light' ? loadingGif2 : loadingGif}
          alt="loading-download-icon"
          width="20"
        />
      )}
    </>
  );
};

export default ImageByTheme;
