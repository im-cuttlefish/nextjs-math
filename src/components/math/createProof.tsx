import React, { FC } from "react";
import { Theme } from "./types";
import { mergeThemes } from "./internal";

interface Arguments {
  startMark?: string;
  endMark?: string;
  theme?: Theme | Theme[];
}

export const createProof = ({
  startMark = "Proof.",
  endMark = "∎",
  theme = {},
}: Arguments = {}) => {
  const merged = mergeThemes(theme);

  const Proof: FC = ({ children }) => (
    <div className={`${merged.proofContainer}`}>
      <span className={`${merged.proofStartMark}`}>{startMark}</span>
      {children}
      <span className={`${merged.proofEndMark}`}>{endMark}</span>
    </div>
  );

  return Proof;
};
