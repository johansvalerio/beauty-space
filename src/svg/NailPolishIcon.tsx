import React from "react";

const NailPolishIcon = (props: React.SVGProps<SVGSVGElement>) => {
  const { className, ...restProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ transform: "translateY(-0.5px)" }}
      {...restProps}
    >
      <path d="M7 10v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-8" />
      <path d="M9 10V5a2 2 0 1 1 6 0v5" />
      <path d="M10 7h4" />
      <path d="M8 10h8" />
      {/* Tapa negra */}
      <path d="M12 2v1" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
};

export default NailPolishIcon;
