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
    font-size: 14px;
  }

  body {
    margin: 0;
    font-family: 'josefin-sans', sans-serif;
    font-size: 1rem;
    background: white;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
  h1 { font-size: 4em; font-weight: 200; } // Extra-light
  h2 { font-size: 3em; font-weight: 700; } // Bold
  h3 { font-size: 2em; font-weight: 700; }
  h4 { font-size: 1.5em; font-weight: 600; } // Semi-bold
  h5 { font-size: 1.25em; font-weight: 600; }

  strong {
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    font-weight: 400; // Regular
    line-height: normal;
  }

  q {
    font-size: 1rem;
  }

  small {
    font-size: 0.75rem;
    font-weight: 500; // Medium
  }

  a {
    text-decoration: underline;
    cursor: pointer;
    font-weight: 600;
    color: black;
    
    &:active {
      color: black;
    }
    &:hover {
      text-decoration: none;
    }
  }

  // Slick-Slider plugin
  .slick-slider,
  .slick-list,
  .slick-slide,
  .slick-track {
      height: 100% !important;
  }

  .slick-slide > div {
    height: 100% !important;
  }

  .slick-dots li button:before {
    font-size: 13px;
  }
`;

export default GlobalStyle;
