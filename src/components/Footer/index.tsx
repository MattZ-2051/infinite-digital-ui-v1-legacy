import Button from 'components/Button';
import styled from 'styled-components/macro';
import TwitterIcon from '@material-ui/icons/Twitter';
import Divider from 'components/Divider';
import Hidden from '@material-ui/core/Hidden';

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <FooterTop>
          <Divider gap={24} tag="nav">
            <Button type="link" to="/" color="white" size="small">
              FAQ
            </Button>

            <Button type="link" to="/" color="white" size="small">
              Help
            </Button>

            <Button type="link" to="/" color="white" size="small">
              Thanks
            </Button>

            <Button type="link" to="/" color="white" size="small">
              +
            </Button>
          </Divider>
        </FooterTop>

        <FooterBottom>
          <Divider gap={24} tag="nav">
            <Button type="link" to="/" color="white" size="small">
              Privacy Policy
            </Button>

            <Button type="link" to="/" color="white" size="small">
              Terms & Conditions
            </Button>
          </Divider>

          <Hidden smDown>
            <div>INFINITE© 2021 All rights reserved.</div>
          </Hidden>

          <Divider gap={16} tag="nav">
            <Button type="icon" icon={TwitterIcon} color="white" radius={8} />
            <Button type="icon" icon={TwitterIcon} color="white" radius={8} />
            <Button type="icon" icon={TwitterIcon} color="white" radius={8} />
            <Button type="icon" icon={TwitterIcon} color="white" radius={8} />
            <Button type="icon" icon={TwitterIcon} color="white" radius={8} />
          </Divider>

          <Hidden mdUp>
            <div>INFINITE© 2021 All rights reserved.</div>
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
