export interface Board {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface NewBoard {
  title: string;
  owner: string;
  users: string[];
}
