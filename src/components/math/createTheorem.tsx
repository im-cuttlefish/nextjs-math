import React, { FC, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { RefMeta } from "./types";

interface Props {
  name?: string;
  register?: (x: RefMeta) => void;
}

interface Style {}

export const createTheorem = (prefix: string) => {
  const uuidSet = new Set<string>();
  const encoded = encodeURIComponent(prefix);

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
      <Container id={htmlId}>
        <Title>{`${prefix}${counter}．${name}`}</Title>
        <Contents>{children}</Contents>
      </Container>
    );
  };

  return Theorem;
};

const Container = styled.dl`
  background: #00000011;
  margin: 1rem 0;
`;

const Title = styled.dt`
  padding: 0 0.7rem;
  font-size: 1.3rem;
  border-bottom: solid 1px #000;
`;

const Contents = styled.dd`
  padding: 0.7rem;
`;
