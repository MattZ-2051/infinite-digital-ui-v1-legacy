export interface IFilterArrow {
  isHidden: boolean | undefined;
  setIsHidden: (value: React.SetStateAction<boolean | undefined>) => void;
  theme?: 'light' | 'dark'
}
