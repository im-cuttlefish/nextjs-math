import React, { FC, useMemo } from "react";
const { MDXProvider } = require("@mdx-js/react");
import * as doc from "./math";
import theme from "./math.module.css";

const getEnv = () => ({
  Theorem: doc.createTheorem("theorem", {
    prefix: "定理",
    theme,
  }),

  Definition: doc.createTheorem("definition", {
    prefix: "定義",
    theme,
  }),

  Proof: doc.createProof({
    startMark: "証明",
    endMark: "Q.E.D.",
    theme,
  }),

  TRef: doc.createRef({
    prefix: "定理",
    theme,
  }),

  Question: doc.createQuestion("question", {
    prefix: "問",
    theme,
  }),

  Answer: doc.createAnswer("answer", {
    prefix: "答",
    theme,
  }),
});

export const Preample: FC = ({ children }) => {
  const env = useMemo(getEnv, []);
  return <MDXProvider components={env}>{children}</MDXProvider>;
};
