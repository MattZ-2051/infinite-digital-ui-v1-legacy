import { createGlobalStyle } from 'styled-components';
import JosefinSans from '../assets/fonts/josefin-sans-v17-latin-regular.woff';

const GlobalStyle = createGlobalStyle`
 :root {
    // Colors
    --red: #fa2215;
    --brown: #e7dbab;
    --light-green-1: #ebebeb;
    --light-green-2: #d9d9d9;
    --light-green-3: #a6a6a6;
    --light-green-4: #737373;
    --light-green-5: #23201f;
    --light-green-6: #050506;
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

  /* input[type="text"] {
    height: 45px;
  } */
`;

export default GlobalStyle;
