import React, { FC, ComponentPropsWithoutRef } from "react";
import {
  createCounter,
  mergeThemes,
  ExerciseContext,
  RefContext,
  mergeClassName,
} from "./util";
import { ExerciseStore, Theme, InternalRefMeta, Creater } from "./types";

interface Arguments {
  id: string;
  prefix: string;
  theme?: Theme | Theme[];
}

interface Props extends ComponentPropsWithoutRef<"div"> {
  name?: string;
  className?: string;
}

export const createQuestion: Creater<Arguments> = ({
  id,
  prefix,
  theme = {},
}) => {
  const encoded = encodeURIComponent(id);
  const merged = mergeThemes(theme);
  const useCounter = createCounter();

  const Question: FC<Props> = ({ name, className, children }) => {
    const containerStyle = mergeClassName(merged.answerContainer, className);
    const counter = useCounter();
    const htmlId = `mathdoc-${encoded}-${counter}`;
    const refMeta: InternalRefMeta = { isExternal: false, htmlId, counter };
    const store: ExerciseStore = { counter };

    if (name) {
      refMeta.name = name;
    }

    return (
      <div id={htmlId} className={containerStyle}>
        <p className={merged.questionTitle}>{`${prefix}${counter}`}</p>
        <RefContext.Provider value={refMeta}>
          <ExerciseContext.Provider value={store}>
            {children}
          </ExerciseContext.Provider>
        </RefContext.Provider>
      </div>
    );
  };

  return { Component: Question };
};
