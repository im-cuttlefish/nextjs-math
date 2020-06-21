import React, { FC } from "react";
import { Theme, Creater } from "./types";
import { mergeThemes, mergeClassName } from "./util";

interface Arguments {
  id: string;
  startMark?: string;
  endMark?: string;
  theme?: Theme | Theme[];
}

interface Props {
  className: string;
}

export const createProof: Creater<Arguments> = ({
  id,
  startMark = "Proof.",
  endMark = "∎",
  theme = {},
}) => {
  const merged = mergeThemes(theme);

  const Proof: FC<Props> = ({ className, children }) => {
    const containerStyle = mergeClassName(merged.proofContainer, className);

    return (
      <div className={containerStyle} data-mathdoc-id={id}>
        <span className={merged.proofStartMark}>{startMark}</span>
        {children}
        <span className={merged.proofEndMark}>{endMark}</span>
      </div>
    );
  };

  return { Component: Proof };
};
