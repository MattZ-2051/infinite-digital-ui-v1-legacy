import styled from 'styled-components/macro';

const Footer = () => {
  return (
    <StyledFooter>
      INFINITE© 2021 All rights reserved.
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  height: 55px;
  background-color: black;
  color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 12px;
  display: flex;
  align-items: center;
  padding: 0 50px 0 50px;
`;

export default Footer;
