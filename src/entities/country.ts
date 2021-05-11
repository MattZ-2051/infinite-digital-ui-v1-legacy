export interface District {
  name: string;
  stateCode: string;
}

export interface Country {
  name: string;
  iso2: string;
  states?: Array<District>;
}
