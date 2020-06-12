import React, { FC, useState, useEffect } from "react";
import { applyTheme } from "./internal/applyTheme";
import { RefMeta, TheoremStyle, StyleWithTheme } from "./types";
import { createCounter } from "./internal";

type Style = StyleWithTheme<TheoremStyle>;

interface Props {
  name?: string;
  register?: (x: RefMeta) => void;
}

export const createTheorem = (prefix: string, style: Style = {}) => {
  const encodedPrefix = encodeURIComponent(prefix);
  const applied = applyTheme("theorem", style);
  const useCounter = createCounter();

  const Theorem: FC<Props> = ({ name = "", register, children }) => {
    const [htmlId, setHtmlId] = useState("");
    const counter = useCounter();

    useEffect(() => {
      const htmlId = `theorem-${encodedPrefix}-${counter}`;
      setHtmlId(htmlId);
      register && register({ isExternal: false, htmlId, counter, name });
    }, []);

    return (
      <dl id={htmlId} style={applied.container}>
        <dt style={applied.title}>{`${prefix}${counter}．${name}`}</dt>
        <dd style={applied.content}>{children}</dd>
      </dl>
    );
  };

  return Theorem;
};
