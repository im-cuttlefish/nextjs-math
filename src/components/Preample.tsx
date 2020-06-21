import React, { FC } from "react";
const { MDXProvider } = require("@mdx-js/react");
import { createMathdoc } from "./math";
import theme from "./math.module.css";

const [components, Provider] = createMathdoc({
  Theorem: [
    "theorem",
    {
      id: "theorem",
      prefix: "定義",
      theme,
    },
  ],
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
      id: "proof",
      startMark: "証明",
      endMark: "Q.E.D.",
      theme,
    },
  ],
  TRef: [
    "ref",
    {
      id: "ref",
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

export const Preample: FC = ({ children }) => (
  <MDXProvider components={components}>
    <Provider>{children}</Provider>
  </MDXProvider>
);
