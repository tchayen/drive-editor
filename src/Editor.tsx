import React, { useState, useEffect } from "react";
import TextArea from "./TextArea";
import useShortcuts from "./useShortcuts";
import { getKeyboardTip, getOs } from "./os";
import { FileContent } from "./types";
import Button from "./Button";
import useTimeDistance from "./useTimeDistance";

const TIMEOUT = 2000;

type Props = {
  value: FileContent | null;
  setValue: (value: FileContent) => void;
  loading?: boolean;
};

const Editor = ({ value, setValue, loading }: Props) => {
  const derivedValue =
    value !== null && value.loading === false ? value.content : "";

  const [state, setState] = useState(derivedValue);
  const [saving, setSaving] = useState<"no" | "in-progress" | "done">("no");

  const [lastSaved, setLastSaved] = useTimeDistance(TIMEOUT);

  let ref: any = null;

  useEffect(() => {
    setState(derivedValue);
    setSaving("no");
    setLastSaved(null);
  }, [derivedValue, setLastSaved]);

  useEffect(() => {
    return () => {
      clearTimeout(ref);
    };
    // We want to clearTimeout when unmounting.
    // eslint-disable-next-line
  }, []);

  const save = async () => {
    if (value === null || value.loading || saving !== "no") {
      return;
    }

    setSaving("in-progress");

    await setValue({ ...value, content: state });

    setSaving("done");
    setLastSaved(new Date());

    ref = setTimeout(() => {
      setSaving("no");
    }, TIMEOUT);
  };

  useShortcuts({
    s: save,
  });

  if (loading) {
    return (
      <div
        style={{
          color: "#888",
          marginTop: 16,
          marginLeft: 16,
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  if (value === null) {
    return (
      <div
        style={{
          color: "#888",
          marginTop: 16,
          marginLeft: 16,
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
      <div style={{ marginLeft: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <Button
            disabled={saving !== "no"}
            style={{ marginRight: 16 }}
            onClick={save}
          >
            Save
          </Button>
          {saving === "done" ? (
            <div>Saved!</div>
          ) : saving === "in-progress" ? (
            <div style={{ color: "#888" }}>Saving...</div>
          ) : tip ? (
            <div style={{ color: "#888" }}>{tip}+S to save</div>
          ) : null}
        </div>
        <div style={{ fontSize: 14, color: "#888", marginTop: 8 }}>
          {lastSaved ? <>Last saved {lastSaved}</> : <div>&nbsp;</div>}
        </div>
      </div>
      <TextArea
        placeholder="Start typing here..."
        value={state}
        onChangeText={setState}
      />
    </div>
  );
};

export default Editor;
