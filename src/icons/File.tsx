import React, { CSSProperties } from "react";

type Props = {
  color: string;
  background: string;
  style: CSSProperties;
};

const File = ({ color, background, style }: Props) => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" style={style}>
    <rect
      x={3}
      y={1}
      width={14}
      height={18}
      rx={3}
      stroke={color}
      strokeWidth={2}
    />
    <path fill={background} d="M10 0h8v8h-8z" />
    <path
      d="M11.5 1l.707-.707A1 1 0 0011.5 0v1zM17 6.5h1a1 1 0 00-.293-.707L17 6.5zM10 2h1.5V0H10v2zm.793-.293l5.5 5.5 1.414-1.414-5.5-5.5-1.414 1.414zM16 6.5V8h2V6.5h-2z"
      fill={color}
    />
    <path
      d="M11 7h-1a1 1 0 001 1V7zm-1-6v6h2V1h-2zm1 7h6V6h-6v2z"
      fill={color}
    />
  </svg>
);

export default File;
