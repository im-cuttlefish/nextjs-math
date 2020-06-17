import React, { FC, useContext } from "react";
import { mergeThemes, ExerciseContext, RefContext } from "./internal";
import { Theme, InternalRefMeta } from "./types";

interface Arguments {
  prefix: string;
  theme?: Theme | Theme[];
}

interface Props {
  name?: string;
  expansion?: boolean;
}

export const createAnswer = (id: string, { prefix, theme = {} }: Arguments) => {
  const encoded = encodeURIComponent(id);
  const merged = mergeThemes(theme);

  const Answer: FC<Props> = ({ name, expansion = false, children }) => {
    const { counter } = useContext(ExerciseContext);
    const title = `${prefix}${counter}`;
    const htmlId = `ref-${encoded}-${counter}`;
    const refMeta: InternalRefMeta = { isExternal: false, htmlId, counter };

    if (name) {
      refMeta.name = name;
    }

    if (expansion) {
      return (
        <details id={htmlId} className={merged.answerContainer} data-expansion>
          <summary className={merged.answerTitle} data-expansion>
            {title}
          </summary>
          <RefContext.Provider value={refMeta}>{children}</RefContext.Provider>
        </details>
      );
    }

    return (
      <div id={htmlId} className={merged.answerContainer} data-displayed>
        <p className={merged.answerTitle} data-displayed>
          {title}
        </p>
        <RefContext.Provider value={refMeta}>{children}</RefContext.Provider>
      </div>
    );
  };

  return Answer;
};
