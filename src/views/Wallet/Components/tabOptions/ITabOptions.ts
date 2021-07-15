export interface ITabOptions {
  options: string[];
  setSelectedTab: (value: React.SetStateAction<number>) => void;
  selectedTab: number;
}
