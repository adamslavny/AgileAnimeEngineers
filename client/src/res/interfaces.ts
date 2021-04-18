export interface category {
  name: string;
  id: string;
  tags: Array<string>;
};

export interface discussion {
  name: string;
  id: string;
  tags: Array<string>;
};

export interface message {
  content: string;
  author: string;
  time: Date;
  ID: string;
};

export interface userData {
  UID: string;
  PUID: number;
  username: string;
  isModerator: boolean;
};
