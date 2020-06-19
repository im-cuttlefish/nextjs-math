import React, { useContext, FC } from "react";
import {
  ExerciseContext,
  mergeThemes,
  mergeClassName,
  RefContext,
} from "./util";
import { Theme, Creater, InternalRefMeta } from "./types";

interface Arguments {
  id: string;
  prefix: string;
  theme?: Theme | Theme[];
}

interface Props {
  name?: string;
  expansion?: boolean;
  className?: string;
}

export const createAnswer: Creater<Arguments> = ({
  id,
  prefix,
  theme = {},
}) => {
  const encoded = encodeURIComponent(id);
  const merged = mergeThemes(theme);

  const Answer: FC<Props> = ({ name, expansion, className, children }) => {
    const { counter } = useContext(ExerciseContext);
    const containerStyle = mergeClassName(merged.answerContainer, className);
    const title = `${prefix}${counter}`;
    const htmlId = `mathdoc-${encoded}-${counter}`;
    const refMeta: InternalRefMeta = { isExternal: false, htmlId, counter };

    if (name) {
      refMeta.name = name;
    }

    if (expansion) {
      return (
        <details id={htmlId} className={containerStyle}>
          <summary className={merged.answerTitle} data-expansion>
            {title}
          </summary>
          <RefContext.Provider value={refMeta}>{children}</RefContext.Provider>
        </details>
      );
    }

    return (
      <div id={htmlId} className={containerStyle}>
        <p className={merged.answerTitle} data-displayed>
          {title}
        </p>
        <RefContext.Provider value={refMeta}>{children}</RefContext.Provider>
      </div>
    );
  };

  return { Component: Answer };
};
