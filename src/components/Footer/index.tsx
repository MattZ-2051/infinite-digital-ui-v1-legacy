import Button from 'components/Button';
import styled from 'styled-components/macro';
import TwitterIcon from '@material-ui/icons/Twitter';
import Divider from 'components/Divider';

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

          <div>INFINITE© 2021 All rights reserved.</div>

          <Divider gap={16} tag="nav">
            <Button type="icon" icon={TwitterIcon} color="white" radius={8} />
            <Button type="icon" icon={TwitterIcon} color="white" radius={8} />
            <Button type="icon" icon={TwitterIcon} color="white" radius={8} />
            <Button type="icon" icon={TwitterIcon} color="white" radius={8} />
            <Button type="icon" icon={TwitterIcon} color="white" radius={8} />
          </Divider>
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
`;

const FooterBottom = styled.div`
  padding: 8px 0 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Footer;
