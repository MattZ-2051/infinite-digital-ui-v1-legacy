import { DefaultTheme } from 'styled-components';
import { mediaQueries, deviceSizes, Devices } from './media';

interface Palette {
  main: string;
  secondary: string;
  greyText: string;
  contrastText: string;
}

interface CommonPalette {
  black: string;
  white: string;
}

export interface Theme extends DefaultTheme {
  devices: Devices;
  mediaQueries: Devices;
  borderRadius: string;
  palette: {
    common: CommonPalette;
    light: Palette;
    dark: Palette;
  };
}

export const theme: Theme = {
  devices: deviceSizes,
  mediaQueries,
  borderRadius: '4px',
  palette: {
    common: {
      black: '#222831',
      white: '#ffffff',
    },
    light: {
      main: 'white',
      secondary: 'black',
      greyText: 'grey',
      contrastText: 'orange',
    },
    dark: {
      main: 'black',
      secondary: 'white',
      greyText: 'grey',
      contrastText: 'orange',
    },
  },
};
