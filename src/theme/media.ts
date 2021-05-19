export interface Devices {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export const deviceSizes: Devices = {
  xs: '0px',
  sm: '600px',
  md: '960px',
  lg: '1440px',
  xl: '1920px',
};

export const mediaQueries: Devices = {
  xs: `@media (min-width: ${deviceSizes.xs})`,
  sm: `@media (min-width: ${deviceSizes.sm})`,
  md: `@media (min-width: ${deviceSizes.md})`,
  lg: `@media (min-width: ${deviceSizes.lg})`,
  xl: `@media (min-width: ${deviceSizes.xl})`,
};
