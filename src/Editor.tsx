import React, { useState, useEffect } from "react";
import TextArea from "./TextArea";
import useShortcuts from "./useShortcuts";
import { getKeyboardTip, getOs } from "./os";
import { FileContent } from "./types";

type Props = {
  value: FileContent | "loading" | null;
  setValue: (value: FileContent) => void;
  loading?: boolean;
};

const Editor = ({ value, setValue, loading }: Props) => {
  const derivedValue =
    value !== null && value !== "loading" ? value.content : "";

  const [state, setState] = useState(derivedValue);
  const [showSaved, setShowSaved] = useState(false);

  let ref: any = null;

  useEffect(() => {
    setState(derivedValue);
  }, [derivedValue]);

  useEffect(() => {
    return () => {
      clearTimeout(ref);
    };
  });

  useShortcuts({
    s: async () => {
      if (value === null || value === "loading") {
        return;
      }

      await setValue({ ...value, content: state });

      setShowSaved(true);
      ref = setTimeout(() => {
        setShowSaved(false);
      }, 1500);
    },
  });

  if (loading) {
    return (
      <div style={{ color: "#888", marginTop: 16, marginLeft: 16 }}>
        Loading...
      </div>
    );
  }

  if (value === null) {
    return (
      <div style={{ color: "#888", marginTop: 16, marginLeft: 16 }}>
        No open file
      </div>
    );
  }

  const tip = getKeyboardTip(getOs());

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      {showSaved ? (
        <div style={{ marginTop: 16, marginLeft: 16, marginBottom: 16 }}>
          Saved!
        </div>
      ) : (
        tip && (
          <div
            style={{
              marginTop: 16,
              marginLeft: 16,
              color: "#888",
              marginBottom: 16,
            }}
          >
            {tip}+S to save
          </div>
        )
      )}
      <TextArea value={state} onChangeText={setState} />
    </div>
  );
};

export default Editor;
