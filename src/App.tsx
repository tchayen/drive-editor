import React, { useEffect, useState } from "react";
import { initClient, handleSignIn, handleSignOut, isSignedIn } from "./drive";
import Button from "./Button";
import {
  checkIfExists,
  MimeTypes,
  createDirectory,
  listFilesInDirectory,
} from "./fileSystem";
import { File } from "./types";
import Explorer from "./Explorer";

const DIRECTORY_NAME = "drive-editor";

const Center = ({ children }) => (
  <div
    style={{
      display: "flex",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);

const App = () => {
  const [driveLoaded, setDriveLoaded] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const setup = async () => {
      await initClient();
      setDriveLoaded(true);

      if (isSignedIn()) {
        setSignedIn(true);
      }

      let id = await checkIfExists(DIRECTORY_NAME, MimeTypes.directory);

      if (!id) {
        id = await createDirectory(DIRECTORY_NAME);
      }

      const files = await listFilesInDirectory(id);
      setFiles(files);
    };

    setup();
  }, []);

  if (!driveLoaded) {
    return <Center>Loading...</Center>;
  }

  if (!signedIn) {
    return (
      <Center>
        <Button onClick={handleSignIn}>
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

  return (
    <div style={{ margin: 16 }}>
      <Button onClick={handleSignOut}>Sign out</Button>
      <Explorer files={files} />
    </div>
  );
};

export default App;
