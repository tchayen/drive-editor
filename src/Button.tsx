import React, { ReactNode, CSSProperties } from "react";

const noop = () => {};

type Props = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  text?: boolean;
  style?: CSSProperties;
};

const Button = ({ onClick, disabled, children, text, style }: Props) => (
  <button
    onClick={disabled ? noop : onClick}
    style={{
      cursor: disabled ? "not-allowed" : "pointer",
      border: "none",
      paddingLeft: text ? 0 : 16,
      paddingRight: text ? 0 : 16,
      height: 32,
      borderRadius: 4,
      fontFamily: "Inter",
      fontSize: 16,
      fontWeight: 500,
      backgroundColor: text ? "transparent" : "#0366d6",
      color: text ? "#000" : "#fff",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      opacity: disabled ? 0.5 : 1,
      ...style,
    }}
  >
    {children}
  </button>
);

export default Button;
