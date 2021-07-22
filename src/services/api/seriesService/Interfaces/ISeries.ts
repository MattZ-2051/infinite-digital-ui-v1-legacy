export interface ISeries {
  totalDocs: number;
  resource: IResource[];
}

interface IResource {
  name: string;
  description: string;
  issuerId: string;
}
