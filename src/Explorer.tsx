import React from "react";
import { FileSystem, File, FileContent } from "./types";
import CreateFile from "./CreateFile";
import { listFilesInDirectory, moveToTrash } from "./fileSystem";

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
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <div
                  onClick={() => onOpenFile(file)}
                  style={{
                    cursor: "pointer",
                    color:
                      isFileOpen && (openFile as FileContent).id === file.id
                        ? "#000"
                        : "#888",
                  }}
                >
                  {file.name}
                </div>
                <div
                  onClick={async () => {
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

                    const files = await listFilesInDirectory(
                      fileSystem.folderId
                    );

                    setFileSystem({
                      folderId: fileSystem.folderId,
                      syncInProgress: false,
                      files,
                    });
                  }}
                  style={{ cursor: "pointer", marginLeft: 16 }}
                >
                  ✕
                </div>
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
