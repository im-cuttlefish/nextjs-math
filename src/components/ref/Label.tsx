import React, { FC, useContext } from "react";
import styled from "styled-components";
import { RefContext } from "./RefContext";

interface Props {
  namespace: string;
  name: string;
}

export const Label: FC<Props> = ({ namespace, name, children }) => {
  const { refs } = useContext(RefContext);

  if (name === undefined) {
    return;
  }
};

const Transparent = styled.div`
  display: contents;
`;
