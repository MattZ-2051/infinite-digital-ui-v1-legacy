import React, { useState } from 'react';
// Styles
import * as S from './styles';

// Local
import IconButton from 'components/Buttons/IconButton';
import TextButton from 'components/Buttons/TextButton';
import Divider from 'components/Divider';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

//Social media buttons
import {
  SocialMediaButton,
  Social,
} from './SocialMediaButtons/SocialMediaButton';

// Hedera button
import HederaButton from './HederaButton/HederaButton';
import { CompassCalibrationOutlined } from '@material-ui/icons';

const Footer = ({ footerBackgroundTheme }) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesMobile = useMediaQuery('(max-width:600px)', { noSsr: true });
  const getOpacity = () => {
    if (footerBackgroundTheme === 'green') {
      return 0.48;
    } else {
      return 1;
    }
  };
  const getColor = () => {
    if (footerBackgroundTheme === 'green') {
      return 'lightgrey';
    } else {
      return 'grey';
    }
  };

  const getBackgroundColor = () => {
    if (footerBackgroundTheme === 'green') {
      return '#ddf874';
    } else {
      return 'black';
    }
  };
  return (
    <S.StyledFooter
      padding={isSmall ? '0' : '0 80px'}
      backgroundColor={getBackgroundColor()}
    >
      <S.FooterContent>
        <S.FooterBottom>
          <ScreenSelector matchesMobile={matchesMobile}>
            <TextButton
              color={getColor()}
              size="small"
              matchesMobile={matchesMobile}
              onClick={() => {
                location.replace(
                  'https://support.suku.world/infinite-powered-by-suku'
                );
              }}
            >
              FAQ
            </TextButton>
            <TextButton
              to="/help"
              color={getColor()}
              size="small"
              matchesMobile={matchesMobile}
            >
              Help
            </TextButton>

            <TextButton
              to="/privacy"
              color={getColor()}
              size="small"
              matchesMobile={matchesMobile}
            >
              Privacy Policy
            </TextButton>

            <TextButton
              to="/terms"
              color={getColor()}
              size="small"
              matchesMobile={matchesMobile}
            >
              Terms & Conditions
            </TextButton>
            <Hidden smDown>
              <HederaButton color={getColor()} />
            </Hidden>
          </ScreenSelector>

          <Hidden smDown>
            <div
              style={{
                color: footerBackgroundTheme === 'green' ? 'black' : '#7c7c7c',
                fontSize: '14px',
                flex: 1,
                opacity: getOpacity(),
              }}
            >
              © 2021 Infinite Assets, Inc.
            </div>
          </Hidden>

          <Divider gap={16} tag="nav" styles={{ order: isSmall ? '-1' : '2' }}>
            <SocialMediaButton
              socialNetwork={Social.Facebook}
              footerTheme={footerBackgroundTheme}
            />
            <SocialMediaButton
              socialNetwork={Social.Twitter}
              footerTheme={footerBackgroundTheme}
            />
            <SocialMediaButton
              socialNetwork={Social.Instagram}
              footerTheme={footerBackgroundTheme}
            />
            <SocialMediaButton
              socialNetwork={Social.TicTok}
              footerTheme={footerBackgroundTheme}
            />
          </Divider>
          <Hidden mdUp>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <HederaButton color={getColor()} />
              <S.HederaText footerTheme={footerBackgroundTheme}>
                <div
                  style={{
                    marginLeft: '10px',
                  }}
                >
                  Hedera Hashgraph
                </div>
              </S.HederaText>
            </div>
          </Hidden>
          <Hidden mdUp>
            <div
              style={{
                marginBottom: '24px',
                color:
                  footerBackgroundTheme === 'green'
                    ? 'black'
                    : 'var(--grey-40)',
                textAlign: 'center',
                opacity: getOpacity(),
              }}
            >
              INFINITE© 2021 All rights reserved.
            </div>
          </Hidden>
        </S.FooterBottom>
      </S.FooterContent>
    </S.StyledFooter>
  );
};

export default Footer;

const ScreenSelector = ({ children, matchesMobile }) => {
  if (!matchesMobile)
    return (
      <Divider gap={24} tag="nav" styles={{ flex: 1 }}>
        {children}
      </Divider>
    );
  return (
    <S.TextButtonContainer matchesMobile={matchesMobile}>
      {children}
    </S.TextButtonContainer>
  );
};
