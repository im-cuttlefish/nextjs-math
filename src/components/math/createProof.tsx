import React, { FC } from "react";
import { Theme, Creater } from "./types";
import { mergeThemes } from "./util";

interface Arguments {
  startMark?: string;
  endMark?: string;
  theme?: Theme | Theme[];
}

export const createProof: Creater<Arguments> = ({
  startMark = "Proof.",
  endMark = "∎",
  theme = {},
}) => {
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
