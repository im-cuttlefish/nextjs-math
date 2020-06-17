import React, { FC } from "react";
import {
  createCounter,
  mergeThemes,
  ExerciseContext,
  RefContext,
} from "./internal";
import { ExerciseStore, Theme, InternalRefMeta } from "./types";

interface Arguments {
  prefix: string;
  theme?: Theme | Theme[];
}

interface Props {
  name?: string;
}

export const createQuestion = (
  id: string,
  { prefix, theme = {} }: Arguments
) => {
  const encoded = encodeURIComponent(id);
  const merged = mergeThemes(theme);
  const useCounter = createCounter();

  const Question: FC<Props> = ({ name, children }) => {
    const counter = useCounter();
    const htmlId = `ref-${encoded}-${counter}`;
    const refMeta: InternalRefMeta = { isExternal: false, htmlId, counter };
    const store: ExerciseStore = { counter };

    if (name) {
      refMeta.name = name;
    }

    return (
      <div id={htmlId} className={merged.questionContainer}>
        <p className={merged.questionTitle}>{`${prefix}${counter}`}</p>
        <RefContext.Provider value={refMeta}>
          <ExerciseContext.Provider value={store}>
            {children}
          </ExerciseContext.Provider>
        </RefContext.Provider>
      </div>
    );
  };

  return Question;
};
