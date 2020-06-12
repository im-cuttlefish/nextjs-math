import React, { FC } from "react";
import { ProofStyle, StyleWithTheme } from "./types";
import { applyTheme } from "./internal";

interface Mark {
  startMark?: string;
  endMark?: string;
}

export type Style = StyleWithTheme<ProofStyle>;

export const createProof = ({
  startMark = "Proof.",
  endMark = "∎",
  ...style
}: Mark & Style) => {
  const applied = applyTheme("proof", style);

  const Proof: FC = ({ children }) => (
    <div style={applied.container}>
      <span style={applied.start}>{startMark}</span>
      {children}
      <span style={applied.end}>{endMark}</span>
    </div>
  );

  return Proof;
};
