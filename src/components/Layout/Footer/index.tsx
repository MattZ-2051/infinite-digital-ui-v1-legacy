import React, { useState } from 'react';
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
import { ReactComponent as hederaIcon } from 'assets/svg/logos/hedera.svg';
import { ReactComponent as ToolTip } from 'assets/svg/icons/tooltip-large.svg';

const S: any = {};

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
const HederaIcon = () => <SvgIcon viewBox="0 0 15 16" component={hederaIcon} />;

const Footer = () => {
  const [showLink, setShowLink] = useState<boolean>(false);

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

            <TextButton to="/terms" color="grey" size="small">
              Terms & Conditions
            </TextButton>
            <>
              <div
                style={{
                  position: 'relative',
                  width: '363px',
                }}
                onMouseEnter={() => setShowLink(true)}
                onMouseLeave={() => setShowLink(false)}
              >
                {showLink && (
                  <div>
                    <S.ToolTip></S.ToolTip>
                    <S.ToolTipText>
                      INFINITE NFTs are minted on the Hedera Hashgraph
                    </S.ToolTipText>
                  </div>
                )}
                <IconButton
                  icon={HederaIcon}
                  color="grey"
                  radius={20}
                  onClick={() =>
                    window.open(
                      'https://support.suku.world/infinite/hedera-hashgraph-hts',
                      '_blank'
                    )
                  }
                />
              </div>
            </>
          </Divider>

          <Hidden smDown>
            <div style={{ color: '#7c7c7c', fontSize: '14px' }}>
              © 2021 Infinite Assets, Inc.
            </div>
          </Hidden>

          <Divider gap={16} tag="nav">
            <IconButton
              icon={FacebookIcon}
              color="grey"
              radius={20}
              onClick={() =>
                window.open('https://www.facebook.com/infinitebysuku', '_blank')
              }
            />
            <IconButton
              icon={TwitterIcon}
              color="grey"
              radius={20}
              onClick={() =>
                window.open('https://twitter.com/infinitebysuku', '_blank')
              }
            />
            <IconButton
              icon={InstagramIcon}
              color="grey"
              radius={20}
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
              radius={20}
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

S.ToolTip = styled(ToolTip)`
  position: absolute;
  bottom: -15px;
  color: black;
  left: 16px;
  transform: translate(-50%, -50%);
  :hover {
    cursor: pointer;
  }
`;

S.ToolTipText = styled.span`
  position: absolute;
  bottom: 40px;
  left: 16px;
  color: black;
  overflow: hidden;
  font-size: 14px;
  transform: translate(-50%, -50%);
  a {
    font-weight: normal;
  }
`;

export default Footer;
