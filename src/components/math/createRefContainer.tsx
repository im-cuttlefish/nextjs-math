import React, { FC, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { RefMeta } from "./types";

interface Props {
  name?: string;
  register: (x: RefMeta) => void;
}

export const createRefContainer = (prefix: string) => {
  const uuidSet = new Set<string>();
  const encoded = encodeURIComponent(prefix);

  const Container: FC<Props> = ({ name = "", register, children }) => {
    const uuid = useRef(uuidv4()).current;
    const [htmlId, setHtmlId] = useState("");

    if (!uuidSet.has(uuid)) {
      uuidSet.add(uuid);

      const counter = uuidSet.size;
      const htmlId = `container-${encoded}-${counter}`;

      register({ isExternal: false, htmlId, counter, name });
      setHtmlId(htmlId);
    }

    return <Transparent id={htmlId}>{children}</Transparent>;
  };

  return Container;
};

const Transparent = styled.div`
  display: contents;
`;
