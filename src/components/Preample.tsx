import React, { FC } from "react";
const { MDXProvider } = require("@mdx-js/react");
import { useMathdoc } from "./math/useMathdoc";
import theme from "./math.module.css";
import { createTheorem } from "./math/createTheorem";
import styled from "styled-components";

const Theorem = createTheorem({
  id: "theorem",
  prefix: "定義",
  theme,
});

Theorem.Component = styled(Theorem.Component)`
  color: red;
`;

export const Preample: FC = ({ children }) => {
  const [components, Provider] = useMathdoc({
    Theorem,
    Definition: [
      "theorem",
      {
        id: "definition",
        prefix: "定義",
        theme,
      },
    ],
    Proof: [
      "proof",
      {
        startMark: "証明",
        endMark: "Q.E.D.",
        theme,
      },
    ],
    TRef: [
      "ref",
      {
        prefix: "定理",
        theme,
      },
    ],
    Question: [
      "question",
      {
        id: "question",
        prefix: "問",
        theme,
      },
    ],
    Answer: [
      "answer",
      {
        id: "answer",
        prefix: "答",
        theme,
      },
    ],
  });

  return (
    <MDXProvider components={components}>
      <Provider>{children}</Provider>
    </MDXProvider>
  );
};
