import { DefaultTheme } from 'styled-components';
import { mediaQueries, deviceSizes, Devices } from './media';

interface Palette {
  baseMain: string;
  baseComplement: string;
  secondaryMain: string;
  secondaryComplement: string;
  accentMain: string;
  accentComplement: string;
  accentSecondary: string;
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
      baseMain: 'white',
      baseComplement: 'black',
      secondaryMain: 'white',
      secondaryComplement: 'black',
      accentMain: '#EFEFEF',
      accentSecondary: '#EFEFEF',
      accentComplement: '#9E9E9E',
      greyText: 'grey',
      contrastText: 'orange',
    },
    dark: {
      baseMain: 'black',
      baseComplement: 'white',
      secondaryMain: '#1C1C1C',
      secondaryComplement: 'white',
      accentMain: '#2D2D2D',
      accentSecondary: '#252525',
      accentComplement: 'white',
      greyText: 'grey',
      contrastText: 'orange',
    },
  },
};
