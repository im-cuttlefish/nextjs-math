import React, { FC, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

interface Props {
  name?: string;
  ref?: string;
}

export const createTheorem = (prefix: string) => {
  const uuidSet = new Set<string>();
  const encoded = encodeURIComponent(prefix);

  const Theorem: FC<Props> = ({ name = "", children }) => {
    const uuid = useRef(uuidv4()).current;
    const [order, setOrder] = useState(0);

    if (!uuidSet.has(uuid)) {
      uuidSet.add(uuid);
      setOrder(uuidSet.size);
    }

    const htmlID = useRef(`theorem-${encoded}-${order}`).current;

    return (
      <Container id={htmlID}>
        <Title>{`${prefix}${order}．${name}`}</Title>
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
