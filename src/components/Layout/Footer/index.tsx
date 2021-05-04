import React from 'react';
import styled from 'styled-components/macro';
// Local
import IconButton from 'components/Buttons/IconButton';
import TextButton from 'components/Buttons/TextButton';
import Divider from 'components/Divider';
import Hidden from '@material-ui/core/Hidden';
// Icons
import SvgIcon from '@material-ui/core/SvgIcon';
import TwitterIcon from '@material-ui/icons/Twitter';
import RedditIcon from '@material-ui/icons/Reddit';
import { ReactComponent as tictocIcon } from 'assets/svg/logos/tictoc.svg';
import { ReactComponent as instagramIcon } from 'assets/svg/logos/instagram.svg';
import { ReactComponent as discordIcon } from 'assets/svg/logos/discord.svg';

const TicTocIcon = () => (
  <SvgIcon viewBox="0 -1 14 19" component={tictocIcon} />
);
const InstagramIcon = () => (
  <SvgIcon viewBox="0 0 15 16" component={instagramIcon} />
);
const DiscordIcon = () => (
  <SvgIcon viewBox="0 0 15 16" component={discordIcon} />
);

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <FooterTop>
          <Divider gap={24} tag="nav">
            {/* <TextButton to="/" color="grey" size="small">
              FAQ
            </TextButton> */}

            <TextButton
              to="https://sukulab.github.io/infinite-kb/#/"
              color="grey"
              size="small"
            >
              Help
            </TextButton>

            {/* <TextButton to="/" color="grey" size="small">
              Thanks
            </TextButton>

            <TextButton to="/" color="white" size="small">
              +
            </TextButton> */}
          </Divider>
        </FooterTop>

        <FooterBottom>
          <Divider gap={24} tag="nav">
            <TextButton to="/privacy" color="grey" size="small">
              Privacy Policy
            </TextButton>

            <TextButton to="/tc" color="grey" size="small">
              Terms & Conditions
            </TextButton>
          </Divider>

          <Hidden smDown>
            <div style={{ color: 'var(--grey-40)' }}>
              INFINITE© 2021 All rights reserved.
            </div>
          </Hidden>

          <Divider gap={16} tag="nav">
            <IconButton
              icon={TwitterIcon}
              color="white"
              radius={8}
              onClick={() =>
                window.open('https://twitter.com/get_infinite', '_blank')
              }
            />
            <IconButton
              icon={InstagramIcon}
              color="white"
              radius={8}
              onClick={() =>
                window.open('https://www.instagram.com/get_infinite/', '_blank')
              }
            />
            <IconButton
              icon={TicTocIcon}
              color="white"
              radius={8}
              onClick={() =>
                window.open(
                  'https://www.tiktok.com/@get_infinite?lang=en',
                  '_blank'
                )
              }
            />
            <IconButton
              icon={RedditIcon}
              color="white"
              radius={8}
              onClick={() =>
                window.open('https://www.reddit.com/r/SUKUecosystem/', '_blank')
              }
            />
            <IconButton icon={DiscordIcon} color="white" radius={8} />
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
  width: 100%;
  background-color: black;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: auto;
  padding: 20px 50px 20px 50px;
  font-size: 12px;
  color: white;

  @media screen and (max-width: 960px) {
    padding: 20px 32px 20px 32px;
  }
`;

const FooterTop = styled.div`
  padding: 8px 0 8px 0;

  @media screen and (max-width: 960px) {
    text-align: center;
  }
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
