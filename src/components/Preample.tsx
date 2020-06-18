import React, { FC } from "react";
const { MDXProvider } = require("@mdx-js/react");
import { useMathdoc } from "./math/useMathdoc";
import { MathdocEnvironment } from "./math/types";
import theme from "./math.module.css";

const env: MathdocEnvironment = {
  Theorem: [
    "theorem",
    {
      id: "theorem",
      prefix: "定理",
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
};

export const Preample: FC = ({ children }) => {
  const [components, Provider] = useMathdoc(env);

  return (
    <MDXProvider components={components}>
      <Provider>{children}</Provider>
    </MDXProvider>
  );
};
