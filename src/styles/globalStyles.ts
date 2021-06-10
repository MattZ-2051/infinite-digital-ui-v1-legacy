import { createGlobalStyle } from 'styled-components';
import { mediaQueries } from 'theme/media';

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

  ${mediaQueries.sm} {
    font-size: 10px;
  }

  ${mediaQueries.md} {
    font-size: 12px;
  }

  ${mediaQueries.lg} {
    font-size: 14px;
  }

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
    font-size: 16px;
  }

  body {
    margin: 0;
    font-family: 'PlusJakartaSans', sans-serif;
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

  //Slider
  .slick-slider {
    overflow-x: hidden;
  }

  .slick-next {
    right: 25px;
    z-index: 200;
  }

  .slick-prev {
    left: 25px;
    z-index: 200;
  }

  .slick-dots {
    position: static;
    margin-top: 40px;

    @media screen and (max-width: 600px) {
      margin-top: 0px
    }
  }

  .slick-dots li button:before {
    font-size: 13px;
  }

  .slick-track {
    @media screen and (max-width: 600px) {
     display: flex;
    }
  }

  // Mui Calendar
  .MuiPaper-root.MuiPopover-paper.MuiPaper-elevation8.MuiPaper-rounded {
    border-radius: 30px;

    .MuiPickersDay-day.MuiPickersDay-current {
      background-color: #686868;
      color: white;
    }

    .MuiPickersCalendarHeader-dayLabel {
      font-size: 1rem;
      color: #9E9E9E;
    }

    .MuiTypography-body1 {
      font-weight: bold;
      font-size: 18px;
    }

    .MuiPickersDay-daySelected {
      background-color: black;
    }

    .MuiIconButton-label{
      p.MuiTypography-root {
        font-weight: 700;
      }
    }
  }

  // Mui pagination
  .MuiPaginationItem-page.Mui-selected {
    background-color: rgb(0 0 0);
    color: white;

    &:hover {
      color: black;
    }
}
  // time picker
  .rc-time-picker-panel {
    .rc-time-picker-panel-input {
      font-size: 18px;
    }
    z-index: 5000;
    .rc-time-picker-panel-input-wrap {
      background-color: white;
    }
    .rc-time-picker-panel-inner {
      background: #191919;
      border: 1px solid #EBEBEB;
      box-sizing: border-box;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      border: none;
      font-size: 18px;
      line-height: 23px;
      color: #000000;
    }
    .rc-time-picker-panel-select {
      /* padding:5px; */
      font-size: 18px;
      line-height: 23px;
      text-align: center;
      li {
        color: white;
        margin-top:10px;
        margin-bottom:10px;
      }
      li:hover {
        color: black;
        text-align: center;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    li.rc-time-picker-panel-select-option-selected {
      color: white;
      background-color: #333333;
      text-align: center;
      padding: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .rc-time-picker-panel-select {
      scrollbar-width: 1px;
      scrollbar-color: #90A4AE #CFD8DC;
      ::-webkit-scrollbar {
        width: 1px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: transparent;
      }
    }
  }
`;
export default GlobalStyle;
