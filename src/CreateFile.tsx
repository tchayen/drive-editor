import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { createFile, listFilesInDirectory } from "./fileSystem";
import { ID, FileSystem } from "./types";

type Props = {
  folderId: ID;
  setFileSystem: (fileSystem: FileSystem) => void;
};

const CreateFile = ({ folderId, setFileSystem }: Props) => {
  const [showInput, setShowInput] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleClick = async () => {
    setFileName("");
    setFileSystem({
      folderId,
      syncInProgress: true,
      files: [],
    });

    await createFile(fileName, folderId, "");

    const files = await listFilesInDirectory(folderId);

    setFileSystem({
      folderId,
      syncInProgress: false,
      files,
    });

    setShowInput(false);
  };

  if (!showInput) {
    return (
      <Button style={{ marginLeft: 16 }} onClick={() => setShowInput(true)}>
        Create file
      </Button>
    );
  }

  return (
    <div style={{ display: "flex", marginLeft: 16 }}>
      <Input
        autoFocus
        style={{ marginRight: 16 }}
        placeholder="file-name.txt"
        value={fileName}
        onChangeText={setFileName}
      />
      <Button disabled={fileName.length === 0} onClick={handleClick}>
        Add
      </Button>
      <Button
        style={{ marginLeft: 16 }}
        text
        onClick={() => setShowInput(false)}
      >
        Cancel
      </Button>
    </div>
  );
};

export default CreateFile;
