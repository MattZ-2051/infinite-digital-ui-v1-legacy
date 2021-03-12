import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  /* 
    Default breakpoints:

    xs, extra-small: 0px
    sm, small: 600px
    md, medium: 960px
    lg, large: 1280px
    xl, extra-large: 1920px

    Info:
    https://material-ui.com/components/hidden/
    https://material-ui.com/customization/breakpoints/
  */

 :root {
    // Colors
    --red: #FF3880;
    --green:#29EBA5;
    --orange: #FCB955;
    --grey-5: #EEEEEE;
    --grey-10: #DDDDDD;
    --grey-20: #AAAAAA;
    --grey-40: #888888;
    --grey-60: #666666;
    --grey-80: #333333;
    --grey-90: #222222;

    // Paddings
    --desktop-view-padding: 48px 80px 48px 80px;
  }

  html {
    background: var(--grey-light);
    font-size: 14px;
  }

  body {
    margin: 0;
    font-family: 'josefin-sans', sans-serif;
    font-size: 14px;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
  h1 { font-size: 4rem; }
  h2 { font-size: 3rem; }
  h3 { font-size: 2rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }

  p {
    font-size: 1rem;
  }

  q {
    font-size: 1rem;
  }

  small {
    font-size: 0.75rem;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;
