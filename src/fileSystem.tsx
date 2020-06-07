import { ID, File } from "./types";

// @ts-ignore
const google = window.gapi;

export const MimeTypes = {
  directory: "application/vnd.google-apps.folder",
  text: "text/plain",
  json: "application/json",
};

export const createDirectory: (name: string) => Promise<ID> = async (
  name: string
) => {
  const metadata = {
    name,
    mimeType: MimeTypes.directory,
  };

  const file = await google.client.drive.files.create({
    resource: metadata,
    fields: "id",
  });

  return file.id;
};

export const createFile: (
  name: string,
  folderId: ID,
  content: string
) => Promise<ID> = async (name: string, folderId: ID, content: string) => {
  const file = new Blob([content], { type: MimeTypes.text });
  const metadata = {
    name,
    mimeType: MimeTypes.text,
    parents: [folderId],
  };

  const accessToken = google.auth.getToken().access_token;
  const form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: MimeTypes.json })
  );
  form.append("file", file);

  const response = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id",
    {
      method: "POST",
      headers: new Headers({ Authorization: `Bearer ${accessToken}` }),
      body: form,
    }
  );
  const data = await response.json();
  return data.id;
};

export const updateFile: (id: ID, content: string) => Promise<ID> = async (
  id: ID,
  content: string
) => {
  const file = new Blob([content], { type: MimeTypes.text });
  const metadata = {
    fileId: id,
  };

  const accessToken = google.auth.getToken().access_token;
  const form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: MimeTypes.json })
  );
  form.append("file", file);

  const response = await fetch(
    `https://www.googleapis.com/upload/drive/v3/files/${id}?uploadType=multipart`,
    {
      method: "PATCH",
      headers: new Headers({ Authorization: `Bearer ${accessToken}` }),
      body: form,
    }
  );
  const data = await response.json();
  return data.id;
};

export const readFile: (id: ID) => Promise<string> = async (id: ID) => {
  const response = await google.client.drive.files.get({
    fileId: id,
    alt: "media",
  });

  return response.body;
};

export const checkIfExists: (
  name: string,
  mimeType: string
) => Promise<ID | null> = async (name: string, mimeType: string) => {
  const response = await google.client.drive.files.list({
    q: `mimeType='${mimeType}' and name='${name}' and trashed=false`,
    fields: "files(id)",
    spaces: "drive",
  });

  if (response.result.files.length === 0) {
    return null;
  }

  return response.result.files[0].id;
};

let pageToken = null;

export const listFilesInDirectory: (id: ID) => Promise<File[]> = async (
  id: ID
) => {
  const response = await google.client.drive.files.list({
    q: `trashed=false and '${id}' in parents`,
    fields: "nextPageToken, files(id,name)",
    spaces: "drive",
    pageToken: pageToken,
  });
  pageToken = response.nextPageToken;
  const files = response.result.files;
  return files;
};
