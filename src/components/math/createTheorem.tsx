import React, { FC } from "react";
import { RefContext, createCounter, mergeThemes } from "./util";
import { Theme, InternalRefMeta, Creater } from "./types";

interface Arguments {
  id: string;
  prefix: string;
  theme?: Theme | Theme[];
}

interface Props {
  name?: string;
  display?: "name" | "counter" | "both";
}

export const createTheorem: Creater<Arguments> = ({
  id,
  prefix,
  theme = {},
}) => {
  const merged = mergeThemes(theme);
  const encoded = encodeURIComponent(id);
  const useCounter = createCounter();

  const Theorem: FC<Props> = ({ name = "", display = "both", children }) => {
    const counter = useCounter();
    const htmlId = `mathdoc-${encoded}-${counter}`;
    const refMeta: InternalRefMeta = { isExternal: false, htmlId, counter };

    if (name) {
      refMeta.name = name;
    }

    return (
      <dl id={htmlId} className={merged.theoremContainer}>
        <dt className={merged.theoremTitle}>
          {display !== "name" && `${prefix}${counter}`}
          {display === "both" && "．"}
          {display !== "counter" && name}
        </dt>
        <dd className={merged.theoremContent}>
          <RefContext.Provider value={refMeta}>{children}</RefContext.Provider>
        </dd>
      </dl>
    );
  };

  return Theorem;
};
