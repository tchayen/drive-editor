import React from "react";
import { FileSystem, File, FileContent } from "./types";
import CreateFile from "./CreateFile";

type Props = {
  fileSystem: FileSystem;
  setFileSystem: (fileSystem: FileSystem) => void;
  openFile: FileContent | "loading" | null;
  onOpenFile: (file: File) => void;
};

const Explorer = ({
  fileSystem,
  setFileSystem,
  openFile,
  onOpenFile,
}: Props) => {
  const isFileOpen = openFile !== null && openFile !== "loading";

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
              <div
                key={file.id}
                onClick={() => onOpenFile(file)}
                style={{
                  cursor: "pointer",
                  marginBottom: 8,
                  color:
                    isFileOpen && (openFile as FileContent).id === file.id
                      ? "#000"
                      : "#888",
                }}
              >
                {file.name}
              </div>
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
