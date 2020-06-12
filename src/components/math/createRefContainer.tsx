import React, { FC, useState, useEffect } from "react";
import { createCounter } from "./internal";
import { RefMeta } from "./types";

interface Props {
  name?: string;
  register: (x: RefMeta) => void;
}

export const createRefContainer = (prefix: string) => {
  const encodedPrefix = encodeURIComponent(prefix);
  const useCounter = createCounter();

  const Container: FC<Props> = ({ name = "", register, children }) => {
    const counter = useCounter();
    const [htmlId, setHtmlId] = useState("");

    useEffect(() => {
      const htmlId = `container-${encodedPrefix}-${counter}`;
      setHtmlId(htmlId);
      register({ isExternal: false, htmlId, counter, name });
    }, []);

    return (
      <div id={htmlId} style={{ display: "contents" }}>
        {children}
      </div>
    );
  };

  return Container;
};
