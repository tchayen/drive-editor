export type ID = string;

export type File = {
  id: ID;
  name: string;
};

export type FileContent = {
  id: ID;
  name: string;
  content: string;
};

export type FileSystem = {
  folderId: ID;
  files: File[];
  syncInProgress: boolean;
};
