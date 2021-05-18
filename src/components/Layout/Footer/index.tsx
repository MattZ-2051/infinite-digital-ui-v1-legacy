import React from 'react';
import styled from 'styled-components/macro';
// Local
import IconButton from 'components/Buttons/IconButton';
import TextButton from 'components/Buttons/TextButton';
import Divider from 'components/Divider';
import Hidden from '@material-ui/core/Hidden';
// Icons
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as tictocIcon } from 'assets/svg/logos/tiktok.svg';
import { ReactComponent as instagramIcon } from 'assets/svg/logos/instagram.svg';
import { ReactComponent as twitterIcon } from 'assets/svg/logos/twitter.svg';
import { ReactComponent as facebookIcon } from 'assets/svg/logos/facebook.svg';

const TicTocIcon = () => (
  <SvgIcon viewBox="0 -1 14 19" component={tictocIcon} />
);
const InstagramIcon = () => (
  <SvgIcon viewBox="0 0 15 16" component={instagramIcon} />
);
const TwitterIcon = () => (
  <SvgIcon viewBox="0 0 15 16" component={twitterIcon} />
);
const FacebookIcon = () => (
  <SvgIcon viewBox="0 0 15 16" component={facebookIcon} />
);

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <FooterBottom>
          <Divider gap={24} tag="nav">
            <TextButton to="/help" color="grey" size="small">
              Help
            </TextButton>

            <TextButton to="/privacy" color="grey" size="small">
              Privacy Policy
            </TextButton>

            <TextButton to="/tc" color="grey" size="small">
              Terms & Conditions
            </TextButton>
          </Divider>

          <Hidden smDown>
            <div style={{ color: 'var(--grey-40)' }}>
              © 2021 Infinite Assets, Inc.
            </div>
          </Hidden>

          <Divider gap={16} tag="nav">
            <IconButton
              icon={FacebookIcon}
              color="grey"
              radius={8}
              onClick={() =>
                window.open('https://www.facebook.com/infinitebysuku', '_blank')
              }
            />
            <IconButton
              icon={TwitterIcon}
              color="grey"
              radius={8}
              onClick={() =>
                window.open('https://twitter.com/infinitebysuku', '_blank')
              }
            />
            <IconButton
              icon={InstagramIcon}
              color="white"
              radius={8}
              onClick={() =>
                window.open(
                  'https://www.instagram.com/infinitebysuku/',
                  '_blank'
                )
              }
            />
            <IconButton
              icon={TicTocIcon}
              color="grey"
              radius={8}
              onClick={() =>
                window.open('https://www.tiktok.com/@_goinfinite', '_blank')
              }
            />
          </Divider>

          <Hidden mdUp>
            <div style={{ color: 'var(--grey-40)' }}>
              INFINITE© 2021 All rights reserved.
            </div>
          </Hidden>
        </FooterBottom>
      </FooterContent>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  position: relative;
  bottom: 0;
  width: 100%;
  background-color: black;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 17px 80px;
  font-size: 12px;
  color: white;
`;

const FooterBottom = styled.div`
  padding: 8px 0 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 960px) {
    display: grid;
    justify-content: center;
    grid-gap: 20px;
  }
`;

export default Footer;
