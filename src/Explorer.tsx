import React from "react";
import { File } from "./types";

type Props = {
  files: File[];
};

const Explorer = ({ files }: Props) => (
  <div>
    {files.length > 0
      ? files.map((file) => <div key={file.id}>{file.name}</div>)
      : "No files"}
  </div>
);

export default Explorer;
