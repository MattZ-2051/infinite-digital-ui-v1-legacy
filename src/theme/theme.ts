import { DefaultTheme } from 'styled-components';
import { mediaQueries, Devices } from './media';

interface Palette {
  main: string;
  contrastText: string;
}

interface CommonPalette {
  black: string;
  white: string;
}

interface Theme extends DefaultTheme {
  mediaQueries: Devices;
  borderRadius: string;
  palette: {
    common: CommonPalette;
    primary: Palette;
    secondary: Palette;
  };
}

export const theme: Theme = {
  mediaQueries,
  borderRadius: '4px',
  palette: {
    common: {
      black: '#222831',
      white: '#ffffff',
    },
    primary: {
      main: 'white',
      contrastText: 'black',
    },
    secondary: {
      main: 'black',
      contrastText: 'white',
    },
  },
};
