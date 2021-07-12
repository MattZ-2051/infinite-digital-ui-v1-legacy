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

const Footer = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <S.StyledFooter>
      <S.FooterContent>
        <S.FooterBottom>
          <Divider gap={24} tag="nav" styles={{ flex: 1 }}>
            <TextButton to="/help" color="grey" size="small">
              Help
            </TextButton>

            <TextButton to="/privacy" color="grey" size="small">
              Privacy Policy
            </TextButton>

            <TextButton to="/terms" color="grey" size="small">
              Terms & Conditions
            </TextButton>
            <Hidden smDown>
              <HederaButton />
            </Hidden>
          </Divider>

          <Hidden smDown>
            <div style={{ color: '#7c7c7c', fontSize: '14px', flex: 1 }}>
              © 2021 Infinite Assets, Inc.
            </div>
          </Hidden>

          <Divider gap={16} tag="nav" styles={{ order: isSmall ? '-1' : '2' }}>
            <SocialMediaButton socialNetwork={Social.Facebook} />
            <SocialMediaButton socialNetwork={Social.Twitter} />
            <SocialMediaButton socialNetwork={Social.Instagram} />
            <SocialMediaButton socialNetwork={Social.TicTok} />
          </Divider>
          <Hidden mdUp>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <HederaButton />
              <S.HederaText>
                <div style={{ marginLeft: '10px' }}>Hedera Hashgraph</div>
              </S.HederaText>
            </div>
          </Hidden>
          <Hidden mdUp>
            <div style={{ color: 'var(--grey-40)', textAlign: 'center' }}>
              INFINITE© 2021 All rights reserved.
            </div>
          </Hidden>
        </S.FooterBottom>
      </S.FooterContent>
    </S.StyledFooter>
  );
};

export default Footer;
