import React, { useContext, useMemo, FC } from "react";
import { Theme, InternalRefMeta } from "../types";
import { ExerciseContext } from "./exerciseContext";
import { RefContext } from "./refContext";
import { mergeThemes } from "./mergeThemes";
import { mergeClassName } from "./mergeClassName";

interface Props {
  id: string;
  prefix: string;
  theme?: Theme | Theme[];
  name?: string;
  expansion?: boolean;
  className?: string;
}

export const AnswerRenderer: FC<Props> = ({
  id,
  prefix,
  theme = {},
  name,
  expansion,
  className,
  children,
}) => {
  const { counter } = useContext(ExerciseContext);
  const encoded = useMemo(() => encodeURIComponent(id), [id]);
  const merged = useMemo(() => mergeThemes(theme), [theme]);
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
