export interface IRequestData {
  name?: string;
  email?: string;
  password?: string;
}

export type todo = {
  _id: number;
  title: string;
  completed: boolean;
};

export enum Modes {
  ALL = "all",
  COMPLETED = "completed",
  INCOMPLETED = "incompleted",
}
