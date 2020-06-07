import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
};

const Button = ({ onClick, children }: Props) => (
  <button
    onClick={onClick}
    style={{
      cursor: "pointer",
      border: "none",
      paddingLeft: 16,
      paddingRight: 16,
      height: 32,
      borderRadius: 4,
      fontFamily: "Inter",
      fontSize: 15,
      fontWeight: 500,
      backgroundColor: "#000",
      color: "#fff",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    }}
  >
    {children}
  </button>
);

export default Button;
