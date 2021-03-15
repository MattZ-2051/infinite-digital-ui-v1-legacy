import Button from 'components/Button';
import styled from 'styled-components/macro';
import TwitterIcon from '@material-ui/icons/Twitter';
import Divider from 'components/Divider';

const Footer = () => {
  return (
    <StyledFooter>
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
