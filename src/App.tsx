import React, { useEffect, useState, useRef } from "react";
import { initClient, handleSignIn, handleSignOut, isSignedIn } from "./drive";
import Button from "./Button";
import {
  checkIfExists,
  MimeTypes,
  createDirectory,
  listFilesInDirectory,
  readFile,
  updateFile,
} from "./fileSystem";
import { FileSystem, FileContent, File, ID } from "./types";
import Explorer from "./Explorer";
import Editor from "./Editor";

const DIRECTORY_NAME = "drive-editor";

const Center = ({ children }) => (
  <div
    style={{
      display: "flex",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
      color: "#888",
    }}
  >
    {children}
  </div>
);

const App = () => {
  const [driveLoaded, setDriveLoaded] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [fileSystem, setFileSystem] = useState<FileSystem | null>(null);
  const [openFile, setOpenFile] = useState<FileContent | null>(null);
  const ref = useRef<Promise<string> | null>(null);

  const loadFiles = async () => {
    let id = await checkIfExists(DIRECTORY_NAME, MimeTypes.directory);

    if (!id) {
      id = await createDirectory(DIRECTORY_NAME);
    }

    const files = await listFilesInDirectory(id);
    setFileSystem({ folderId: id, syncInProgress: false, files });
  };

  useEffect(() => {
    const setup = async () => {
      await initClient();
      setDriveLoaded(true);

      if (isSignedIn()) {
        setSignedIn(true);
      } else {
        return;
      }

      await loadFiles();
    };

    setup();
  }, []);

  const onSignIn = async () => {
    await handleSignIn();
    setSignedIn(true);
    await loadFiles();
  };

  const onSignOut = async () => {
    await handleSignOut();
    setSignedIn(false);
    setFileSystem(null);
    setOpenFile(null);
  };

  const onOpenFile = async (file: File) => {
    setOpenFile({ id: file.id, loading: true, name: file.name, content: "" });
    const promise = readFile(file.id);
    ref.current = promise;
    const content = await promise;

    if (ref.current !== promise) {
      return;
    }

    setOpenFile({ ...file, content, loading: false });
  };

  const saveFile = async (file: FileContent) => {
    setOpenFile(file);
    await updateFile(file.id, file.content);
  };

  if (!driveLoaded) {
    return <Center>Connecting to Google Drive...</Center>;
  }

  if (!signedIn) {
    return (
      <Center>
        <Button onClick={onSignIn}>
          Connect to{" "}
          <img
            style={{ width: 20, marginLeft: 4 }}
            src="/drive.png"
            alt="Google Drive logo"
          />
        </Button>
      </Center>
    );
  }

  if (!fileSystem) {
    return <Center>Loading files...</Center>;
  }

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: 360,
          borderRight: "1px solid #eee",
          minHeight: "100vh",
        }}
      >
        <Button onClick={onSignOut} style={{ marginLeft: 16, marginTop: 16 }}>
          Sign out
        </Button>
        <Explorer
          fileSystem={fileSystem}
          setFileSystem={setFileSystem}
          openFile={openFile}
          onOpenFile={onOpenFile}
        />
      </div>
      <Editor
        value={openFile}
        setValue={saveFile}
        loading={openFile !== null && openFile.loading}
      />
    </div>
  );
};

export default App;
