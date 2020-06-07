import React, { CSSProperties } from "react";

type Props = {
  value: string;
  placeholder?: string;
  autoFocus?: boolean;
  onChangeText: (value: string) => void;
  style?: CSSProperties;
};

const TextArea = ({
  value,
  placeholder,
  autoFocus,
  onChangeText,
  style,
}: Props) => (
  <textarea
    autoFocus={autoFocus}
    value={value}
    style={style}
    placeholder={placeholder}
    onChange={(event) => onChangeText(event.target.value)}
  />
);

export default TextArea;
