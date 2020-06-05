import React, { FC, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { RefMeta, Theme } from "./types";

type Style = Theme & { theme?: Theme };

interface Props {
  name?: string;
  register?: (x: RefMeta) => void;
}

export const createTheorem = (prefix: string, style: Style = {}) => {
  const uuidSet = new Set<string>();
  const encoded = encodeURIComponent(prefix);
  let computed: Omit<Style, "theme"> = style;

  if (style.theme) {
    const { theme } = style;

    computed = {
      container: { ...theme.container, ...style.container },
      title: { ...theme.title, ...style.title },
      content: { ...theme.content, ...style.content },
    };
  }

  const Theorem: FC<Props> = ({ name = "", register, children }) => {
    const uuid = useRef(uuidv4()).current;
    const [htmlId, setHtmlId] = useState("");
    const [counter, setCounter] = useState(0);

    if (!uuidSet.has(uuid)) {
      uuidSet.add(uuid);

      const counter = uuidSet.size;
      const htmlId = `theorem-${encoded}-${counter}`;

      if (register) {
        register({ isExternal: false, htmlId, counter, name });
      }

      setCounter(counter);
      setHtmlId(htmlId);
    }

    return (
      <dl id={htmlId} style={computed.container}>
        <dt style={computed.title}>{`${prefix}${counter}．${name}`}</dt>
        <dd style={computed.content}>{children}</dd>
      </dl>
    );
  };

  return Theorem;
};
