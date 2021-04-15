import { createGlobalStyle } from 'styled-components';
import JosefinSans from '../assets/fonts/josefin-sans-v17-latin-regular.woff';

const GlobalStyle = createGlobalStyle`
 :root {
    // Colors
    --red: #ff1616;
    --grey-light: #f5f5f5;
  }

  @font-face {
    font-family: 'josefin-sans';
    font-style: normal;
    font-weight: 400;
    src: url(${JosefinSans}) format('woff');
  }

  html {
    background: var(--grey-light);
  }

  body {
    margin: 0;
    font-family: 'josefin-sans', sans-serif;
    font-size: 16px;
  }
`;
 
export default GlobalStyle;