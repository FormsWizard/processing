"use client";

import * as React from "react";

interface Props {
  primary?: boolean;
  size?: "small" | "large";
  label?: string;
}
 
export const Button = ({
  primary = false,
  label = "Foo",
  size = "small",
}: Props) => {
  return (
    <button
      style={{
        backgroundColor: primary ? "red" : "inherit",
        fontSize: size === "large" ? "24px" : "14px",
      }}
    >
      {label}
    </button>
  );
};
