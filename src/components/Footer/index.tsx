import Button from 'components/Button';
import styled from 'styled-components/macro';
import TwitterIcon from '@material-ui/icons/Twitter';

const Footer = () => {
  return (
    <StyledFooter>
      <FooterTop>
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
      </FooterTop>
      <FooterBottom>
        <div>
          <Button type="link" to="/" color="white" size="small">
            Privacy Policy
          </Button>
          &nbsp;
          <Button
            type="link"
            to="/"
            color="white"
            size="small"
            style={{ marginLeft: '24px' }}
          >
            Terms & Conditions
          </Button>
        </div>
        <div>INFINITE© 2021 All rights reserved.</div>
        <IconsMenu>
          <Button type="icon" icon={TwitterIcon} color="white" radius={8} />
          <Button type="icon" icon={TwitterIcon} color="white" radius={8} />
          <Button type="icon" icon={TwitterIcon} color="white" radius={8} />
          <Button type="icon" icon={TwitterIcon} color="white" radius={8} />
          <Button type="icon" icon={TwitterIcon} color="white" radius={8} />
        </IconsMenu>
      </FooterBottom>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 12px;
  padding: 20px 50px 20px 50px;
`;

const FooterTop = styled.nav`
  max-width: 210px;
  display: flex;
  justify-content: space-between;
  padding: 8px 0 8px 0;
`;

const FooterBottom = styled.div`
  padding: 8px 0 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconsMenu = styled.div`
  max-width: 224px;
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
`;

export default Footer;
