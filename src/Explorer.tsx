import React, { useState } from "react";
import { FileSystem, File, FileContent } from "./types";
import CreateFile from "./CreateFile";
import { listFilesInDirectory, moveToTrash } from "./fileSystem";
import FileIcon from "./icons/File";

type ItemProps = {
  file: File;
  onRemove: (file: File) => Promise<void>;
  openFile: FileContent | null;
  onOpenFile: (file: File) => void;
  isFileOpen: boolean;
};

const Item = ({
  file,
  onRemove,
  openFile,
  onOpenFile,
  isFileOpen,
}: ItemProps) => {
  const [hover, setHovered] = useState(false);

  const isActive = isFileOpen && openFile?.id === file.id;
  const isLoading = openFile?.loading && openFile.id === file.id;
  const color = isActive || isLoading ? "#000" : "#888";

  const handleEnter = () => {
    if (isActive || isLoading) {
      return;
    }

    setHovered(true);
  };
  const handleLeave = () => {
    setHovered(false);
  };

  const handleOpen = () => {
    if (isActive || isLoading) {
      return;
    }

    onOpenFile(file);
    setHovered(false);
  };

  const handleRemove = () => {
    onRemove(file);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: hover ? "#eee" : "transparent",
        paddingLeft: 16,
        cursor: isActive || isLoading ? "default" : "pointer",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        onClick={handleOpen}
        style={{
          display: "flex",
          alignItems: "center",
          color: color,
          height: 40,
          flex: 1,
        }}
      >
        <FileIcon
          color={color}
          background={hover ? "#eee" : "#fff"}
          style={{ marginRight: 8 }}
        />{" "}
        {file.name}
      </div>
      {!isActive && !isLoading && (
        <div
          onClick={handleRemove}
          style={{
            cursor: "pointer",
            paddingLeft: 16,
            paddingRight: 16,
            height: 40,
            display: "flex",
            alignItems: "center",
          }}
        >
          ✕
        </div>
      )}
    </div>
  );
};

type Props = {
  fileSystem: FileSystem;
  setFileSystem: (fileSystem: FileSystem) => void;
  openFile: FileContent | null;
  onOpenFile: (file: File) => void;
};

const Explorer = ({
  fileSystem,
  setFileSystem,
  openFile,
  onOpenFile,
}: Props) => {
  const isFileOpen = openFile !== null && !openFile.loading;

  const onRemove = async (file: File) => {
    // eslint-disable-next-line
    const shouldRemove = confirm(
      `Are you sure you want to remove '${file.name}'?`
    );

    if (!shouldRemove) {
      return;
    }

    setFileSystem({
      folderId: fileSystem.folderId,
      syncInProgress: true,
      files: [],
    });
    await moveToTrash(file.id);

    const files = await listFilesInDirectory(fileSystem.folderId);

    setFileSystem({
      folderId: fileSystem.folderId,
      syncInProgress: false,
      files,
    });
  };

  return (
    <div style={{ marginTop: 16 }}>
      <CreateFile
        setFileSystem={setFileSystem}
        folderId={fileSystem.folderId}
      />
      <div style={{ marginTop: 16 }}>
        {!fileSystem.syncInProgress ? (
          fileSystem.files.length > 0 ? (
            fileSystem.files.map((file) => (
              <Item
                key={file.id}
                file={file}
                openFile={openFile}
                onOpenFile={onOpenFile}
                isFileOpen={isFileOpen}
                onRemove={onRemove}
              />
            ))
          ) : (
            <div style={{ color: "#888" }}>No files</div>
          )
        ) : (
          <div style={{ color: "#888" }}>Synchronizing...</div>
        )}
      </div>
    </div>
  );
};

export default Explorer;
