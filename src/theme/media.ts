export interface Devices {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

const size: Devices = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1280px',
  xl: '1920px',
};

export const mediaQueries: Devices = {
  xs: `@media (min-width: ${size.xs})`,
  sm: `@media (min-width: ${size.sm})`,
  md: `@media (min-width: ${size.md})`,
  lg: `@media (min-width: ${size.lg})`,
  xl: `@media (min-width: ${size.xl})`,
};
