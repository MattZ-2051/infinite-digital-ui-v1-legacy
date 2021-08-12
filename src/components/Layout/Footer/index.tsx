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
                window.open(
                  'https://support.suku.world/infinite-powered-by-suku'
                );
              }}
            >
              FAQ
            </TextButton>
            <TextButton
              onClick={() => window.open('https://www.suku.world/')}
              color={getColor()}
              size="small"
              matchesMobile={matchesMobile}
            >
              Suku
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

          <Divider gap={16} tag="nav" styles={{ order: isSmall ? '-1' : '2' }}>
            <Hidden smDown>
              <S.CopyRightDiv
                color={footerBackgroundTheme === 'green' ? 'black' : '#7c7c7c'}
                style={{
                  opacity: getOpacity(),
                }}
              >
                © 2021 Infinite Assets, Inc.
              </S.CopyRightDiv>
            </Hidden>
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
                    fontWeight: 600,
                  }}
                >
                  Hedera Hashgraph
                </div>
              </S.HederaText>
            </div>
          </Hidden>
          <Hidden mdUp>
            <S.CopyRightDiv
              color={footerBackgroundTheme === 'green' ? 'black' : '#7c7c7c'}
              style={{
                marginBottom: '24px',
                textAlign: 'center',
                opacity: getOpacity(),
              }}
            >
              INFINITE© 2021 All rights reserved.
            </S.CopyRightDiv>
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
